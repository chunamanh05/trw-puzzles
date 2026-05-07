# 🎬 Cinematic Video Hero (Puzzle #61)

## 📌 Tổng quan
Thử thách này tập trung vào việc tạo ra một trải nghiệm hình ảnh choáng ngợp bằng cách sử dụng Video làm nền cho phần Hero Section. Điểm mấu chốt là xử lý layer sao cho video mượt mà, không có UI trình phát mặc định và chữ đè lên phải dễ đọc.

## 🛠️ Công nghệ sử dụng
- **HTML5 Video**: Sử dụng các thuộc tính `autoplay`, `muted`, `loop`, `playsInline` để tạo hiệu ứng background.
- **JavaScript Ref**: Dùng `useRef` để truy cập trực tiếp vào phần tử video và điều khiển `play()` / `pause()`.
- **Framer Motion**: Tạo hiệu ứng xuất hiện mượt mà cho các lớp chữ đè (Overlay).
- **CSS Object-fit**: Đảm bảo video luôn bao phủ toàn bộ màn hình (`object-cover`) mà không bị méo.

## 💡 Giải pháp kỹ thuật
1.  **Z-Index Stacking**: 
    - Lớp 0: Video nền.
    - Lớp 1: Overlay Gradient (để làm tối video, giúp chữ nổi bật).
    - Lớp 2: Content (Tiêu đề, Nút bấm).
2.  **Custom Controls**: Thay vì dùng thanh điều khiển mặc định của trình duyệt (thường rất xấu và thô), tôi thiết kế một nút bấm tối giản bằng `lucide-react` để người dùng chủ động điều khiển video.
3.  **Performance**: Sử dụng link video chất lượng cao từ CDN để đảm bảo tốc độ load nhanh và không gây giật lag.

## 🚀 Tính năng
- [x] Video nền tự động chạy và lặp lại.
- [x] Không hiển thị thanh công cụ của trình duyệt.
- [x] Nút Pause/Play tùy chỉnh bằng JavaScript.
- [x] Tiêu đề Animated overlay cực sang trọng.

## 🏷️ Tags
`Cinematic` · `Video Hero` · `Background Layer` · `Next.js` · `UX/UI`
