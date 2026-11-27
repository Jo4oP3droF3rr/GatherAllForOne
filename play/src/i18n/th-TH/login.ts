import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "กรอกชื่อของคุณ",
            empty: "ยังไม่ได้กรอกชื่อ",
            tooLongError: "ชื่อยาวเกินไป",
            notValidError: "รูปแบบชื่อไม่ถูกต้อง",
        },
        code: {
            placeholder: "ป้อนรหัสของคุณ",
            empty: "รหัสว่างเปล่า",
            invalid: "รหัสไม่ถูกต้อง",
            tooManyAttempts: "พยายามหลายครั้งเกินไป โปรดรอสักครู่แล้วลองอีกครั้ง",
        },
    },
    genericError: "เกิดข้อผิดพลาด",
    terms: "เมื่อดำเนินการต่อ แสดงว่าคุณยอมรับ {links} ของเรา",
    termsOfUse: "ข้อกำหนดการใช้งาน",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    cookiePolicy: "นโยบายคุกกี้",
    continue: "ดำเนินการต่อ",
};

export default login;
