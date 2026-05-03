# Phân tích Puzzle 22: VAPI Voice Assistant Integration

## Mục Tiêu
Yêu cầu của bài toán là nhúng một trợ lý AI giao tiếp bằng giọng nói (Voice AI Agent) từ nền tảng Vapi.ai lên website của chúng ta, đồng thời xây dựng một giao diện để tương tác (nói chuyện) trực tiếp với trợ lý này.

## Kỹ Thuật Triển Khai

### 1. Tích hợp Vapi Web SDK
Thay vì sử dụng mã nhúng `<script>` tĩnh (thường dùng cho các widget bong bóng chat mặc định), chúng ta chọn cách cài đặt trực tiếp thư viện `@vapi-ai/web` qua npm. 
- Ưu điểm: Cho phép chúng ta kiểm soát hoàn toàn vòng đời của cuộc gọi (call lifecycle), từ đó tự do thiết kế giao diện theo ý muốn thay vì bị gò bó vào thiết kế mặc định của Vapi.
- Khởi tạo: `new Vapi(PUBLIC_KEY)` để xác thực với máy chủ Vapi.

### 2. Quản lý Trạng Thái & Sự Kiện (Event Driven)
Giao diện phản hồi lại các trạng thái của cuộc gọi thông qua hệ thống Event Listener mà Vapi cung cấp:
- `call-start` / `call-end`: Quản lý nút Bắt đầu / Kết thúc cuộc gọi.
- `speech-start` / `speech-end`: Nhận biết khi nào AI đang nói, khi nào AI đang lắng nghe (người dùng nói).
- `volume-level`: Một luồng dữ liệu liên tục trả về âm lượng của giọng nói (từ 0 đến 1). 

### 3. Giao Diện "Interactive Orb" (Quả Cầu Tương Tác)
Chúng ta thiết kế một giao diện mang phong cách Khoa học Viễn tưởng (Sci-fi) với nhân vật chính là một "Quả cầu năng lượng" (Orb):
- **Hiệu ứng Nhịp đập (Pulsing):** Sử dụng `framer-motion`, chúng ta truyền trực tiếp giá trị âm lượng (`volume`) từ Vapi vào thuộc tính `scale` và `opacity` của các vòng tròn bao quanh quả cầu. Khi bạn hoặc AI nói càng to, vòng tròn sẽ nở ra càng rộng.
- **Phản hồi Thị giác (Visual Feedback):** Màu sắc của quả cầu thay đổi dựa trên trạng thái (Màu xanh dương khi đang nghe, màu ngọc lục bảo khi AI đang trả lời).

## Lưu ý về Bảo mật & Triển khai
Trong môi trường thực tế, `PUBLIC_KEY` có thể được đặt thẳng ở Client-side (như chúng ta đang làm) vì Vapi đã thiết kế nó dùng cho mục đích web công khai. Tuy nhiên, `ASSISTANT_ID` và các logic về cấu hình Agent phức tạp hơn nên được ẩn đi hoặc quản lý chặt chẽ trên Vapi Dashboard để tránh bị lạm dụng.
