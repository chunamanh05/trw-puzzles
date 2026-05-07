# 🧱 Masonry Art Studio (Puzzle #67)

## 📌 Tổng quan
Thử thách tạo ra một thư viện ảnh "không khoảng trống thừa", nơi các bức ảnh có chiều cao khác nhau được sắp xếp khít khao như những viên gạch trên tường. Đây là kiểu bố cục cực kỳ phổ biến trên Pinterest và Unsplash.

## 🛠️ Công nghệ sử dụng
- **Tailwind CSS Columns**: Sử dụng `columns-1` đến `columns-4` kết hợp với `break-inside-avoid`. Đây là giải pháp tối ưu nhất hiện nay để tạo Masonry mà không cần dùng đến các thư viện JavaScript nặng nề.
- **Framer Motion**: Tạo hiệu ứng ảnh "trồi lên" (Fade-in & Slide-up) khi người dùng cuộn trang.
- **Lucide React**: Cung cấp các icon tinh tế cho phần tương tác (Like, Share, Maximize).

## 💡 Giải pháp bố cục
1.  **Flow Logic**: CSS Columns tự động đẩy các phần tử từ trên xuống dưới, rồi sang cột tiếp theo.
2.  **Break Avoidance**: Thuộc tính `break-inside-avoid` cực kỳ quan trọng, nó ngăn việc một bức ảnh bị "cắt đôi" khi chuyển sang cột mới.
3.  **Responsive**: Tự động điều chỉnh số lượng cột dựa trên kích thước màn hình (Mobile: 1 cột, Tablet: 2 cột, Desktop: 3-4 cột).

## 🚀 Tính năng chính
- [x] **Seamless Grid**: Không có khoảng trắng dọc bị thừa.
- [x] **Aesthetic Overlays**: Lớp phủ tối màu hiện ra khi di chuột, hiển thị thông tin tác phẩm.
- [x] **Scroll Animations**: Hiệu ứng xuất hiện mượt mà khi cuộn trang.

## 🏷️ Tags
`Layout` · `Masonry` · `CSS Columns` · `Gallery`
