# 🧭 Strategy Matcher: Service Inquiry Router (Puzzle #82)

## 📌 Tổng quan
Ứng dụng là một bộ lọc khách hàng (Lead Qualification) thông minh. Thay vì sử dụng form tĩnh, nó dẫn dắt người dùng qua một hành trình trải nghiệm đa bước để tìm ra dịch vụ phù hợp nhất với nhu cầu và ngân sách của họ.

## 🛠️ Công nghệ sử dụng
- **React State Manager**: Sử dụng `step` để quản lý vị trí câu hỏi, `answers` (object) để lưu trữ các lựa chọn của người dùng xuyên suốt quá trình, và `showResult` để kích hoạt màn hình kết quả.
- **Framer Motion**: Xử lý các hiệu ứng chuyển cảnh `AnimatePresence`. Các câu hỏi trượt ngang mượt mà tạo cảm giác ứng dụng cao cấp.
- **Routing Logic Engine**: Một hàm `getOutcome()` đơn giản nhưng mạnh mẽ, phân tích sự kết hợp giữa "Quy mô", "Mục tiêu" và "Ngân sách" để trả về 1 trong 3 kết quả chiến lược.
- **Tailwind CSS**: Thiết kế hệ thống Card Selection với các trạng thái `group-hover` và `active` (Deep Indigo theme).

## 💡 Giải pháp kỹ thuật
1.  **State Preservation**: Bằng cách lưu câu trả lời vào một Object `answers`, hệ thống có thể "nhớ" được người dùng đã chọn gì ở bước 1 để hiển thị lại thông tin đó ở trang kết quả cuối cùng (Personalization).
2.  **Logic Mapping**:
    *   **Starter**: Dành cho Startup hoặc ngân sách thấp.
    *   **Growth**: Dành cho mục tiêu tăng trưởng hoặc ngân sách trung bình.
    *   **Enterprise**: Dành cho doanh nghiệp lớn hoặc ngân sách cao.
3.  **Spring-Loaded Progress**: Thanh tiến trình (Progress Bar) được gắn hiệu ứng Spring giúp nó tăng lên một cách "nảy" và sinh động mỗi khi người dùng trả lời xong một câu hỏi.
4.  **Auto-Advance**: Khi người dùng chọn một thẻ, hệ thống sẽ đợi 300ms (để họ thấy được trạng thái đã chọn) rồi tự động chuyển sang câu tiếp theo, giúp giảm bớt thao tác nhấn nút "Tiếp theo".

## 🚀 Tính năng chính
- [x] **Multi-step Journey**: Hành trình 3 bước chuyên nghiệp.
- [x] **Card Selection**: Giao diện chọn thẻ trực quan với icon.
- [x] **Dynamic Routing**: Tự động điều hướng kết quả theo logic.
- [x] **Summary Recap**: Nhắc lại các lựa chọn của người dùng ở trang cuối.

## 🏷️ Tags
`LeadGen` · `UXFlow` · `MultiStepForm` · `FramerMotion`
