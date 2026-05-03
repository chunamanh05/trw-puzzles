# Phân tích Puzzle 103: Dynamic Pricing Recommender (Gợi ý gói giá động)

## Mục Tiêu
Xây dựng một bộ máy gợi ý gói cước thông minh cho một website SaaS. Hệ thống sẽ hỏi người dùng các câu hỏi về nhu cầu sử dụng và tự động đề xuất gói giá phù hợp nhất dựa trên logic tính toán.

## Kỹ Thuật Triển Khai

### 1. Thuật Toán Gợi Ý (Scoring Logic)
Hệ thống sử dụng thuật toán **"Ngưỡng yêu cầu tối thiểu" (Requirement Threshold)** thay vì cách tính tổng điểm (sum) hay trung bình (average) truyền thống. Quy trình hoạt động như sau:

**Bước 1: Phân bổ Tier (Tier Mapping)**
Chúng ta có 4 gói cước được đánh số định danh (index):
- `0` (Starter)
- `1` (Pro)
- `2` (Business)
- `3` (Enterprise)
Mỗi tùy chọn trả lời trong từng câu hỏi đều được gán một mức `tier` tối thiểu để đáp ứng yêu cầu đó. Ví dụ ở câu hỏi Quy mô team: "Chỉ mình tôi" cần tối thiểu gói `0`, trong khi "50+ người" bắt buộc phải dùng gói `3`.

**Bước 2: Lưu trữ câu trả lời**
Khi người dùng lần lượt trả lời 3 câu hỏi, hệ thống sẽ đẩy mức `tier` của các câu trả lời đó vào mảng `answers`.
Ví dụ: Người dùng chọn:
- Quy mô team: "2-10 người" (`tier: 1`)
- Lượng Request: "< 10k" (`tier: 0`)
- Tính năng: "Dedicated Support" (`tier: 3`)
-> Mảng câu trả lời thu được là: `answers = [1, 0, 3]`

**Bước 3: Thuật toán quyết định**
Hệ thống tìm ra gói phù hợp nhất bằng hàm `Math.max(...answers)`.
- Với mảng `[1, 0, 3]`, giá trị lớn nhất là `3`. Vậy hệ thống sẽ chốt gợi ý là gói **Enterprise (Tier 3)**.
- **Tại sao không dùng tính tổng hay trung bình?** Nếu tính trung bình `(1+0+3)/3 = 1.3`, hệ thống có thể gợi ý nhầm sang gói Pro. Dù khách hàng có team nhỏ (Tier 1) và ít truy cập (Tier 0), nhưng vì họ ĐÒI HỎI tính năng "Dedicated Support" (chỉ có ở Tier 3), hệ thống buộc phải chọn gói cao nhất để đảm bảo không bị thiếu tính năng. Đây chính là nguyên lý cốt lõi của "Ngưỡng yêu cầu tối thiểu".

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
