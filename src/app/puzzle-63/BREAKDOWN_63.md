# 💠 Nexus-Q: Quantum Compute Dashboard (Puzzle #63)

## 📌 Tổng quan
Thử thách tái hiện một Dashboard quản lý tính toán lượng tử từ ảnh chụp màn hình. Hệ thống bao gồm 3 phân vùng chính: Giám sát tổng thể (Home), Máy tính chi phí (Allocator) và Trạng thái mạng lưới (Network).

## 🛠️ Công nghệ sử dụng
- **React/Next.js (App Router)**: Xây dựng cấu trúc trang và định tuyến.
- **Tailwind CSS**: Tái hiện chính xác bảng màu Cyberpunk (Neon Cyan & Deep Violet).
- **Framer Motion**: Xử lý các hiệu ứng chuyển trang, thanh trượt (Slider) và hiển thị số liệu mượt mà.
- **Lucide React**: Hệ thống Icon hiện đại cho bảng điều khiển.

## 💡 Giải pháp kỹ thuật
1.  **Compute Cost Engine**: Một thuật toán giả lập được xây dựng dựa trên 3 tham số (Model Parameters, Traffic, Latency) để tính toán số lượng Q-Credits cần thiết theo thời gian thực.
2.  **Shared Layout Pattern**: Sử dụng `layout.tsx` để giữ Navbar và các lớp phủ màu (Background Glows) đồng nhất, tạo cảm giác không gian sâu.
3.  **Mocked Grid System**: Trang Network sử dụng mảng dữ liệu giả để mô phỏng trạng thái các node trên toàn cầu, kết hợp với các thanh trạng thái động.

## 🚀 Tính năng chính
- [x] **Home**: Hero section với các chỉ số thống kê chính.
- [x] **Allocator**: Bộ máy tính toán chi phí (Compute Cost Calculator) với logic tính toán Credits theo giây, giờ, ngày và tháng.
- [x] **Network**: Hệ thống giám sát Node mạng lưới toàn cầu.
- [x] **Strict Folder Structure**: Tổ chức code theo tiêu chuẩn React sạch sẽ.

## 🏷️ Tags
`Dashboard` · `Cyberpunk UI` · `Data Visualization` · `Next.js`
