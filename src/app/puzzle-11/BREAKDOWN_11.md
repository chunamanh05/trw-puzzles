# 🧩 Breakdown: Puzzle #11 — Dynamic Referral Headlines

## PHẦN 1: Tư duy & Phân tích yêu cầu

Yêu cầu cốt lõi của Puzzle này là **Cá nhân hóa nội dung** dựa trên nguồn khách hàng (Referral Source). 

Ví dụ: 
- Khách đến từ Google thường đang tìm kiếm thông tin → Headline nên tập trung vào giải pháp.
- Khách đến từ Facebook/Instagram thường quan tâm đến cộng đồng và hình ảnh → Headline nên tập trung vào cảm xúc và xu hướng.

### Tầng 1 — State & Context (Dữ liệu đầu vào)
Dữ liệu quan trọng nhất ở đây không nằm trong `useState`, mà nằm ở **URL**.
- `ref`: Một tham số (Query Parameter) lấy từ thanh địa chỉ trình duyệt.

### Tầng 2 — Actions (Xử lý logic)
1. **Lấy dữ liệu từ URL**: Sử dụng Hook `useSearchParams` của Next.js.
2. **Truy vấn "Database"**: Dùng giá trị `ref` làm chìa khóa (key) để tìm nội dung tương ứng trong object dữ liệu.
3. **Xử lý mặc định (Fallback)**: Nếu không có `ref` hoặc `ref` không hợp lệ, phải có một bộ nội dung mặc định để trang web không bị trống.

### Tầng 3 — UI (Hiển thị)
- Hiển thị Headline, Subheadline và Badge tương ứng.
- **Quan trọng**: Thêm animation khi nội dung thay đổi để tạo cảm giác mượt mà (dùng `AnimatePresence` của Framer Motion).

---

## PHẦN 2: Cấu trúc Code — Đọc từng block

### Block 1: Giả lập Database (`data.ts`)

```tsx
export const HEADLINES_DB: Record<string, HeadlineEntry> = {
  google: {
    headline: "Find Your Perfect Brew",
    // ...
  },
  facebook: {
    headline: "Your Friends Are Already Here",
    // ...
  }
};
```
- Việc tách dữ liệu ra một file riêng (`data.ts`) giúp code gọn gàng và mô phỏng đúng cách làm việc với Database thật trong tương lai.

### Block 2: Đọc tham số từ URL

```tsx
const searchParams = useSearchParams();
const ref = searchParams.get("ref") ?? "";
```
- `useSearchParams()`: Cho phép truy cập vào các tham số sau dấu `?` trong URL.
- `searchParams.get("ref")`: Lấy giá trị của `?ref=...`.

### Block 3: Logic tra cứu (Lookup Logic)

```tsx
const content = HEADLINES_DB[ref.toLowerCase()] ?? DEFAULT_HEADLINE;
```
- `ref.toLowerCase()`: Chuyển về chữ thường để tránh lỗi nếu user gõ `?ref=Google` thay vì `google`.
- `?? DEFAULT_HEADLINE`: Nếu không tìm thấy key trong DB, dùng nội dung mặc định.

### Block 4: Animation với `AnimatePresence`

```tsx
<AnimatePresence mode="wait">
  <motion.h1 key={ref} ... >
    {content.headline}
  </motion.h1>
</AnimatePresence>
```
- `key={ref}`: Đây là "chìa khóa" để Framer Motion hiểu rằng khi `ref` thay đổi, nó cần chạy hiệu ứng biến mất cho tiêu đề cũ và hiện lên cho tiêu đề mới. Nếu không có `key`, text sẽ đổi "cạch" một cái rất thô.

---

## PHẦN 3: Cách thức hoạt động của Query Parameters

Query Parameter là phần sau dấu `?` trong URL, dùng để truyền dữ liệu cho trang web mà không làm thay đổi cấu trúc đường dẫn.
- Định dạng: `?key1=value1&key2=value2`
- Ưu điểm: Dễ dàng chia sẻ link đã được cá nhân hóa cho từng chiến dịch quảng cáo khác nhau.

---

## PHẦN 4: Prompt Template cho Puzzle tương tự

```text
Build a landing page that personalizes content based on URL query parameters.

REQUIREMENTS:
- Use `useSearchParams` from `next/navigation` to read a specific param (e.g., "ref").
- Store multiple content variations in a separate data object (Simulated DB).
- Provide a fallback/default content if the parameter is missing.

ANIMATION:
- Use Framer Motion's AnimatePresence with a unique key based on the parameter.
- Add a "blur + slide" transition when the content swaps.

UI STYLE:
- Theme: [Ví dụ: Coffee Dark Luxury]
- High-end aesthetics with gradients and glassmorphism.
- Responsive hero section.
```

---

## TÓM TẮT: Quy trình xử lý Query Param

```text
1. BẮT BIẾN  → Dùng useSearchParams() để lấy giá trị từ URL.
2. TRA CỨU    → Dùng giá trị đó làm KEY để tìm dữ liệu trong Object/DB.
3. HIỂN THỊ   → Map dữ liệu tìm được ra UI, dùng key trong animation để đổi nội dung mượt mà.
```
