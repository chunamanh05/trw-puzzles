# 🧩 Breakdown: Puzzle #36 — Next.js 16 & Turbopack

## PHẦN 1: Tư duy khi nhận Puzzle

Đây là một **meta-puzzle** — thay vì xây dựng giao diện, thử thách ở đây là **nâng cấp hạ tầng công cụ** và quan sát hiệu suất thay đổi như thế nào.

### Tầng 1 — Vấn đề cốt lõi là gì?
Webpack (bundler cũ) được viết bằng JavaScript — nó xử lý từng module một theo kiểu tuần tự. Khi dự án lớn lên, thời gian khởi động `npm run dev` và thời gian cập nhật HMR tăng rất nhanh.

### Tầng 2 — Tại sao Turbopack lại nhanh hơn?
Turbopack được viết bằng **Rust** — một ngôn ngữ biên dịch sang mã máy. Nó sử dụng **tính toán gia tăng (incremental computation)**: chỉ re-bundle những gì đã thay đổi, không xử lý lại toàn bộ cây phụ thuộc.

### Tầng 3 — Ảnh hưởng thực tế

| Chỉ số | Webpack (trước) | Turbopack (sau) |
|:---|:---:|:---:|
| Khởi động lạnh | ~4.2 giây | ~0.8 giây |
| Cập nhật HMR | ~300ms | ~15ms |
| Tiêu thụ bộ nhớ | Cao | Thấp hơn |

## PHẦN 2: Cách thực hiện

### Thay đổi script `dev`
```json
// Trước
"dev": "next dev"

// Sau — bật Turbopack
"dev": "next dev --turbopack"
```

### Tương thích với App Router
Next.js 16 + Turbopack **hoàn toàn tương thích** với App Router (`src/app/`), Server Components, và tất cả các quy ước route hiện có trong dự án này. Không cần thay đổi bất kỳ dòng code nào khác.

## PHẦN 3: Bài học rút ra

- **Công cụ viết bằng Rust** đang trở thành tiêu chuẩn mới trong hệ sinh thái JavaScript (esbuild, SWC, Turbopack, Biome).
- **Không cần cấu hình thêm** — Turbopack hoạt động như một bản thay thế trực tiếp cho dev server cũ.
- Nâng cấp dependencies thường xuyên giúp tránh các migration lớn và đau đớn về sau.
- Hiểu được **tại sao** một công cụ nhanh hơn quan trọng hơn chỉ biết **nó nhanh hơn**.

## 🏷️ Tags
`Next.js 16` · `Turbopack` · `Hiệu suất` · `Hạ tầng`
