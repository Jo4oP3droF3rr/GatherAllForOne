import { createHmac } from "node:crypto";

/**
 * Login with a personal access code, against a fixed list of users set in the LOGIN_USERS environment variable.
 *
 * Format: "code:Name;code:Name" (entries may also be separated by line breaks).
 * The name is the one displayed in the game: users cannot choose another one.
 */

export type CodeLoginUser = {
    code: string;
    name: string;
    /**
     * Stable user identifier, derived from the code with a secret key.
     * It is shared with other players (as the user UUID), so it must not reveal the code.
     */
    identifier: string;
};

const MAX_FAILED_ATTEMPTS = 10;
const FAILED_ATTEMPTS_WINDOW_MS = 5 * 60 * 1000;
const MAX_TRACKED_IPS = 10_000;

type CodeLoginServiceOptions = {
    rawUsers: string | undefined;
    secretKey: string | undefined;
    maxNameLength?: number;
    now?: () => number;
};

export class CodeLoginService {
    private readonly usersByCode = new Map<string, CodeLoginUser>();
    private readonly usersByIdentifier = new Map<string, CodeLoginUser>();
    private readonly failedAttempts = new Map<string, { count: number; firstAttemptAt: number }>();
    private readonly now: () => number;
    public readonly isEnabled: boolean;

    constructor(options: CodeLoginServiceOptions) {
        this.now = options.now ?? Date.now;
        // Enabled as soon as the variable is set, even with no valid entry: a typo in the list must not open the
        // platform to anonymous users.
        this.isEnabled = (options.rawUsers ?? "").trim() !== "";
        const secretKey = options.secretKey ?? "";

        for (const user of parseLoginUsers(options.rawUsers, options.maxNameLength)) {
            if (this.usersByCode.has(user.code)) {
                console.warn(`LOGIN_USERS: the code of "${user.name}" is already used by another user, entry ignored`);
                continue;
            }
            const identifier = identifierFromCode(user.code, secretKey);
            const codeLoginUser = { ...user, identifier };
            this.usersByCode.set(user.code, codeLoginUser);
            this.usersByIdentifier.set(identifier, codeLoginUser);
        }
    }

    public findByCode(code: string): CodeLoginUser | undefined {
        return this.usersByCode.get(code.trim());
    }

    public findByIdentifier(identifier: string): CodeLoginUser | undefined {
        return this.usersByIdentifier.get(identifier);
    }

    /**
     * Returns true if this IP made too many failed attempts recently (protection against brute force).
     */
    public isBlocked(ip: string): boolean {
        const entry = this.failedAttempts.get(ip);
        if (!entry) {
            return false;
        }
        if (this.now() - entry.firstAttemptAt > FAILED_ATTEMPTS_WINDOW_MS) {
            this.failedAttempts.delete(ip);
            return false;
        }
        return entry.count >= MAX_FAILED_ATTEMPTS;
    }

    public registerFailedAttempt(ip: string): void {
        const now = this.now();
        const entry = this.failedAttempts.get(ip);
        if (!entry || now - entry.firstAttemptAt > FAILED_ATTEMPTS_WINDOW_MS) {
            if (this.failedAttempts.size >= MAX_TRACKED_IPS) {
                this.removeExpiredAttempts(now);
            }
            this.failedAttempts.set(ip, { count: 1, firstAttemptAt: now });
            return;
        }
        entry.count++;
    }

    public clearFailedAttempts(ip: string): void {
        this.failedAttempts.delete(ip);
    }

    private removeExpiredAttempts(now: number): void {
        for (const [ip, entry] of this.failedAttempts) {
            if (now - entry.firstAttemptAt > FAILED_ATTEMPTS_WINDOW_MS) {
                this.failedAttempts.delete(ip);
            }
        }
        if (this.failedAttempts.size >= MAX_TRACKED_IPS) {
            this.failedAttempts.clear();
        }
    }
}

export function parseLoginUsers(
    rawUsers: string | undefined,
    maxNameLength?: number,
): { code: string; name: string }[] {
    if (!rawUsers) {
        return [];
    }

    const users: { code: string; name: string }[] = [];
    for (const rawEntry of rawUsers.split(/[;\n]/)) {
        const entry = rawEntry.trim();
        if (entry === "") {
            continue;
        }
        const separatorIndex = entry.indexOf(":");
        const code = separatorIndex === -1 ? "" : entry.slice(0, separatorIndex).trim();
        const name = separatorIndex === -1 ? "" : entry.slice(separatorIndex + 1).trim();
        if (code === "" || name === "") {
            console.warn(`LOGIN_USERS: invalid entry "${entry}", expected "code:Name". Entry ignored`);
            continue;
        }
        if (maxNameLength !== undefined && name.length > maxNameLength) {
            console.warn(
                `LOGIN_USERS: the name "${name}" is longer than ${maxNameLength} characters (MAX_USERNAME_LENGTH). Entry ignored`,
            );
            continue;
        }
        users.push({ code, name });
    }
    return users;
}

function identifierFromCode(code: string, secretKey: string): string {
    const hex = createHmac("sha256", secretKey).update(`code-login:${code}`).digest("hex");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}
