# 🛡️ PrivacyShield: Smart Consent Panel (Puzzle #108)

## 📌 Tổng quan
Thử thách xây dựng một hệ thống quản lý tùy chọn quyền riêng tư (Consent Management Platform - CMP). Người dùng có thể chấp nhận tất cả, từ chối hoặc tùy chỉnh từng mục đích sử dụng dữ liệu (Cookies) của mình.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useEffect`)**: Quản lý trạng thái bật/tắt của từng danh mục và lưu trữ dữ liệu bền vững.
- **LocalStorage API**: Lưu trữ lựa chọn của người dùng để không làm phiền họ trong các lần truy cập tiếp theo.
- **Framer Motion**: Tạo hiệu ứng Modal và Banner trượt mượt mà, mang lại cảm giác chuyên nghiệp.
- **Tailwind CSS**: Thiết kế giao diện hiện đại với phong cách "Privacy Center" tối giản.

## 💡 Giải pháp kỹ thuật
1.  **Dashboard Architecture**: Chuyển đổi từ dạng Banner/Modal sang giao diện Dashboard 2 cột tập trung.
2.  **Smart Persistence**: Tích hợp thông báo "Preferences saved" mượt mà khi người dùng thao tác, dữ liệu lưu ngay vào `localStorage`.
3.  **AnimatePresence**: Xử lý việc ẩn/hiện bảng điều khiển. Khi ẩn, hệ thống thu gọn về một Floating Action Button (FAB) hình khiên.
4.  **Real-time Statistics**: Sử dụng `useMemo` để tính toán số lượng mục Enabled/Disabled ngay khi State thay đổi.

## 🚀 Tính năng chính
- [x] **5 Categories**: Cấu trúc đầy đủ cho một nền tảng chuyên nghiệp.
- [x] **Status Widget**: Bảng tóm tắt trạng thái trực quan ở cột bên phải.
- [x] **Hide/Show Flow**: Cho phép ẩn bảng điều khiển và mở lại qua FAB icon.
- [x] **Dark Dashboard**: Giao diện tối hiện đại, tập trung vào trải nghiệm người dùng.

## 🏷️ Tags
`Privacy` · `GDPR` · `UI/UX` · `LocalStorage`
