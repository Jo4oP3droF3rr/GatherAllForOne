import type { BaseTranslation } from "../i18n-types";

const login: BaseTranslation = {
    input: {
        name: {
            placeholder: "Enter your name",
            empty: "The name is empty",
            tooLongError: "Name is too long",
            notValidError: "Incorrect name format",
        },
        code: {
            placeholder: "Enter your code",
            empty: "The code is empty",
            invalid: "Invalid code",
            tooManyAttempts: "Too many attempts. Please wait a few minutes and try again.",
        },
    },
    genericError: "An error occurred",
    terms: "By continuing, you are agreeing our {links}.",
    termsOfUse: "terms of use",
    privacyPolicy: "privacy policy",
    cookiePolicy: "cookie policy",
    continue: "Continue",
};

export default login;
