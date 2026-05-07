# 🧠 Puzzle #57: Multi-version Landing Pages

## 🌟 Tổng quan
Phát triển hệ thống A/B Testing giả lập với 3 phiên bản Landing Page khác nhau hoàn toàn về ngôn ngữ thiết kế (Design Language). Mục tiêu là chứng minh khả năng linh hoạt trong việc xây dựng đa dạng phong cách thẩm mỹ trong cùng một codebase.

## 🛠️ Công nghệ sử dụng
- **Next.js Routing**: Phân tách các phiên bản qua các route `/puzzle-57`, `/v2`, `/v3`.
- **Framer Motion**: Điều chỉnh các kiểu hiệu ứng khác nhau (Pulse cho Cyberpunk, Float cho Minimalist, Shake cho Retro).
- **Tailwind CSS**: Quản lý các hệ màu và typography riêng biệt cho từng "Model".
- **Lucide React**: Sử dụng các icon phù hợp với từng phong cách (Công nghệ cho V1, Tự nhiên cho V2, Media cho V3).

## 💡 Các phiên bản thiết kế

### 1. Version 1: Cyberpunk Luxury (Mặc định)
- **Đặc điểm**: Nền tối (`#050505`), dải màu gradient Rose/Purple/Blue, font chữ không chân hiện đại.
- **Section 2**: Lưới tính năng với viền neon phát sáng khi hover.

### 2. Version 2: Minimalist Zen (V2)
- **Đặc điểm**: Nền trắng (`#fcfcfc`), font chữ Serif (có chân) tạo cảm giác sang trọng, khoảng trắng rộng.
- **Section 2**: Sử dụng hiệu ứng Glassmorphism (kính mờ) và các hình khối bo tròn lớn.

### 3. Version 3: Retro Future / Vaporwave (V3)
- **Đặc điểm**: Nền tím đậm, lưới Neon Grid, font chữ Italic cực đậm, màu vàng và hồng cánh sen.
- **Section 2**: Các thẻ thống kê với viền dày và đổ bóng cứng (Hard Shadows).

## 🚀 Bài học rút ra
- **Design System Flexibility**: Khả năng tách biệt các style giúp project dễ dàng thử nghiệm các concept mới mà không làm hỏng cấu trúc cũ.
- **Consistent Components**: Mặc dù giao diện khác nhau, cấu trúc component (Hero, Features, Stats) vẫn có tính đồng nhất về mặt logic dữ liệu.
- **User Preference**: A/B testing cho phép đo lường trực quan xem phong cách nào phù hợp với đối tượng khách hàng mục tiêu nhất.

## 🏷️ Tags
`A/B Testing` · `Aesthetics` · `Design Systems` · `Next.js`
