# 🖼️ Opti-Core: Image Optimizer (Puzzle #64)

## 📌 Tổng quan
Ứng dụng này cung cấp khả năng nén và chuyển đổi hình ảnh sang các định dạng hiện đại nhất hiện nay: **WebP** và **AVIF**. Mục tiêu là giảm dung lượng file xuống mức tối thiểu (có thể giảm tới 90%) mà vẫn giữ được chất lượng hình ảnh xuất sắc.

## 🛠️ Công nghệ sử dụng
- **Sharp (Node.js)**: Thư viện xử lý hình ảnh tốc độ cao, hỗ trợ đa luồng.
- **Libwebp Codec**: Chuyển đổi ảnh sang WebP - tiêu chuẩn web hiện đại hỗ trợ cả nén có mất dữ liệu (lossy) và không mất dữ liệu (lossless).
- **AV1 (AVIF) Codec**: Định dạng ảnh tiên tiến nhất hiện nay, dựa trên codec video AV1, cho hiệu suất nén vượt trội hơn cả WebP.
- **Framer Motion**: Giao diện so sánh trực quan và các hiệu ứng chuyển trạng thái.

## 💡 Giải pháp tối ưu hóa
Hệ thống sử dụng các tham số chuyên sâu trong thư viện Sharp để nhắm mục tiêu:
1.  **WebP**: Thiết lập `effort: 4` để cân bằng giữa tốc độ nén và dung lượng file.
2.  **AVIF**: Nhắm vào codec AV1 với thiết lập `chromaSubsampling: '4:2:0'` mặc định của Sharp để đạt được tỉ lệ nén cực cao mà mắt người khó phân biệt được sự giảm sút chất lượng.

## 🚀 Cách triển khai vào Website (Implementation)
Sau khi nén ảnh bằng Opti-Core, bạn nên sử dụng thẻ `<picture>` trong HTML để hỗ trợ đa định dạng (Fallback mechanism):

```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif">
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="Hero Image" loading="lazy">
</picture>
```

## 🏷️ Tags
`Performance` · `Image Optimization` · `WebP` · `AVIF` · `Next.js`
