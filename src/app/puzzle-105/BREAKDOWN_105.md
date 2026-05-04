# Phân tích Puzzle 105: Live Availability Booking System

## Mục Tiêu
Xây dựng một hệ thống đặt lịch (Booking System) thời gian thực với trải nghiệm người dùng (UX) mượt mà, cho phép người dùng chọn ngày, chọn khung giờ trống và thực hiện đặt lịch.

## Kỹ Thuật Triển Khai

### 1. Quản lý trạng thái Đa tầng (Multi-level State)
Hệ thống sử dụng React State để quản lý 3 tầng dữ liệu:
- `selectedDayId`: Theo dõi ngày đang được xem.
- `selectedTime`: Theo dõi khung giờ cụ thể đang được chọn.
- `isBooked`: Trạng thái xác nhận sau khi nhấn nút đặt lịch.
Dữ liệu được lọc động (Filtering) để chỉ hiển thị các slot của ngày đang chọn.

### 2. Logic Kiểm soát Slot (Availability Logic)
Mỗi khung giờ (Slot) được gán một trạng thái: `available` hoặc `booked`.
- Các slot `booked` sẽ được render với `opacity` thấp và thuộc tính `disabled`.
- Hệ thống tự động tính toán số lượng slot còn trống cho từng ngày (`openSlots`) để hiển thị ngay trên các thẻ chọn ngày, giúp người dùng đưa ra quyết định nhanh hơn.

### 3. Hiệu ứng Chuyển cảnh (Framer Motion)
- **AnimatePresence:** Khi người dùng đổi ngày, danh sách khung giờ sẽ có hiệu ứng trượt (Slide) và mờ dần (Fade), tạo cảm giác phản hồi tức thì.
- **LayoutId:** Thanh viền chọn ngày sử dụng `layoutId="day-active"` để tạo hiệu ứng di chuyển mượt mà giữa các thẻ khi người dùng click.
- **Micro-animations:** Nút bấm CTA có hiệu ứng "Shine" (quét sáng) khi hover và hiệu ứng "Spring" khi click.

## Cách sử dụng
1. Chọn một ngày trong danh sách (TUE, WED, THU, FRI).
2. Quan sát các khung giờ khả dụng (màu sáng) và đã đặt (màu tối/vô hiệu hóa).
3. Chọn một giờ và nhấn **Book this time** để trải nghiệm quy trình xác nhận đặt lịch.
