# 🧩 Breakdown: Puzzle #50 — Stacked Card Slider (21st.dev Style)

## PHẦN 1: Tư duy khi nhận Puzzle

Đây là một thử thách về việc tái hiện một UI component phức tạp từ bên thứ ba (21st.dev). Điểm mấu chốt không chỉ là giao diện mà là **cảm giác chuyển động (motion feel)**.

### Tầng 1 — Hiệu ứng chiều sâu (The Stack Effect)
Để tạo ra hiệu ứng 3 thẻ ảnh chồng lên nhau, chúng ta không thể chỉ đặt chúng lên nhau. Cần có sự thay đổi về:
- **Scale**: Các thẻ phía sau nhỏ dần.
- **Rotation**: Các thẻ phía sau xoay nhẹ sang trái/phải để tạo cảm giác ngẫu nhiên và tự nhiên.
- **Opacity**: Thẻ phía sau mờ hơn để tập trung vào thẻ chính.

### Tầng 2 — Quản lý chuyển động (AnimatePresence)
Khi người dùng ấn "Next", chúng ta cần xử lý 2 việc cùng lúc:
1. Thẻ hiện tại "bay" ra khỏi màn hình (Exit).
2. Các thẻ phía sau "tiến" lên một bậc (Animate).
Sử dụng `AnimatePresence` của Framer Motion là giải pháp tối ưu nhất cho việc này.

### Tầng 3 — Đồng bộ hóa dữ liệu (Content Sync)
Phần chữ bên phải và phần ảnh bên trái phải thay đổi đồng bộ. Chúng ta sử dụng một `currentIndex` duy nhất để điều khiển cả hai phía.

## PHẦN 2: Cách thực hiện

### 1. Cấu trúc Stacked Cards
Chúng ta map qua mảng `[2, 1, 0]` để lấy 3 index tiếp theo từ `currentIndex`. Thẻ có `offset = 0` là thẻ chính.

```tsx
{[2, 1, 0].map((offset) => {
  const index = (currentIndex + offset) % TESTIMONIALS.length;
  // Render motion.div với logic scale, rotate dựa trên offset
})}
```

### 2. Logic chuyển đổi Spring
Thay vì dùng hiệu ứng trượt tuyến tính đơn điệu, chúng ta dùng `type: "spring"` để tạo độ nảy (stiffness/damping), giúp component cảm giác "cao cấp" hơn.

```tsx
transition={{ 
  type: "spring", 
  stiffness: 260, 
  damping: 20 
}}
```

### 3. Điều hướng linh hoạt
Hệ thống hỗ trợ cả phím tắt (nếu cần), phím điều hướng lớn ở hai cạnh màn hình và cụm phím điều hướng nhỏ dưới phần văn bản.

## PHẦN 3: Bài học rút ra

- **Thứ tự render (Z-index)**: Trong một stack, thẻ render sau sẽ nằm trên. Đó là lý do chúng ta map `[2, 1, 0]` thay vì `[0, 1, 2]`.
- **Chế độ `popLayout`**: Trong Framer Motion, `mode="popLayout"` giúp phần văn bản không bị "nhảy" vị trí khi phần tử cũ biến mất và phần tử mới xuất hiện.
- **Hình ảnh chất lượng cao**: Đối với các component dạng Portfolio/Testimonial, chất lượng ảnh từ Unsplash đóng vai trò 50% trong việc tạo ra vẻ ngoài "luxury".

## 🏷️ Tags
`Framer Motion` · `Stacked Cards` · `Testimonial Slider` · `UI Animation` · `React Hooks`
