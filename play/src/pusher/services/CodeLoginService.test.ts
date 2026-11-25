import { describe, expect, it } from "vitest";
import { CodeLoginService, parseLoginUsers } from "./CodeLoginService";

describe("parseLoginUsers", () => {
    it("parses code:Name entries separated by semicolons or line breaks", () => {
        expect(parseLoginUsers(" 1234 : João Pedro ;5678:Maria\n9012:Ana: Paula;; ")).toEqual([
            { code: "1234", name: "João Pedro" },
            { code: "5678", name: "Maria" },
            { code: "9012", name: "Ana: Paula" },
        ]);
    });

    it("ignores invalid entries and names that are too long", () => {
        expect(parseLoginUsers("no-separator;:NoCode;1234:;5678:Too long name", 8)).toEqual([]);
        expect(parseLoginUsers(undefined)).toEqual([]);
    });
});

describe("CodeLoginService", () => {
    it("finds users by code and by identifier, without the code in the identifier", () => {
        const service = new CodeLoginService({ rawUsers: "1234:João;5678:Maria", secretKey: "secret" });

        const joao = service.findByCode(" 1234 ");
        expect(joao?.name).toBe("João");
        expect(joao?.identifier).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        expect(joao?.identifier).not.toContain("1234");
        expect(service.findByIdentifier(joao?.identifier ?? "")?.name).toBe("João");
        expect(service.findByCode("0000")).toBeUndefined();
    });

    it("derives the identifier from the secret key", () => {
        const a = new CodeLoginService({ rawUsers: "1234:João", secretKey: "secret-a" });
        const b = new CodeLoginService({ rawUsers: "1234:João", secretKey: "secret-b" });
        expect(a.findByCode("1234")?.identifier).not.toBe(b.findByCode("1234")?.identifier);
    });

    it("keeps the first user when a code is duplicated", () => {
        const service = new CodeLoginService({ rawUsers: "1234:João;1234:Maria", secretKey: "secret" });
        expect(service.findByCode("1234")?.name).toBe("João");
    });

    it("stays enabled when the variable is set but has no valid entry", () => {
        expect(new CodeLoginService({ rawUsers: "oops", secretKey: "s" }).isEnabled).toBe(true);
        expect(new CodeLoginService({ rawUsers: "  ", secretKey: "s" }).isEnabled).toBe(false);
        expect(new CodeLoginService({ rawUsers: undefined, secretKey: "s" }).isEnabled).toBe(false);
    });

    it("blocks an IP after too many failed attempts, for a limited time", () => {
        let now = 0;
        const service = new CodeLoginService({ rawUsers: "1234:João", secretKey: "s", now: () => now });

        for (let i = 0; i < 9; i++) {
            service.registerFailedAttempt("1.2.3.4");
        }
        expect(service.isBlocked("1.2.3.4")).toBe(false);
        service.registerFailedAttempt("1.2.3.4");
        expect(service.isBlocked("1.2.3.4")).toBe(true);
        expect(service.isBlocked("5.6.7.8")).toBe(false);

        now += 5 * 60 * 1000 + 1;
        expect(service.isBlocked("1.2.3.4")).toBe(false);
    });
});
