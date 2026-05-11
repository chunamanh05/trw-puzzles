# 🕒 HourGuard: Real-time Availability (Puzzle #86)

## 📌 Tổng quan
Ứng dụng tự động kiểm tra trạng thái hoạt động của doanh nghiệp dựa trên thời gian thực. Nó không chỉ hiển thị "Mở" hay "Đóng" mà còn cung cấp cơ chế "Hỗ trợ khẩn cấp" ngoài giờ hành chính, giúp tăng tỷ lệ chuyển đổi khách hàng ngay cả khi văn phòng đã nghỉ.

## 🛠️ Công nghệ sử dụng
- **Real-time Ticking**: Sử dụng `setInterval` để cập nhật đối tượng `Date` mỗi 10 giây, đảm bảo trạng thái "Mở/Đóng" luôn chính xác mà không cần tải lại trang.
- **Derived State with useMemo**: Tính toán trạng thái (`open`, `closed`, `emergency`) một cách hiệu quả dựa trên cấu hình giờ giấc và thời gian hiện tại.
- **Dynamic Contextual UI**: Toàn bộ nội dung thông báo, màu sắc chủ đạo và Nút kêu gọi hành động (CTA) đều thay đổi 100% dựa trên trạng thái thời gian thực.
- **Responsive Schedule Table**: Một bảng lịch trình chi tiết cả tuần với tính năng tự động làm nổi bật (highlight) ngày hiện tại.

## 💡 Giải pháp kỹ thuật
1.  **Time Normalization**: Toàn bộ giờ mở/đóng cửa được chuyển đổi thành số phút tính từ đầu ngày (`hh * 60 + mm`) để việc so sánh toán học trở nên đơn giản và chính xác tuyệt đối.
2.  **Emergency Tier Logic**: Ứng dụng phân loại thêm trạng thái "Emergency" - đây là khoảng thời gian ngoài giờ làm việc chính thức nhưng vẫn có nhân viên hỗ trợ khẩn cấp, giúp doanh nghiệp không bỏ lỡ những yêu cầu cấp bách.
3.  **Visual Feedback**: Sử dụng chấm tròn "Pulse" với các màu sắc chuẩn (Xanh Emerald, Vàng Amber, Đỏ) để người dùng nhận diện trạng thái chỉ trong 0.5 giây.

## 🚀 Tính năng chính
- [x] **Auto Day/Time Detection**: Tự nhận diện Thứ và Giờ.
- [x] **Live Pulse Status**: Trạng thái "nhịp đập" thời gian thực.
- [x] **Context-aware CTA**: Nút bấm thay đổi theo tình huống.
- [x] **Full Week Schedule**: Xem lịch trình cả tuần dễ dàng.

## 🏷️ Tags
`RealTime` · `BusinessLogic` · `UX` · `FramerMotion`
