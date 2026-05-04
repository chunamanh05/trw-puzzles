import sys
import qrcode
import io
import base64

def generate_qr(link):
    # Khởi tạo đối tượng QR code với các thông số tối ưu
    qr = qrcode.QRCode(
        version=1, # Kích thước ma trận nhỏ nhất có thể
        error_correction=qrcode.constants.ERROR_CORRECT_H, # Mức sửa lỗi cao nhất (High) - giúp quét dễ ngay cả khi bị che
        box_size=10, # Kích thước mỗi ô pixel
        border=4, # Kích thước viền an toàn
    )
    qr.add_data(link)
    qr.make(fit=True)
    
    # Tạo ảnh PNG với màu đen/trắng truyền thống
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Lưu ảnh vào buffer bộ nhớ thay vì ghi trực tiếp ra ổ cứng (nhanh hơn)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    
    # Encode ảnh thành chuỗi base64 để truyền qua HTTP API dễ dàng
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    
    # In ra stdout để Node.js (Next.js API) đọc được
    print(img_str)

if __name__ == "__main__":
    # Lấy đường link từ tham số dòng lệnh truyền vào
    link = sys.argv[1] if len(sys.argv) > 1 else "https://velocity.com"
    generate_qr(link)
