# 🗺️ Contact Studio: Google Maps Embed (Puzzle #69)

## 📌 Tổng quan
Thử thách tích hợp bản đồ Google Maps vào trang liên hệ để cung cấp chỉ dẫn vị trí trực quan cho người dùng. Trang được thiết kế theo phong cách Agency hiện đại, tinh tế và tối giản.

## 🛠️ Công nghệ sử dụng
- **Google Maps Embed API**: Sử dụng phương thức nhúng Iframe tiêu chuẩn để hiển thị bản đồ mà không cần API Key phức tạp.
- **Tailwind CSS**: Thiết kế giao diện chia đôi (Split Layout) và các thành phần Input hiện đại.
- **Framer Motion**: Hiệu ứng xuất hiện mượt mà cho Form và Bản đồ.
- **Lucide React**: Hệ thống Icon chỉ dẫn (MapPin, Phone, Mail).

## 💡 Giải pháp kỹ thuật
1.  **Iframe Optimization**: Sử dụng `loading="lazy"` để tối ưu hiệu suất và `grayscale` filter (sẽ chuyển màu khi di chuột) để bản đồ trông nghệ thuật hơn, hợp với tông thiết kế web.
2.  **Interactive Overlay**: Thêm một lớp phủ (Overlay) hiển thị tên địa danh (Landmark 81) và nút liên kết trực tiếp đến ứng dụng Google Maps trên điện thoại hoặc trình duyệt.
3.  **Responsive Embed**: Sử dụng tỷ lệ khung hình `aspect-square` trên PC và tự động điều chỉnh độ cao trên Mobile để đảm bảo bản đồ luôn dễ nhìn.

## 🚀 Tính năng chính
- [x] **Live Map**: Bản đồ tương tác đầy đủ (Zoom, Pan, Map/Satellite).
- [x] **Real Link**: Bấm vào tiêu đề bản đồ sẽ mở đúng vị trí đó trên Google Maps thật.
- [x] **Contact Form**: Giao diện nhập liệu hiện đại, sẵn sàng để kết nối với Backend.

## 🏷️ Tags
`Google Maps` · `Contact Page` · `Iframe` · `UI/UX`
