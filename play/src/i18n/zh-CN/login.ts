import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "输入你的名字",
            empty: "名字为空",
            tooLongError: "名字太长",
            notValidError: "名字格式不正确",
        },
        code: {
            placeholder: "请输入您的代码",
            empty: "代码为空",
            invalid: "代码无效",
            tooManyAttempts: "尝试次数过多。请等待几分钟后再试。",
        },
    },
    genericError: "发生错误",
    terms: "点击继续，意味着你同意我们的{links}.",
    termsOfUse: "使用协议",
    privacyPolicy: "隐私政策",
    cookiePolicy: "Cookie策略",
    continue: "继续",
};

export default login;
