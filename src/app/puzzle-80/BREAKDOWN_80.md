# 🚀 AutomateROI: AI Agency ROI Calculator (Puzzle #80)

## 📌 Tổng quan
Thử thách xây dựng một công cụ Máy tính Lợi tức Đầu tư (ROI Calculator) thời gian thực. Ứng dụng giúp các doanh nghiệp dịch vụ (Agency) tính toán số tiền tiết kiệm được và doanh thu tăng thêm khi áp dụng Tự động hóa AI (AI Automation) vào quy trình làm việc.

## 🛠️ Công nghệ sử dụng
- **React State (`useState`)**: Lưu trữ và cập nhật 3 tham số đầu vào (Số nhân viên, Số giờ thủ công, Lương theo giờ) theo thời gian thực mỗi khi người dùng kéo thanh trượt.
- **Framer Motion (`useSpring`, `useMotionValue`)**: Được sử dụng chuyên sâu để tạo ra hiệu ứng "nhảy số" (Number Counting) mượt mà cho các chỉ số tài chính ở Thẻ tổng kết.
- **Derived State**: Tính toán các chỉ số phái sinh (Gross Savings, Productivity Boost, Net ROI, ROI Percentage) trực tiếp từ State gốc mà không cần phải dùng thêm `useEffect` dư thừa, đảm bảo hiệu suất render tối đa.
- **Tailwind CSS**: Xây dựng giao diện hai cột (Grid layout), kết hợp hiệu ứng Glassmorphism và các dải màu Gradient (Gradient backgrounds) để tạo cảm giác công nghệ tương lai (Cyberpunk/Tech aesthetic).

## 💡 Giải pháp kỹ thuật
1.  **Hybrid Input System**: Kết hợp giữa Range Slider và Number Input, đồng bộ hóa State hai chiều để mang lại trải nghiệm nhập liệu vừa nhanh vừa chính xác.
2.  **Comparison Engine**: Xây dựng bảng so sánh "Trước & Sau" (Before & After) dựa trên các giả định thực tế của ngành AI Automation (tự động hóa 90% tác vụ lặp lại).
3.  **Annualized Impact Calculation**: Tự động nhân 12 lần lợi nhuận ròng để hiển thị quy mô cơ hội trong dài hạn, tạo tác động tâm lý mạnh mẽ về con số.
4.  **Loss Aversion UI**: Thiết kế khu vực "Revenue Leakage" với tông màu cảnh báo để kích thích nhu cầu hành động ngay lập tức của khách hàng.

## 🚀 Tính năng chính
- [x] **Dual Inputs**: Thanh trượt kết hợp ô nhập số chính xác.
- [x] **Current vs Projected Table**: Bảng so sánh hiệu quả vận hành.
- [x] **Annual Projection**: Tính toán cơ hội hàng triệu đô mỗi năm.
- [x] **Revenue Leakage Alert**: Cảnh báo số tiền đang bị lãng phí.
- [x] **Growth Multipliers**: Hiển thị hệ số nhân doanh thu và tăng trưởng.

## 🏷️ Tags
`Calculator` · `FramerMotion` · `StateManagement` · `FinTech`
