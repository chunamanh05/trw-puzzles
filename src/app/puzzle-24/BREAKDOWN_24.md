# Phân tích Puzzle 24: Click-to-Flip Card (Thẻ Đen Đặc Quyền)

## Mục Tiêu
Xây dựng một thành phần thẻ (Card) có khả năng xoay 180 độ quanh trục Y khi người dùng click chuột, tiết lộ nội dung khác ở mặt sau với hiệu ứng 3D chân thực.

## Kỹ Thuật Triển Khai

### 1. Nguyên lý 3D trong không gian Web
Để tạo ra cảm giác thẻ đang xoay trong không gian 3 chiều, chúng ta sử dụng bộ ba thuộc tính CSS quan trọng:
- **`perspective: 1000px`:** Đặt ở container cha để tạo "điểm nhìn" (tương tự như ống kính camera). Giá trị 1000px giúp hiệu ứng xoay trông tự nhiên, không bị quá méo hay quá phẳng.
- **`transform-style: preserve-3d`:** Cho phép các phần tử con (Mặt trước/Mặt sau) giữ vững tọa độ 3D của chúng khi xoay.
- **`backface-visibility: hidden`:** Đây là chìa khóa. Nó giúp ẩn đi mặt sau của một phần tử khi nó đang quay lưng về phía người xem. Nhờ đó, khi Mặt trước xoay 180 độ, nó sẽ biến mất và để lộ Mặt sau đã được xoay sẵn 180 độ từ trước.

### 2. Điều khiển chuyển động bằng Framer Motion
Chúng ta sử dụng `framer-motion` để quản lý việc lật thẻ thông qua state `isFlipped`.
- **Trạng thái lật:** `animate={{ rotateY: isFlipped ? 180 : 0 }}`.
- **Spring Physics:** Sử dụng kiểu `spring` (lò xo) với `stiffness: 260` và `damping: 20`. Điều này tạo ra một lực quán tính nhẹ khi thẻ về đích, làm cho hành động lật thẻ cảm giác "đầm" và có sức nặng vật lý hơn.

### 3. Thiết kế thẩm mỹ "Velocity Black Card"
Để nâng tầm bài toán, tôi thiết kế thẻ theo phong cách **Thẻ đen đặc quyền**:
- **Chất liệu:** Sử dụng `bg-gradient-to-br` kết hợp với các hình nền vân Carbon (`carbon-fibre.png`) và các dải sọc chéo (`pinstriped-suit.png`) để giả lập bề mặt vật liệu thực.
- **Chi tiết kỹ thuật:** 
  - **Mặt trước:** Chứa logo Velocity dập nổi, tên chủ thẻ và rank "ALPHA".
  - **Mặt sau:** Chứa con chip vàng (Security Chip), mã QR Code truy cập VIP và các biểu tượng bảo mật.
- **Glow Effect:** Một vùng sáng (radial-gradient) mờ ảo chạy theo thẻ giúp tăng độ sang trọng.

## Cách sử dụng
Người dùng chỉ cần click vào bất kỳ đâu trên thẻ để thực hiện hành động lật. Hiệu ứng hoạt động mượt mà trên cả thiết bị di động và máy tính.
