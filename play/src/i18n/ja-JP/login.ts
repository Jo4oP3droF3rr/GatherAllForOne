import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "名前を入力してください",
            empty: "名前が入力されていません",
            tooLongError: "名前が長すぎます",
            notValidError: "名前の形式が正しくありません",
        },
        code: {
            placeholder: "コードを入力してください",
            empty: "コードが空です",
            invalid: "コードが正しくありません",
            tooManyAttempts: "試行回数が多すぎます。数分待ってから再度お試しください。",
        },
    },
    genericError: "エラーが発生しました",
    terms: "続行すると、{links} に同意したことになります。",
    termsOfUse: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    cookiePolicy: "クッキーに関する方針",
    continue: "続ける",
};

export default login;
