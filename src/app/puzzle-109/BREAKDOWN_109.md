# 🛡️ AccessAudit Pro: Accessibility Checker (Puzzle #109)

## 📌 Tổng quan
Thử thách xây dựng một công cụ kiểm tra tính dễ tiếp cận (Accessibility) của website. Ứng dụng mô phỏng quá trình quét mã nguồn để phát hiện các lỗi vi phạm tiêu chuẩn WCAG 2.1 và đưa ra gợi ý khắc phục.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useMemo`)**: Quản lý trạng thái quét (Auditing), lọc kết quả (Passed/Failed) và tính toán điểm số tổng quát.
- **Framer Motion**: Xử lý hiệu ứng tia laser quét (Scanner effect) và các hiệu ứng mở rộng thẻ lỗi (Expandable cards).
- **Lucide React**: Hệ thống Icon chỉ báo trạng thái lỗi và cảnh báo.
- **Tailwind CSS**: Thiết kế giao diện Dashboard phong cách DevTools hiện đại, tối ưu cho Dark Mode.

## 💡 Giải pháp kỹ thuật
1.  **Stacked Dashboard Architecture**: Thay đổi bố cục từ chia đôi Trái-Phải sang Trên-Dưới, tối ưu hóa không gian cho Mockup thiết bị di động.
2.  **Smartphone Simulator**: Xây dựng một Mockup điện thoại di động (LuxeShop) để mô phỏng môi trường duyệt web thực tế trên Mobile.
3.  **Midnight Amethyst Theme**: Hệ thống màu sắc tùy chỉnh (Tím - Hồng Neon) kết hợp hiệu ứng Glassmorphism và Neon Glow.
4.  **Dynamic Grid Results**: Hiển thị kết quả dưới dạng lưới các thẻ ô vuông, mỗi thẻ tích hợp sẵn hướng dẫn khắc phục (Remediation).

## 🚀 Tính năng chính
- [x] **Mobile Preview**: Mô phỏng audit trên thiết bị di động.
- [x] **Midnight Aesthetics**: Giao diện Tím - Hồng Neon cực kỳ bắt mắt.
- [x] **8 Accessibility Checks**: Đầy đủ các bài kiểm tra WCAG tiêu chuẩn.
- [x] **Laser Scan Animation**: Hiệu ứng quét tia laser dọc thân máy.

## 🏷️ Tags
`Accessibility` · `WCAG` · `Audit` · `DevTools`
