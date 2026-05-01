# 🧩 Breakdown: Puzzle #18 — Scroll-Controlled Video (Canvas Image Sequence)

## PHẦN 1: Tư duy & Phân tích yêu cầu

Yêu cầu của Puzzle này là tạo một trang đích (Landing Page) nơi người dùng **cuộn chuột để tua video**, thay vì dùng nút Play/Pause.

### Tại sao không dùng thẻ `<video>`?
Nếu bạn gắn sự kiện cuộn chuột vào thuộc tính `currentTime` của thẻ `<video>`, video sẽ bị giật lag kinh khủng trên điện thoại và safari vì trình duyệt phải liên tục decode video codec giữa các frame ngẫu nhiên.

### Giải pháp chuyên nghiệp: Image Sequence + Canvas
Apple đã tiên phong kỹ thuật này:
1. Export video 3D ra thành hàng trăm tấm ảnh tĩnh (.jpg hoặc .webp).
2. Tạo một thẻ `<canvas>` để vẽ ảnh.
3. Liên kết `% cuộn chuột` với `Index` của bức ảnh. Cuộn đến đâu, vẽ bức ảnh tương ứng đến đó bằng `requestAnimationFrame`.
=> Khung hình sẽ mượt tuyệt đối (60fps), giống hệt việc bạn đang cầm một cuốn sổ lật hình (flipbook).

---

## PHẦN 2: Triển khai kỹ thuật

### 1. Preloading (Tải trước hình ảnh)
Để trải nghiệm không bị khựng, **toàn bộ 148 tấm ảnh phải được tải (preload) trước khi người dùng kịp cuộn**. 
Tôi đã thiết kế một Loading Screen (màu vàng luxury) dùng hàm `Image.onload` để đo lường tiến độ tải file và chỉ hiển thị giao diện khi `progress === 100%`.

### 2. Framer Motion Scroll Mapping
Tôi dùng hook `useScroll` của Framer Motion để tính toán tiến trình cuộn của container (từ 0 đến 1).
- Nếu `latest === 0`, ta lấy `ảnh số 0`.
- Nếu `latest === 1`, ta lấy `ảnh số 147`.
Công thức: `Math.floor(latest * FRAME_COUNT)`.

### 3. Đồng bộ hiệu ứng chữ (Typography)
Không chỉ hình ảnh thay đổi, mà các dòng chữ vàng "Precision Redefined" và "Engineered Perfection" cũng được gán (map) với `scrollYProgress`.
- Từ 0% -> 25%: Chữ 1 biến mất và trôi lên trên.
- Từ 30% -> 45%: Chữ 2 bắt đầu hiện ra ở giữa màn hình.

---

## TÓM TẮT BÀI HỌC
1. **Canvas DrawImage:** Là phương pháp tốt nhất để làm "Interactive Video" trên web. Đừng cố gắng hack thẻ `<video>`.
2. **Preloading is Mandatory:** Nếu làm Image Sequence mà không Preload, web sẽ tải ảnh không kịp khi người dùng cuộn nhanh, dẫn đến màn hình đen xì.
3. **Sticky Positioning:** Chiều cao của container chứa toàn bộ trang là rất lớn (ví dụ: `500vh`), nhưng thẻ canvas bên trong phải là `sticky top-0 h-screen` để nó luôn nằm giữa màn hình trong suốt quá trình bạn cuộn hết 500vh đó.
