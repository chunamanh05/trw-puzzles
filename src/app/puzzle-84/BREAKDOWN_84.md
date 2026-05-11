# 📸 SnapQuote: Photo-based Quote Request (Puzzle #84)

## 📌 Tổng quan
Ứng dụng cung cấp một biểu mẫu báo giá thông minh, cho phép người dùng tải lên hình ảnh hiện trạng dự án để nhận được báo giá chính xác nhất. Đây là tính năng cực kỳ hữu ích cho các doanh nghiệp dịch vụ như thiết kế nội thất, cảnh quan hoặc sửa chữa.

## 🛠️ Công nghệ sử dụng
- **Object URL Management**: Sử dụng `URL.createObjectURL` để hiển thị ảnh ngay lập tức mà không cần tải lên Server trước. Đi kèm với cơ chế `cleanup` (thu hồi URL) để tối ưu bộ nhớ.
- **Complex Validation**: Hệ thống kiểm tra điều kiện kép: Phải có ít nhất 3 ảnh + các trường thông tin bắt buộc phải được điền đầy đủ mới cho phép gửi.
- **Framer Motion AnimatePresence**: Xử lý hiệu ứng thêm/xóa ảnh và hiển thị Modal thành công một cách sinh động.
- **Tailwind CSS Grid & Glassmorphism**: Xây dựng bố cục 2 cột chuyên nghiệp với hiệu ứng mờ ảo (blur) của Dark Mode.

## 💡 Giải pháp kỹ thuật
1.  **Strict State Control**: Dữ liệu Form và Danh sách ảnh được quản lý bởi các State riêng biệt với kiểu dữ liệu (Types) chặt chẽ, ngăn ngừa mọi lỗi Runtime.
2.  **Visual Indicators**: Sử dụng các tín hiệu màu sắc (Cyan cho hành động, Red cho lỗi bỏ sót) giúp người dùng biết chính xác họ cần làm gì tiếp theo.
3.  **Real-time Preview**: Ảnh được hiển thị ngay sau khi chọn, cho phép người dùng kiểm tra lại hoặc xóa những ảnh không ưng ý trước khi gửi chính thức.
4.  **Submission UX**: Nút gửi có 3 trạng thái (Disabled -> Ready -> Submitting -> Success) mang lại cảm giác tin cậy và chuyên nghiệp.

## 🚀 Tính năng chính
- [x] **Multi-image Upload**: Tải nhiều ảnh cùng lúc.
- [x] **Live Previews**: Xem trước ảnh tức thì.
- [x] **Smart Validation**: Chặn gửi nếu chưa đủ 3 ảnh hoặc thiếu mô tả.
- [x] **Success Modal**: Thông báo xác nhận chuyên nghiệp.

## 🏷️ Tags
`Forms` · `FileUpload` · `UX` · `FramerMotion`
