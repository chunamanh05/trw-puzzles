# Phân tích Puzzle 28: Raster vs Vector Lab

## Mục Tiêu
Tạo ra một công cụ so sánh chuyên sâu để chứng minh sự vượt trội của định dạng Vector (SVG) so với Raster (PNG) khi sử dụng logo trên Web, thông qua hiệu ứng kính lúp đồng bộ (Synchronized Zoom).

## Kỹ Thuật Triển Khai

### 1. Hệ thống Tải ảnh Real-time
Sử dụng `FileReader` API để cho phép người dùng tải ảnh từ máy tính cá nhân lên trình duyệt mà không cần thông qua server. 
- Ảnh PNG được xử lý và hiển thị bình thường.
- Ảnh SVG được giữ nguyên cấu trúc vector để đảm bảo độ sắc nét khi phóng đại.

### 2. Kính lúp đồng bộ (Synchronized Magnifier)
Đây là tính năng phức tạp nhất của bài toán:
- **Tọa độ hóa:** Chúng ta theo dõi vị trí chuột trên container chung (`containerRef`). Tọa độ này được chuyển đổi sang đơn vị phần trăm (%) dựa trên kích thước của vùng làm việc.
- **Ràng buộc (Binding):** Giá trị phần trăm này được truyền đồng thời vào cả hai "thấu kính" bên trái và bên phải.
- **Hiển thị:** Thấu kính thực chất là một thẻ div với `background-image` chính là logo được tải lên, nhưng với `background-size: 1000%` (phóng đại 10 lần). Bằng cách di chuyển `background-position` theo tọa độ chuột, chúng ta tạo ra cảm giác như đang soi kính lúp vào một điểm cụ thể.

### 3. Sự khác biệt thị giác (The Visual Proof)
- **PNG Side:** Tôi áp dụng thuộc tính CSS `image-rendering: pixelated`. Thuộc tính này cực kỳ quan trọng vì nó ngăn trình duyệt tự động làm mịn (anti-aliasing) khi phóng to ảnh PNG, từ đó giúp người dùng thấy rõ các "răng cưa" và điểm ảnh (pixels) bị vỡ.
- **SVG Side:** Không cần thuộc tính đặc biệt nào, vì bản chất SVG là các phép toán hình học. Khi phóng đại 1000%, trình duyệt sẽ tự động tính toán lại các đường cong, giúp logo luôn sắc nét tuyệt đối.

## Cách sử dụng
1. Nhấn **Upload PNG** để chọn ảnh logo PNG.
2. Nhấn **Upload SVG** để chọn phiên bản SVG tương ứng.
3. Di chuột qua bất kỳ ảnh nào, kính lúp sẽ xuất hiện ở cả hai bên tại cùng một vị trí. Hãy soi vào các đường cong hoặc góc nhọn để thấy sự khác biệt!
