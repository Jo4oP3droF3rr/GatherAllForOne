import type { Translation } from "../i18n-types";
import type { DeepPartial } from "../DeepPartial";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "Voer je naam in",
            empty: "De naam is leeg",
            tooLongError: "Naam is te lang",
            notValidError: "Onjuist naamformaat",
        },
        code: {
            placeholder: "Voer je code in",
            empty: "De code is leeg",
            invalid: "Ongeldige code",
            tooManyAttempts: "Te veel pogingen. Wacht een paar minuten en probeer het opnieuw.",
        },
    },
    genericError: "Er is een fout opgetreden",
    terms: "Door door te gaan, ga je akkoord met onze {links}.",
    termsOfUse: "gebruikersvoorwaarden",
    privacyPolicy: "privacybeleid",
    cookiePolicy: "cookiebeleid",
    continue: "Doorgaan",
};

export default login;
