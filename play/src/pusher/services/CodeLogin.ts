import { errors } from "jose";
import { FRONT_ENVIRONMENT_VARIABLES, LOGIN_USERS, SECRET_KEY } from "../enums/EnvironmentVariable";
import type { CodeLoginUser } from "./CodeLoginService";
import { CodeLoginService } from "./CodeLoginService";
import type { AuthTokenData } from "./JWTTokenManager";

export const codeLoginService = new CodeLoginService({
    rawUsers: LOGIN_USERS,
    secretKey: SECRET_KEY,
    maxNameLength: FRONT_ENVIRONMENT_VARIABLES.MAX_USERNAME_LENGTH,
});

/**
 * When the code login is enabled, every user without an OpenID login must be in the LOGIN_USERS list.
 * The list is checked again on each connection, so that removing someone from the list revokes their access even if
 * they still hold a token.
 *
 * Returns the user of the list, or undefined when the code login is disabled or the user logged in with OpenID.
 * Throws errors.JWTInvalid when the user is not (or no longer) in the list.
 */
export function checkCodeLoginUser(tokenData: AuthTokenData | null): CodeLoginUser | undefined {
    if (!codeLoginService.isEnabled || tokenData?.accessToken !== undefined) {
        return undefined;
    }
    const user = tokenData ? codeLoginService.findByIdentifier(tokenData.identifier) : undefined;
    if (!user) {
        throw new errors.JWTInvalid("This user is not in LOGIN_USERS");
    }
    return user;
}
