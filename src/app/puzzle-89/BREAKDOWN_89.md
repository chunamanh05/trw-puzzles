# 🩺 TechDiagnose: Smart Support Wizard (Puzzle #89)

## 📌 Tổng quan
Một bộ chẩn đoán sự cố thông minh giúp tự động hóa khâu hỗ trợ khách hàng ban đầu. Ứng dụng dẫn dắt người dùng qua các câu hỏi phân nhánh để xác định chính xác nguyên nhân gây lỗi, từ đó đưa ra mức độ khẩn cấp và giải pháp khắc phục phù hợp.

## 🛠️ Công nghệ sử dụng
- **Branching Logic Engine**: Hệ thống câu hỏi được xây dựng dưới dạng cây (Tree structure), trong đó thuộc tính `next` của mỗi lựa chọn sẽ quyết định câu hỏi tiếp theo hoặc dẫn tới kết quả cuối cùng.
- **State History Tracking**: Cho phép người dùng quay lại các câu hỏi trước đó (`goBack`) mà vẫn giữ được tính nhất quán của dữ liệu đã chọn.
- **Diagnostic Report Generator**: Ở bước cuối cùng, ứng dụng tổng hợp toàn bộ câu trả lời để tạo ra một bản "Báo cáo chẩn đoán" chuyên nghiệp, giúp kỹ thuật viên nắm bắt nhanh thực trạng máy.
- **Contextual Urgency Levels**: Phân loại mức độ nghiêm trọng (Low, Medium, High, Critical) dựa trên sự kết hợp của các câu trả lời, đi kèm với màu sắc cảnh báo tương ứng.

## 💡 Giải pháp kỹ thuật
1.  **Dynamic Routing**: Thay vì dùng các bước cố định (Step 1, 2, 3), ứng dụng sử dụng cơ chế định tuyến dựa trên ID (`stepId`), giúp linh hoạt trong việc tạo ra vô số nhánh chẩn đoán khác nhau.
2.  **Visual Feedback**: Sử dụng các Icon đặc trưng cho từng loại lỗi (Battery, Wifi, Cpu, Monitor) giúp người dùng dễ dàng nhận diện và chọn đúng vấn đề họ gặp phải.
3.  **Summary Mapping**: Toàn bộ quá trình chọn của người dùng được lưu vào mảng `answers`, biến những cú click chuột thành một bản mô tả lỗi chi tiết bằng văn bản.

## 🚀 Tính năng chính
- [x] **Smart Branching**: Câu hỏi thay đổi theo ngữ cảnh.
- [x] **Urgency Assessment**: Đánh giá mức độ khẩn cấp tự động.
- [x] **Diagnostic Summary**: Bản tóm tắt lỗi chuyên nghiệp.
- [x] **Back/Reset Functionality**: Cho phép chẩn đoán lại dễ dàng.

## 🏷️ Tags
`Support` · `Logic` · `UX` · `Diagnosis`
