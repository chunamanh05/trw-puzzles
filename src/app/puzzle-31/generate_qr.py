import sys
import json
import qrcode
from qrcode.image.styledpil import StyledPilImage
# Chuyển sang CircleModuleDrawer để bo tròn rõ rệt thành hình tròn
from qrcode.image.styles.moduledrawers import CircleModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
import io
import base64
from PIL import Image

def generate_qr(link, logo_base64=None):
    qr = qrcode.QRCode(
        version=4,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(link)
    qr.make(fit=True)
    
    # Sử dụng CircleModuleDrawer để tạo hiệu ứng chấm tròn cực kỳ rõ nét
    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=CircleModuleDrawer(), 
        color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(0, 0, 0))
    )
    
    if logo_base64:
        try:
            if "," in logo_base64:
                logo_base64 = logo_base64.split(",")[1]
            
            logo_data = base64.b64decode(logo_base64)
            logo_img = Image.open(io.BytesIO(logo_data)).convert("RGBA")
            
            # Tính toán kích thước logo (chiếm 25% diện tích)
            basewidth = int(img.size[0] / 4)
            wpercent = (basewidth / float(logo_img.size[0]))
            hsize = int((float(logo_img.size[1]) * float(wpercent)))
            logo_img = logo_img.resize((basewidth, hsize), Image.Resampling.LANCZOS)
            
            pos = ((img.size[0] - logo_img.size[0]) // 2, (img.size[1] - logo_img.size[1]) // 2)
            
            # Đệm nền trắng cho logo
            white_bg = Image.new("RGBA", logo_img.size, "WHITE")
            white_bg.paste(logo_img, (0, 0), logo_img)
            
            img.paste(white_bg, pos)
        except Exception:
            pass
            
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    print(img_str)

if __name__ == "__main__":
    input_data = sys.stdin.read()
    try:
        data = json.loads(input_data)
        link = data.get("link", "https://velocity.com")
        logo_base64 = data.get("logo", None)
        generate_qr(link, logo_base64)
    except Exception:
        generate_qr("https://velocity.com")
