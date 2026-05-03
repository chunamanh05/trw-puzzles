# Phân tích Puzzle 28: Raster vs Vector Lab

## Mục Tiêu
Tạo ra một công cụ so sánh chuyên sâu để chứng minh sự vượt trội của định dạng Vector (SVG) so với Raster (PNG) khi sử dụng logo trên Web, thông qua hiệu ứng kính lúp đồng bộ (Synchronized Zoom).

## Kỹ Thuật Triển Khai

### 1. Hệ thống Tải ảnh Đôi (Dual Upload)
Sử dụng `FileReader` API để cho phép người dùng tải lên đồng thời 2 phiên bản của cùng một logo (1 file PNG và 1 file SVG) từ máy tính cá nhân.
- Nút **Upload PNG**: Nạp ảnh điểm ảnh (Raster) vào thấu kính bên trái.
- Nút **Upload SVG**: Nạp ảnh đường cong toán học (Vector) vào thấu kính bên phải.

*(Lưu ý: Để có file SVG chuẩn, bạn cần dùng các công cụ Vectorizer chuyên nghiệp như Vector Magic, Adobe Illustrator, thay vì tự convert bằng các tool online kém chất lượng).*

### 2. Kính lúp đồng bộ (Synchronized Magnifier)
Đây là tính năng phức tạp nhất của bài toán:
- **Tọa độ hóa:** Chúng ta theo dõi vị trí chuột trên container chung (`containerRef`). Tọa độ này được chuyển đổi sang đơn vị phần trăm (%) dựa trên kích thước của vùng làm việc.
- **Ràng buộc (Binding):** Giá trị phần trăm này được truyền đồng thời vào cả hai "thấu kính" bên trái và bên phải.
- **Hiển thị:** Thấu kính thực chất là một thẻ div với `background-image` chính là logo được tải lên, nhưng với `background-size: 1500%` (phóng đại 15 lần). Bằng cách di chuyển `background-position` theo tọa độ chuột, chúng ta tạo ra cảm giác như đang soi kính lúp vào một điểm cụ thể.

### 3. Sự khác biệt thị giác (The Visual Proof)
- **PNG Side:** Tôi áp dụng thuộc tính CSS `image-rendering: pixelated`. Thuộc tính này cực kỳ quan trọng vì nó ngăn trình duyệt tự động làm mịn (anti-aliasing) khi phóng to ảnh PNG, từ đó giúp bạn thấy rõ các "răng cưa" và điểm ảnh (pixels) bị vỡ - giống như các khối vuông xếp hình.
- **SVG Side:** Không cần thuộc tính đặc biệt nào. Bản chất SVG là các lệnh vẽ toán học (các thẻ `<path>`). Khi phóng đại 1500%, trình duyệt sẽ tự động tính toán lại các đường cong, giúp logo luôn sắc nét tuyệt đối, không hề có bất kỳ khối pixel nào.

## Cách sử dụng
1. Bạn có thể bấm **Load Samples** để xem thử mẫu mặc định.
2. Để thực hành, hãy bấm **Upload PNG** và **Upload SVG** để tải cặp file logo của chính bạn lên.
3. Di chuột qua ảnh để dùng kính lúp soi sự khác biệt giữa "Vỡ hạt" và "Đường cong mượt mà"!
