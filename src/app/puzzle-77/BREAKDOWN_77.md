# 🎨 Studio-X: Theme Customizer (Puzzle #77)

## 📌 Tổng quan
Thử thách xây dựng một bảng điều khiển cho phép người dùng tùy biến giao diện (Theme) của ứng dụng theo thời gian thực. Ứng dụng minh họa sức mạnh của việc kết hợp React State với CSS Variables để tạo ra các hệ thống Design System linh hoạt.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useEffect`)**: Quản lý cấu hình giao diện và đồng bộ hóa với bộ nhớ trình duyệt.
- **CSS Variables (Custom Properties)**: Kỹ thuật cốt lõi để thay đổi giao diện hàng loạt mà không cần render lại quá nhiều component.
- **Framer Motion**: Tạo hiệu ứng chuyển đổi mượt mà cho màu sắc và bố cục.
- **Lucide React**: Các icon chuyên nghiệp cho giao diện Dashboard mẫu.

## 💡 Giải pháp kỹ thuật
1.  **Dynamic Styling with CSS Variables**: Các giá trị từ State (như màu sắc, độ bo góc, phông chữ) được truyền trực tiếp vào thẻ bọc ngoài cùng (Wrapper) của vùng Preview dưới dạng biến CSS. Toàn bộ các component con bên trong sẽ kế thừa các biến này thông qua thuộc tính `var()`.
2.  **Theme Persistence**: Tích hợp logic kiểm tra `localStorage` ngay khi ứng dụng khởi chạy (mount) để khôi phục cấu hình trước đó của người dùng.
3.  **Modular Preview**: Xây dựng một bản mô phỏng Dashboard hoàn chỉnh để người dùng có cái nhìn khách quan về việc các tùy chỉnh sẽ ảnh hưởng thế nào đến một ứng dụng thực tế.
4.  **Reset Mechanism**: Một hàm xử lý đơn giản để xóa sạch cài đặt tùy chỉnh và đưa tất cả các biến CSS về giá trị mặc định của hệ thống.

## 🚀 Tính năng chính
- [x] **Live Theme Preview**: Thấy ngay thay đổi khi điều chỉnh.
- [x] **4 Custom Settings**: Color, Radius, Dark Mode, Typography.
- [x] **Persistence**: Lưu cài đặt vĩnh viễn trên thiết bị.
- [x] **Universal Reset**: Quay lại giao diện gốc chỉ với 1 click.

## 🏷️ Tags
`Theming` · `CSS Variables` · `DesignSystem` · `LocalStorage`
