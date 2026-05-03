# Phân tích Puzzle 103: Dynamic Pricing Recommender (Gợi ý gói giá động)

## Mục Tiêu
Xây dựng một bộ máy gợi ý gói cước thông minh cho một website SaaS. Hệ thống sẽ hỏi người dùng các câu hỏi về nhu cầu sử dụng và tự động đề xuất gói giá phù hợp nhất dựa trên logic tính toán.

## Kỹ Thuật Triển Khai

### 1. Thuật Toán Gợi Ý (Scoring Logic)
Hệ thống sử dụng thuật toán **"Ngưỡng yêu cầu tối thiểu" (Requirement Threshold)**.
- Mỗi câu trả lời được gắn với một chỉ số `tier` (từ 0 đến 3, tương ứng với Free, Pro, Business, Enterprise).
- Kết quả đề xuất cuối cùng được tính bằng hàm `Math.max(...answers)`.
- Điều này đảm bảo rằng: Ngay cả khi người dùng chỉ có 1 thành viên trong team (Tier 0), nhưng lại yêu cầu bảo mật cấp độ Enterprise (Tier 3), hệ thống vẫn sẽ khuyên dùng gói Enterprise vì đó là ngưỡng bắt buộc để đáp ứng nhu cầu bảo mật của họ.

### 2. Trình Thu Thập Thông Tin Động (Animated UI Wizard)
- **Framer Motion**: Được sử dụng để tạo hiệu ứng trượt (slide transition) mượt mà giữa các câu hỏi.
- **Hiệu Ứng Theo Hướng (Directional Animation)**: State `direction` theo dõi việc người dùng đang đi tiếp hay quay lại, giúp các slide bay vào từ đúng hướng trái/phải một cách tự nhiên.
- **Quản lý State**: React Hook quản lý song song bước hiện tại (step), mảng câu trả lời đã chọn, và hướng của animation.

### 3. Giao Diện Thay Đổi Linh Hoạt
- **Thanh Tiến Trình (Progress Bar)**: Chạy mượt mà tỉ lệ thuận với số lượng câu hỏi đã hoàn thành.
- **Khung Phân Tích (Breakdown Section)**: Hệ thống ánh xạ lại (map) câu trả lời của người dùng với các mô tả "Lý do" (Reasoning) đã được cài đặt sẵn. Tạo ra một bảng "Why this match?" (Tại sao lại chọn gói này?) cực kỳ thuyết phục.
- **Nút CTA Tùy Biến**: Nội dung và màu sắc của nút Call-to-Action thay đổi tương thích với gói được chọn (Ví dụ: "Contact Sales" cho gói Enterprise so với "Start Pro Trial" cho gói Pro).

## Các Tính Năng Nổi Bật (Key Features)
- **Auto-Advance**: Câu hỏi tự động chuyển sang trang tiếp theo sau 300ms kể từ khi người dùng bấm chọn, giúp tăng tốc độ trải nghiệm (UX).
- **Responsive 100%**: Thiết kế tương thích hoàn toàn trên cả Mobile và Desktop nhờ hệ thống grid và padding linh hoạt của Tailwind.
- **Phong cách Dark Luxury**: Ứng dụng bảng màu Deep Slate & Blue tối màu, kết hợp với các hiệu ứng border và glow mờ ảo để duy trì đúng định hướng thương hiệu của dự án TRW Puzzles.
