# 🧠 Puzzle #54: Progressive Disclosure Form

## 🌟 Tổng quan
Xây dựng một form tính giá bảo hiểm (CASCO) sử dụng kỹ thuật **Progressive Disclosure**. Các phần của form sẽ được "tiết lộ" dần dần dựa trên hành động của người dùng, giúp tối ưu hóa trải nghiệm và tăng tỷ lệ hoàn thành form.

## 🛠️ Công nghệ sử dụng
- **React State**: Theo dõi dữ liệu nhập vào để quyết định khi nào hiển thị bước tiếp theo.
- **Framer Motion**: Tạo hiệu ứng trượt và mờ dần (staggered reveal) cho các section mới.
- **Tailwind CSS**: Thiết kế giao diện hiện đại với hệ màu Rose/Dark.
- **Lucide React**: Icon minh họa trực quan cho các loại phương tiện và đối tượng.

## 💡 Giải pháp kỹ thuật

### 1. Kỹ thuật Tiết lộ thông tin (Progressive Disclosure)
Thay vì hiển thị tất cả các field cùng một lúc, chúng ta sử dụng các điều kiện logic:
- Bước 2 (Brand/Model) chỉ hiện khi **Vehicle Type** được chọn.
- Bước 3 (Market Value) chỉ hiện khi **Brand & Model** đã được nhập.
- Nút tính toán cuối cùng chỉ hiện khi thông tin cơ bản đã đầy đủ.

### 2. Trải nghiệm người dùng (UX)
- **Hành động phản hồi tức thì**: Người dùng nhận thấy form đang "lắng nghe" và phản ứng với mỗi lựa chọn của họ.
- **Giảm áp lực tâm lý**: Bằng cách chia nhỏ form, người dùng cảm thấy quá trình nhập liệu nhanh chóng và ít tốn sức hơn.
- **Animation mượt mà**: Việc xuất hiện đột ngột có thể gây khó chịu, vì vậy chúng ta dùng hiệu ứng trượt nhẹ (Y: 20 -> 0) để tạo cảm giác tự nhiên.

### 3. Thiết kế Responsive
- Grid hệ thống tự động chuyển đổi từ 3 cột (Desktop) sang 1 cột (Mobile) cho phần chọn loại xe.
- Input fields được tối ưu hóa kích thước cho cả cảm ứng và chuột.

## 🚀 Bài học rút ra
- **Ít hơn là nhiều hơn (Less is More)**: Trong thiết kế form, việc ẩn đi những thứ chưa cần thiết là chìa khóa để giữ chân người dùng.
- **Feedback Loop**: Luôn cho người dùng thấy kết quả cuối cùng (giá bảo hiểm) một cách nổi bật để hoàn tất chu trình trải nghiệm.

## 🏷️ Tags
`UX` · `Framer Motion` · `Dynamic Form` · `Insurance UI`
