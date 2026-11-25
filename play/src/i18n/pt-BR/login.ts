import type { BaseTranslation } from "../i18n-types";

const login: BaseTranslation = {
    input: {
        name: {
            placeholder: "Digite seu nome",
            empty: "O nome está vazio",
            tooLongError: "O nome é muito longo",
            notValidError: "O nome não é válido",
        },
        code: {
            placeholder: "Insira seu código",
            empty: "O código está vazio",
            invalid: "Código inválido",
            tooManyAttempts: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
        },
    },
    genericError: "Ocorreu um erro",
    terms: "Ao continuar, você concorda com nossos {links}.",
    termsOfUse: "termos de uso",
    privacyPolicy: "política de privacidade",
    cookiePolicy: "política de cookies",
    continue: "Continuar",
};

export default login;
