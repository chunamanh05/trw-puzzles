# 🧩 Breakdown: Puzzle #106 — Secure Vault Access (Nội Dung Có Bảo Vệ)

## PHẦN 1: Tư duy khi nhận Puzzle

### Tầng 1 — Bài toán là gì?
Xây dựng một hệ thống "cổng" — chỉ những ai có mã truy cập đúng mới được xem nội dung bên trong. Và trạng thái mở khóa phải được nhớ sau khi tải lại trang.

### Tầng 2 — Ba vấn đề cần giải quyết
1. **Lưu mã hợp lệ ở đâu?** → Mảng/Set trong code (client-side, vì đây là puzzle)
2. **Kiểm tra mã như thế nào?** → So sánh sau khi chuẩn hóa (trim + uppercase)
3. **Nhớ trạng thái sau refresh?** → `localStorage`

### Tầng 3 — Trải nghiệm người dùng quan trọng không kém logic
- Gõ sai → cần phản hồi ngay, visual (animation lắc) tốt hơn text lỗi đơn thuần
- Gõ đúng → nội dung hiện ra mượt mà, không "bật cộc"
- Vào lại trang → không phải nhập lại mã

## PHẦN 2: Cách thực hiện

### Danh sách mã hợp lệ — dùng `Set` thay vì `Array`
```ts
// ❌ Kém hơn — Array.includes() là O(n)
const VALID_CODES = ["ELITE2024", "VAULT-X", "PREMIUM99"];
VALID_CODES.includes("VAULT-X"); // phải duyệt từng phần tử

// ✅ Tốt hơn — Set.has() là O(1), tra cứu tức thì
const VALID_CODES = new Set(["ELITE2024", "VAULT-X", "PREMIUM99", "TRW-ACCESS", "HORIZON"]);
VALID_CODES.has("VAULT-X"); // kiểm tra hash table, không cần duyệt
```

### Logic xác thực
```ts
const handleSubmit = () => {
  // Chuẩn hóa đầu vào: xóa khoảng trắng, chuyển hoa
  const normalized = inputValue.trim().toUpperCase();

  if (VALID_CODES.has(normalized)) {
    localStorage.setItem("vault_access", "true"); // ghi nhớ
    setIsUnlocked(true);                           // cập nhật UI
  } else {
    setShake(true);                                 // kích hoạt animation lắc
    setTimeout(() => setShake(false), 600);         // reset sau khi animation xong
  }
};
```

### Persistence với `localStorage`
```ts
// Khi component mount — kiểm tra xem đã từng mở khóa chưa
useEffect(() => {
  const saved = localStorage.getItem("vault_access");
  if (saved === "true") setIsUnlocked(true); // bỏ qua màn hình nhập mã
}, []); // [] = chỉ chạy một lần khi mount
```

### Animation lắc (Shake) — CSS thuần
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-10px); }
  40%       { transform: translateX(10px); }
  60%       { transform: translateX(-8px); }
  80%       { transform: translateX(8px); }
}

.shake {
  animation: shake 0.5s ease;
}
```
Sau 600ms, ta reset class `shake` để animation có thể kích hoạt lại ở lần gõ sai tiếp theo.

### Reveal animation khi mở khóa (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}   // bắt đầu: trong suốt, dịch xuống 30px
  animate={{ opacity: 1, y: 0 }}    // kết thúc: hiện đầy đủ, đúng vị trí
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Nội dung bí mật */}
</motion.div>
```

## PHẦN 3: Bài học rút ra

- **`localStorage`** phù hợp để lưu trạng thái đơn giản (boolean, string) giữa các phiên trình duyệt.
- **`Set.has()`** luôn nhanh hơn `Array.includes()` cho bài toán kiểm tra thành viên.
- **Chuẩn hóa đầu vào** (`trim().toUpperCase()`) trước khi so sánh tránh lỗi do khoảng trắng hay viết thường/hoa.
- **Animation lắc** cho phản hồi lỗi tốt hơn nhiều so với hiển thị text lỗi — người dùng cảm nhận ngay mà không cần đọc.
- Trong thực tế, **không bao giờ lưu mã bảo mật ở client-side** — mọi xác thực phải xảy ra ở server.

## 🏷️ Tags
`Bảo Mật` · `LocalStorage` · `Nội Dung Có Bảo Vệ` · `Framer Motion` · `UX Phản Hồi`
