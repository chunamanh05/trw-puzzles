# 🧩 Breakdown: Puzzle #13 — i18n Multilingual Routing

## PHẦN 1: Tư duy & Phân tích yêu cầu

Yêu cầu của Puzzle này là xây dựng một trang web hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Việt, Tiếng Tây Ban Nha) có sử dụng cơ chế **i18n Routing**.

### Vấn đề của Monorepo:
Next.js hỗ trợ i18n routing thông qua Middleware và việc bọc toàn bộ thư mục `app` bằng `[lang]`. Tuy nhiên, vì dự án của chúng ta chứa rất nhiều Puzzle khác nhau, việc thay đổi cấu trúc root sẽ làm hỏng đường dẫn của các Puzzle cũ.

### Giải pháp "Scoped i18n":
Thay vì làm global i18n, tôi thu hẹp phạm vi i18n lại chỉ nằm gọn trong thư mục `puzzle-13`:
- Cấu trúc thư mục: `src/app/puzzle-13/[lang]/page.tsx`
- Tham số `[lang]` sẽ tự động bắt được mã ngôn ngữ từ URL (VD: `.../en` hoặc `.../vi`).
- Để xử lý trường hợp user vào đường dẫn gốc `/puzzle-13`, tôi dùng một file `page.tsx` tĩnh ở ngoài cùng để tự động `redirect` về `/puzzle-13/en`.
=> **An toàn tuyệt đối và đúng chuẩn bài toán.**

---

## PHẦN 2: Cấu trúc Dữ liệu Dịch thuật (Dictionaries)

Thay vì dùng thư viện bên ngoài nặng nề như `next-i18next` hay `react-intl`, với App Router ta hoàn toàn có thể tự build hệ thống từ vựng (Dictionaries) cực kỳ nhẹ:

```ts
// dictionaries.ts
export const dictionaries = {
  en: { hero: { title: "Our Services" }, ... },
  vi: { hero: { title: "Dịch Vụ Của Chúng Tôi" }, ... },
  es: { hero: { title: "Nuestros Servicios" }, ... },
}
```
Lợi ích: Type-safe, dễ quản lý, dễ scale và không cần config rườm rà.

---

## PHẦN 3: Xử lý UI và Tương tác (Framer Motion)

Một chi tiết rất tinh tế về UX khi làm web đa ngôn ngữ: **Nội dung đổi thì phải có hiệu ứng.**
Nếu chữ cái đột ngột biến thành tiếng khác, nó sẽ tạo cảm giác giật cục.

**Giải pháp:** Sử dụng thuộc tính `key` của Framer Motion.
```tsx
<motion.h1 
  key={`title-${lang}`} // Bắt buộc!
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  {dict.hero.title}
</motion.h1>
```
Khi biến `lang` thay đổi (Ví dụ từ `en` sang `vi`), React sẽ hiểu thẻ `motion.h1` này là một thẻ **hoàn toàn mới** (do `key` đã thay đổi). Nó sẽ tự động hủy component cũ và chạy lại animation `initial` -> `animate` cho component mới. Nhờ vậy, chữ sẽ mờ đi và trượt lên rất mượt mà mỗi khi đổi ngôn ngữ.

---

## TÓM TẮT BÀI HỌC
1. **Scoped i18n:** Đôi khi không nên dùng global i18n của Framework nếu hệ thống là một Monorepo có nhiều tính năng độc lập. Đặt thư mục `[lang]` vào đúng nơi cần thiết.
2. **Dictionary Object:** Cách đơn giản nhất và nhanh nhất để làm đa ngôn ngữ trong App Router mà không cần phụ thuộc thư viện thứ 3.
3. **Animation Keying:** Dùng `key={lang}` là mẹo siêu đỉnh để trigger lại animation của nội dung khi đổi ngôn ngữ.
