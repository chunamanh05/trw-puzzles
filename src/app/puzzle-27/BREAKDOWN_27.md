# Phân tích Puzzle 27: Dynamic Slider & Real-time Updates

## Mục Tiêu
Xây dựng một giao diện tương tác sử dụng thanh trượt (Slider) để điều khiển và cập nhật các giá trị khác trên màn hình theo thời gian thực (Real-time).

## Kỹ Thuật Triển Khai

### 1. Cơ chế Liên kết Dữ liệu (Data Binding)
Đây là trái tim của bài toán. Chúng ta sử dụng `useState` trong React để quản lý một giá trị duy nhất (trong trường hợp này là `storage` - dung lượng lưu trữ).
- **Input Binding:** Thanh Slider (`input type="range"`) được gắn với state này thông qua thuộc tính `value` và sự kiện `onChange`.
- **Output Binding:** Bất cứ nơi nào giá trị `storage` xuất hiện trên giao diện (số GB, số tiền, số lượng Node), nó sẽ tự động được render lại ngay khi state thay đổi.

### 2. Tính toán Logic Động (Calculated State)
Thay vì tạo nhiều state khác nhau, chúng ta sử dụng `useMemo` để tính toán các giá trị phụ thuộc từ giá trị gốc của Slider:
- **Giá tiền:** Được tính dựa trên công thức cố định ($0.15/GB).
- **Số lượng Node:** Được tính theo ngưỡng dung lượng (ví dụ: cứ 500GB cần 1 Node máy chủ).
Việc dùng `useMemo` giúp tối ưu hiệu năng, đảm bảo các phép tính chỉ chạy lại khi giá trị Slider thay đổi.

### 3. Phản hồi Thị giác (Visual Feedback)
Để giao diện trông chuyên nghiệp và "sống" hơn, chúng ta áp dụng các kỹ thuật sau:
- **Animated Progress Bar:** Thanh dung lượng ở dưới cùng sử dụng `framer-motion` để co giãn mượt mà theo giá trị Slider. Chúng ta dùng `type: "spring"` để tạo hiệu ứng đàn hồi nhẹ.
- **Counter Animation:** Khi số tiền thay đổi, chúng ta bọc nó trong `AnimatePresence` và `motion.span`. Mỗi khi con số nhảy, nó sẽ có một hiệu ứng trượt nhẹ (Y-axis transition) giúp người dùng dễ dàng nhận thấy sự thay đổi.
- **Color Gradients:** Màu sắc của các thẻ và thanh tiến trình được phối theo tông Indigo-Cyan, tạo cảm giác công nghệ hiện đại.

## Cách sử dụng
Người dùng chỉ cần kéo thanh slider ở bảng điều khiển bên trái. Toàn bộ các thẻ thống kê bên phải sẽ "nhảy" số và thay đổi kích thước ngay lập tức theo từng pixel mà người dùng di chuyển chuột.
