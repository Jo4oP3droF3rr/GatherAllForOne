import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "Trage deinen Namen ein",
            empty: "Kein Name angegeben",
            tooLongError: "Der Name ist zu lang",
            notValidError: "Der Name ist ungültig",
        },
        code: {
            placeholder: "Gib deinen Code ein",
            empty: "Der Code ist leer",
            invalid: "Ungültiger Code",
            tooManyAttempts: "Zu viele Versuche. Bitte warte ein paar Minuten und versuche es erneut.",
        },
    },
    genericError: "Ein Fehler ist aufgetreten",
    terms: "Wenn du fortfährst, akzeptierst du die {links}.",
    termsOfUse: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzerklärung",
    cookiePolicy: "Cookierichtlinien",
    continue: "Fortfahren",
};

export default login;
