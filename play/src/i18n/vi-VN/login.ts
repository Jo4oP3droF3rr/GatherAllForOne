import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "Nhập tên của bạn",
            empty: "Tên đang để trống",
            tooLongError: "Tên quá dài",
            notValidError: "Định dạng tên không hợp lệ",
        },
        code: {
            placeholder: "Nhập mã của bạn",
            empty: "Mã đang trống",
            invalid: "Mã không hợp lệ",
            tooManyAttempts: "Quá nhiều lần thử. Vui lòng đợi vài phút rồi thử lại.",
        },
    },
    genericError: "Đã xảy ra lỗi",
    terms: "Bằng việc tiếp tục, bạn đồng ý với {links} của chúng tôi.",
    termsOfUse: "điều khoản sử dụng",
    privacyPolicy: "chính sách quyền riêng tư",
    cookiePolicy: "chính sách cookie",
    continue: "Tiếp tục",
};

export default login;
