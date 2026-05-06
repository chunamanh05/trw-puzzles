# 🧩 Breakdown: Puzzle #44 — Dynamic Blog CMS

## PHẦN 1: Tư duy khi nhận Puzzle

### Tầng 1 — Bài toán cần giải
Xây dựng một hệ thống quản lý nội dung (CMS) đầy đủ: người dùng tạo bài viết qua Admin Panel, bài viết được lưu vào database thật, và độc giả truy cập qua URL slug thân thiện.

### Tầng 2 — Kiến trúc 3 lớp
```
Admin Panel (/puzzle-44/admin)
    ↓ viết bài
api-client.ts (lớp trừu tượng)
    ↓ gọi API
Supabase (PostgreSQL trên đám mây)
    ↑ đọc dữ liệu
Public Blog (/puzzle-44 & /puzzle-44/[slug])
```

### Tầng 3 — Tại sao cần lớp `api-client.ts`?
Nếu viết trực tiếp `supabase.from("posts")` trong từng component, khi muốn đổi backend (ví dụ từ Supabase sang Prisma) ta phải sửa ở hàng chục nơi. Tách ra một lớp trung gian giúp **thay backend mà không đụng vào UI**.

## PHẦN 2: Cách thực hiện

### Kết nối Supabase (`src/lib/supabase.ts`)
```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Dynamic Route theo slug (`[slug]/page.tsx`)
Next.js App Router tự động ánh xạ URL `/puzzle-44/ten-bai-viet` sang component, ta chỉ cần đọc `params.slug`:

```ts
const { data } = await supabase
  .from("posts")
  .select("*")
  .eq("slug", params.slug)
  .single();
```

### Hàm tạo slug tiếng Việt
Đây là phần kỹ thuật thú vị nhất — cần loại bỏ dấu tiếng Việt trước khi tạo slug:

```ts
function toSlug(text: string): string {
  return text
    .normalize("NFD")                      // tách ký tự gốc và dấu
    .replace(/[\u0300-\u036f]/g, "")       // xóa các dấu (combining marks)
    .replace(/đ/g, "d").replace(/Đ/g, "D") // xử lý riêng chữ đ
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")           // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-");                 // khoảng trắng → dấu gạch ngang
}
// "Tôi Yêu Việt Nam" → "toi-yeu-viet-nam"
```

### Tại sao cần `NFD` normalize?
Chữ "ộ" trong Unicode có thể được biểu diễn theo 2 cách:
- **NFC**: `ộ` (1 ký tự tổ hợp)
- **NFD**: `o` + `̣` + `̂` (ký tự gốc + các dấu riêng lẻ)

Sau khi `normalize("NFD")`, ta chỉ cần xóa toàn bộ "dấu" (code point U+0300–U+036F) là xong.

## PHẦN 3: Bài học rút ra

- **Supabase** cho phép xây dựng fullstack app chỉ với frontend code — không cần viết backend API.
- **Dynamic routes** `[slug]` trong Next.js là chuẩn công nghiệp để xây dựng URL SEO-friendly.
- **Lớp API client** tách biệt logic dữ liệu khỏi UI — đây là nguyên tắc **Separation of Concerns**.
- Xử lý **Unicode tiếng Việt** đúng cách yêu cầu hiểu về NFD decomposition, không thể dùng regex đơn giản.

## 🏷️ Tags
`Fullstack` · `Supabase` · `CMS` · `Dynamic Route` · `Next.js` · `Unicode`
