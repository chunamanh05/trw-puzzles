# 🛡️ PrivacyShield: Smart Consent Panel (Puzzle #108)

## 📌 Tổng quan
Thử thách xây dựng một hệ thống quản lý tùy chọn quyền riêng tư (Consent Management Platform - CMP). Người dùng có thể chấp nhận tất cả, từ chối hoặc tùy chỉnh từng mục đích sử dụng dữ liệu (Cookies) của mình.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useEffect`)**: Quản lý trạng thái bật/tắt của từng danh mục và lưu trữ dữ liệu bền vững.
- **LocalStorage API**: Lưu trữ lựa chọn của người dùng để không làm phiền họ trong các lần truy cập tiếp theo.
- **Framer Motion**: Tạo hiệu ứng Modal và Banner trượt mượt mà, mang lại cảm giác chuyên nghiệp.
- **Tailwind CSS**: Thiết kế giao diện hiện đại với phong cách "Privacy Center" tối giản.

## 💡 Giải pháp kỹ thuật
1.  **Independent Preference Management**: Mỗi danh mục được lưu trữ độc lập trong một đối tượng State. Mục "Essential" được cố định là `true` vì đây là các cookie bắt buộc để web chạy được.
2.  **Smart Persistence**: Hệ thống tự động kiểm tra `localStorage` khi tải trang. Nếu chưa có lựa chọn, Banner sẽ hiện ra sau 1 giây. Nếu đã có, hệ thống sẽ im lặng tải các cấu hình đã lưu.
3.  **UI/UX Flow**: Người dùng có 3 lối thoát (Accept All, Reject All, Customize). Điều này giúp cân bằng giữa trải nghiệm người dùng (UX) và tính tuân thủ pháp lý (GDPR).
4.  **Status Dashboard**: Hiển thị trực quan trạng thái hiện tại (Enabled/Disabled) của các dịch vụ ngay trên trang chính.

## 🚀 Tính năng chính
- [x] **4 Categories**: Essential, Analytics, Marketing, Functional.
- [x] **Three Actions**: Chấp nhận tất cả, Từ chối tất cả hoặc Tùy chỉnh chi tiết.
- [x] **LocalStorage**: Lưu cài đặt vĩnh viễn trên máy người dùng.
- [x] **Privacy Center**: Giao diện Modal chi tiết để giải thích từng loại Cookie.

## 🏷️ Tags
`Privacy` · `GDPR` · `UI/UX` · `LocalStorage`
