# 🌓 VisuCompare: Before/After Slider (Puzzle #85)

## 📌 Tổng quan
Ứng dụng cho phép người dùng so sánh sự thay đổi giữa hai trạng thái của cùng một khung cảnh (Before vs After) thông qua thanh trượt kéo ngang. Đây là công cụ hoàn hảo để trình diễn kết quả của các dịch vụ tối ưu hóa, sửa chữa hoặc thiết kế.

## 🛠️ Công nghệ sử dụng
- **Overlay Clipping Mechanism**: Thay vì dùng CSS `clip-path` (đôi khi khó tương thích), ứng dụng sử dụng cơ chế `overflow: hidden` trên một thẻ div con. Ảnh lớp trên sẽ có chiều rộng thực tế cố định theo Container mẹ để tránh bị méo (stretched) khi kéo thanh trượt.
- **Unified Input Handling**: Tích hợp đồng thời `mouseEvents` và `touchEvents` vào một hàm xử lý tọa độ chung, giúp ứng dụng hoạt động mượt mà trên cả chuột và màn hình cảm ứng.
- **Global Event Listeners**: Sử dụng `useEffect` để lắng nghe sự kiện `mouseup` trên toàn bộ cửa sổ (window), giúp dừng việc kéo thanh trượt ngay cả khi người dùng nhả chuột ở ngoài vùng ảnh.

## 💡 Giải pháp kỹ thuật
1.  **Responsive Width Sync**: Sử dụng `useRef` kết hợp với `offsetWidth` để đảm bảo ảnh lớp trên luôn khớp khít với kích thước thực tế của khung hình tại thời điểm người dùng tương tác.
2.  **Dynamic Instruction UI**: Hiệu ứng "Drag to compare" chỉ hiện lên khi người dùng ở trạng thái nghỉ (idle) tại vị trí trung tâm, giúp hướng dẫn người dùng mới một cách tinh tế.
3.  **Visual Hierarchy**: Sử dụng màu sắc và độ mờ (opacity) khác nhau cho nhãn "Before" (trắng mờ) và "After" (xanh sáng) để nhấn mạnh vào kết quả tích cực sau khi tối ưu hóa.

## 🚀 Tính năng chính
- [x] **Smooth Dragging**: Cảm giác kéo trượt mượt mà, phản hồi tức thì.
- [x] **Mobile Friendly**: Hỗ trợ vuốt chạm đa điểm.
- [x] **Interactive Handle**: Thanh trượt Glassmorphism với hiệu ứng Pulse.
- [x] **Auto-Instruction**: Hướng dẫn người dùng trực quan.

## 🏷️ Tags
`Visuals` · `Slider` · `UX` · `Comparison`
