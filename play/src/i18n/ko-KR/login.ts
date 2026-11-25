import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "이름을 입력하세요",
            empty: "이름이 비어 있습니다",
            tooLongError: "이름이 너무 깁니다",
            notValidError: "잘못된 이름 형식",
        },
        code: {
            placeholder: "코드를 입력하세요",
            empty: "코드가 비어 있습니다",
            invalid: "잘못된 코드입니다",
            tooManyAttempts: "시도 횟수가 너무 많습니다. 몇 분 후에 다시 시도하세요.",
        },
    },
    genericError: "오류가 발생했습니다",
    terms: "계속하면 {links}에 동의하는 것입니다.",
    termsOfUse: "이용 약관",
    privacyPolicy: "개인정보 보호정책",
    cookiePolicy: "쿠키 정책",
    continue: "계속하기",
};

export default login;
