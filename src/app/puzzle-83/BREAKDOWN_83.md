# 📍 CityPulse: Service Area Checker (Puzzle #83)

## 📌 Tổng quan
Một công cụ giúp khách hàng kiểm tra xem dịch vụ có khả dụng tại khu vực của họ hay không. Ứng dụng tập trung vào tốc độ phản hồi và sự chuyển đổi linh hoạt của CTA dựa trên kết quả tìm kiếm.

## 🛠️ Công nghệ sử dụng
- **Fuzzy Matching Logic**: Sử dụng hàm chuẩn hóa dữ liệu tự chế để so khớp tên thành phố/mã bưu chính của người dùng với danh sách hỗ trợ, chấp nhận cả trường hợp người dùng gõ có dấu, không dấu, viết hoa, viết thường hoặc có khoảng trắng thừa.
- **Conditional Rendering**: Render các trạng thái UI khác nhau (`supported`, `unsupported`, `checking`) bằng `AnimatePresence` của Framer Motion để tạo hiệu ứng chuyển cảnh mượt mà.
- **Dynamic CTA**: Nút kêu gọi hành động tự động thay đổi nội dung và mục đích dựa trên kết quả (Ví dụ: "Book Now" khi có hỗ trợ, "Notify Me" khi chưa có).

## 💡 Giải pháp kỹ thuật
1.  **Normalization Engine**: Một chuỗi xử lý `.normalize("NFD").replace(/[\u0300-\u036f]/g, "")` giúp biến "Hà Nội" thành "ha noi", đảm bảo việc tìm kiếm luôn chính xác dù người dùng gõ theo phong cách nào.
2.  **Visual Feedback System**: Sử dụng màu sắc tâm lý học (Emerald xanh cho sự thành công, Orange cam cho sự cảnh báo) giúp người dùng hiểu trạng thái ngay lập tức mà không cần đọc nhiều chữ.
3.  **Simulated Latency**: Thêm một khoảng trễ nhỏ (800ms) khi "Checking" để tạo cảm giác hệ thống đang thực sự tra cứu dữ liệu nghiêm túc, tăng tính tin cậy cho ứng dụng.

## 🚀 Tính năng chính
- [x] **Smart Search**: Nhập thành phố hoặc Postcode.
- [x] **Fuzzy Match**: Tự động xử lý dấu và khoảng trắng.
- [x] **Dynamic CTA**: Chuyển đổi giữa Đặt lịch và Thông báo.
- [x] **Visual Indicators**: Icon và màu sắc trạng thái rõ ràng.

## 🏷️ Tags
`Geofencing` · `Search` · `UX` · `FramerMotion`
