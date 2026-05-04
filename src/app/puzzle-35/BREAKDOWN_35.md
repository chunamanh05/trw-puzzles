# Phân tích Puzzle 35: Sticky Sidebar & Scroll Spy

## Mục Tiêu
Xây dựng một hệ thống điều hướng thông minh (Smart Navigation) với thanh bên (Sidebar) cố định khi cuộn và tự động làm nổi bật mục tương ứng với nội dung đang hiển thị trên màn hình.

## Kỹ Thuật Triển Khai

### 1. Sticky Positioning (CSS)
Sử dụng thuộc tính `position: sticky` và `top: 0` cho phần Sidebar. Điều này giúp Sidebar "dính" vào lề trên của trình duyệt khi người dùng cuộn qua vùng chứa chính, nhưng vẫn nằm trong luồng bố cục tự nhiên của trang.

### 2. Scroll Spy với Intersection Observer
Thay vì lắng nghe sự kiện `scroll` liên tục (gây tốn hiệu năng), hệ thống sử dụng **Intersection Observer API**:
- Nó sẽ theo dõi khi nào 50% diện tích của một Section (`#hero`, `#services`, v.v.) lọt vào khung hình (viewport).
- Khi phát hiện sự giao thoa (Intersection), nó sẽ cập nhật trạng thái `activeSection`, từ đó làm sáng nút tương ứng trên Sidebar.

### 3. Smooth Scrolling & Progress Tracking
- **Smooth Scroll:** Sử dụng hàm `element.scrollIntoView({ behavior: "smooth" })` để tạo hiệu ứng trượt mượt mà khi người dùng click vào menu.
- **Scroll Progress:** Kết hợp `framer-motion` (`useScroll`) để vẽ một thanh tiến trình (Progress Bar) chạy ngang trên cùng của website, cho biết người dùng đã đọc được bao nhiêu phần trăm trang web.

### 4. Thiết kế Layout bậc thang
Giao diện được chia thành 4 Section lớn với các phong cách thiết kế khác nhau (Hero, Grid, Tech Chips, Gradient Form) để người dùng có thể thấy rõ sự chuyển đổi trạng thái khi cuộn qua các vùng nội dung dài.

## Cách kiểm tra
1. Truy cập `localhost:3000/puzzle-35`.
2. Cuộn chuột xuống dưới và quan sát Sidebar bên trái: các mục sẽ tự động đổi màu và có thanh chỉ báo chạy theo.
3. Nhấn vào các mục trên Sidebar để thấy trang web tự động cuộn đến vị trí chính xác một cách mượt mà.
