# ⌨️ Nexus Command: Command Palette (Puzzle #73)

## 📌 Tổng quan
Thử thách xây dựng một hệ thống điều khiển trung tâm bằng bàn phím (Command Palette). Người dùng có thể thực thi các lệnh hệ thống, điều hướng và thay đổi cài đặt mà không cần sử dụng chuột, tương tự như Spotlight trên macOS hay Command Palette trong VS Code.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useEffect`, `useMemo`)**: Quản lý trạng thái đóng/mở, lọc tìm kiếm lệnh theo thời gian thực và xử lý chỉ số lựa chọn.
- **Framer Motion**: Tạo hiệu ứng Modal Spotlight và các hiệu ứng chuyển đổi mượt mà giữa các lệnh.
- **Tailwind CSS**: Thiết kế giao diện Glassmorphism và hỗ trợ chuyển đổi Dark Mode thực tế.
- **Lucide React**: Hệ thống Icon đại diện cho từng loại hành động.

## 💡 Giải pháp kỹ thuật
1.  **Global Event Listener**: Hệ thống lắng nghe sự kiện `keydown` trên toàn cầu để nhận diện tổ hợp phím `Ctrl + K` hoặc `Cmd + K`.
2.  **Pure Keyboard Navigation**: Xử lý logic phím `ArrowUp`, `ArrowDown` để di chuyển vùng chọn và phím `Enter` để kích hoạt hàm `action` tương ứng trong mảng lệnh.
3.  **Real-time Fuzzy Search**: Sử dụng `useMemo` để lọc danh sách lệnh ngay khi người dùng nhập ký tự, đảm bảo hiệu suất cực cao.
4.  **Auto-focus Strategy**: Khi bảng lệnh mở ra, tiêu điểm (focus) sẽ tự động được chuyển vào ô tìm kiếm để người dùng có thể gõ lệnh ngay lập tức.

## 🚀 Tính năng chính
- [x] **Shortcut Support**: Mở bằng `Ctrl+K`.
- [x] **Real-time Search**: Tìm kiếm lệnh thông minh.
- [x] **4+ Actions**: Đổi giao diện, về trang chủ, copy URL, kiểm tra hệ thống.
- [x] **Mouse-free Use**: Hoàn toàn dùng được chỉ với bàn phím.

## 🏷️ Tags
`UX` · `Accessibility` · `Command Palette` · `Keyboard Navigation`
