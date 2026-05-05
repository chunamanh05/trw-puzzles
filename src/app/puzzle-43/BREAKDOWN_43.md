# Phân tích Puzzle 43: Infinite Autonomous Marquee

## Mục Tiêu
Tạo ra một hiệu ứng chuyển động vô tận (Marquee) mượt mà, tự động và có khả năng tương tác (dừng khi di chuột), thường dùng để hiển thị logo đối tác hoặc đánh giá khách hàng.

## Kỹ Thuật Triển Khai

### 1. Hiệu suất tối đa với CSS Animations
Thay vì sử dụng JavaScript để tính toán vị trí từng frame (gây tốn CPU), hệ thống sử dụng **CSS @keyframes**:
- **Kỹ thuật nhân bản (Cloning):** Nội dung được nhân bản 3 lần. Keyframe sẽ trượt từ vị trí 0 đến -33.33% (tương ứng với một độ dài nguyên bản). 
- **Seamless Loop:** Khi đạt đến điểm cuối, nó ngay lập tức nhảy về vị trí đầu một cách hoàn hảo, tạo cảm giác vô tận mà mắt thường không thể nhận ra điểm nối.

### 2. Tương tác Pause-on-Hover
Sử dụng thuộc tính `animation-play-state: paused`. 
- Khi người dùng di chuột vào vùng chứa (Container), class `group-hover:pause-animation` sẽ được kích hoạt, ngay lập tức làm đứng yên dải nội dung mà không làm reset vị trí.

### 3. Hiệu ứng Fade cạnh (Edge Masking)
Để dải nội dung không bị cắt đột ngột ở hai bên màn hình, hệ thống sử dụng hai thẻ `div` tuyệt đối ở hai đầu với dải màu `gradient` từ nền đen sang trong suốt. Điều này tạo hiệu ứng "hiện ra" và "biến mất" cực kỳ tinh tế.

### 4. Đa luồng chuyển động
- **Row 1:** Chạy từ phải sang trái với tốc độ trung bình (40s).
- **Row 2:** Chạy từ trái sang phải với tốc độ chậm hơn (50s) để tạo chiều sâu.
- **Row 3:** Chạy cực nhanh (25s) cho các từ khóa kỹ thuật.

## Cách kiểm tra
1. Truy cập `localhost:3000/puzzle-43`.
2. Quan sát các dải logo và đánh giá đang trượt tự động.
3. Di chuột vào bất kỳ dải nào để thấy nó dừng lại.
