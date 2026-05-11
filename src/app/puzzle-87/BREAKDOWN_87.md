# 🚀 LaunchPad: Client Readiness Checker (Puzzle #87)

## 📌 Tổng quan
Một công cụ quản lý quy trình (Workflow) giúp khách hàng tự kiểm tra mức độ chuẩn bị của mình trước khi bắt đầu một dự án. Ứng dụng này giúp chuẩn hóa dữ liệu đầu vào và giảm thiểu việc trao đổi qua lại không cần thiết giữa Agency và khách hàng.

## 🛠️ Công nghệ sử dụng
- **Reactive Progress Tracking**: Tiến độ (%) được tính toán động thông qua `useMemo` dựa trên số lượng mục đã hoàn thành trong mảng `items`.
- **Framer Motion Layout Animations**: Các thẻ checklist có hiệu ứng phản hồi khi di chuột (hover) và khi tích chọn, tạo cảm giác thỏa mãn (satisfying) cho người dùng khi hoàn thành tác vụ.
- **Dynamic Lock System**: Nút Submit được thiết lập ở trạng thái `disabled` và chỉ được "mở khóa" kèm theo hiệu ứng đổi màu rực rỡ khi đạt đúng 100%.
- **Conditional Celebration UI**: Một thông báo "Mission Accomplished" sẽ tự động xuất hiện bằng hiệu ứng trượt khi checklist được lấp đầy.

## 💡 Giải pháp kỹ thuật
1.  **State Management**: Sử dụng một mảng Object duy nhất làm "Single Source of Truth", giúp việc cập nhật trạng thái của từng mục trở nên đơn giản và nhất quán.
2.  **Visual Psychology**: Sử dụng dải màu Gradient từ Violet sang Blue để biểu thị sự chuyên nghiệp và sáng tạo. Khi hoàn thành, màu Emerald (Xanh lá) được thêm vào để tạo tín hiệu an toàn và sẵn sàng.
3.  **Responsive Layout**: Bố cục 2 cột với phần Progress được "ghim" (Sticky) giúp người dùng luôn theo dõi được tiến độ dù danh sách checklist có dài đến đâu.

## 🚀 Tính năng chính
- [x] **Live Progress Bar**: Thanh tiến trình cập nhật thời gian thực.
- [x] **Interactive Checklist**: Click để tích chọn hoặc hủy chọn.
- [x] **Smart CTA**: Nút gửi hồ sơ tự động kích hoạt khi đủ 6/6 mục.
- [x] **Celebration State**: Hiệu ứng chúc mừng khi sẵn sàng cất cánh.

## 🏷️ Tags
`Workflow` · `Checklist` · `UX` · `Operations`
