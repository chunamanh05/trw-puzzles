# Phân tích Puzzle 31: Python QR Microservice

## Mục Tiêu
Xây dựng một tính năng tạo mã QR bằng thư viện Python và tích hợp nó vào dự án Next.js hiện tại thay vì chỉ chạy bằng Terminal rời rạc.

## Kỹ Thuật Triển Khai (Full-Stack Kiến Trúc)

### 1. Python Backend (`generate_qr.py`)
Đóng vai trò là một Microservice cực nhỏ:
- **Thư viện `qrcode`:** Chịu trách nhiệm mã hóa chuỗi URL thành ma trận nhị phân chuẩn ISO/IEC 18004. Ở đây tôi đã cấu hình `error_correction=ERROR_CORRECT_H` (mức sửa lỗi cao nhất lên đến 30%), nghĩa là bạn có thể che đi một góc của mã QR mà camera vẫn quét được.
- **Base64 Encoding:** Thay vì lưu file trực tiếp ra ổ cứng (gây rác hệ thống và khó quản lý file trong môi trường web), script này lưu ảnh vào bộ nhớ đệm (RAM) qua `io.BytesIO()`, sau đó mã hóa ảnh thành một chuỗi văn bản (Base64) và in ra màn hình.

### 2. Trạm trung chuyển API (`src/app/api/puzzle-31/route.ts`)
Đây là cầu nối giữa giao diện web và file Python:
- Sử dụng hàm `exec` của Node.js (`child_process`) để chạy dòng lệnh: `python generate_qr.py "https://link.com"`.
- API này sẽ "bắt" lấy chuỗi Base64 mà file Python vừa in ra, đóng gói lại thành định dạng JSON và gửi trả về cho trình duyệt.

### 3. Giao diện Web (`src/app/puzzle-31/page.tsx`)
- Thay vì bắt bạn phải mở Terminal gõ lệnh rườm rà, tôi đã tạo hẳn một giao diện chuẩn "Cyber-Luxury" màu Emerald.
- Bạn chỉ việc dán Link vào ô Input và nhấn **Generate**. Giao diện sẽ gọi API, chờ Python xử lý xong và hiển thị bức ảnh PNG trực tiếp lên màn hình cực kỳ mượt mà.
- Nút **Download PNG** cho phép bạn tải thẳng mã QR đó về máy tính.

## Cách sử dụng
1. Mở trang Puzzle 31.
2. Dán một đường link bất kỳ vào ô nhập liệu.
3. Bấm Generate và quét thử bằng camera điện thoại của bạn nhé!
