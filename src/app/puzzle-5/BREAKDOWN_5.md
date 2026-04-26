# 🧩 Breakdown: Puzzle #5 — Smart Pre-fill Form

## PHẦN 1: Tư duy khi nhận Puzzle

### Tầng 1 — State (Dữ liệu cần theo dõi)

| State | Kiểu | Vai trò |
|---|---|---|
| `form` | `object` | Chứa toàn bộ giá trị 4 field |
| `isReturningUser` | `boolean` | Có phát hiện dữ liệu cũ khi load trang không? |
| `saveStatus` | `"idle" \| "saving" \| "saved"` | Trạng thái của badge "Auto-saved" |
| `isSubmitted` | `boolean` | Người dùng đã bấm Submit chưa? |
| `mounted` | `boolean` | Component đã render xong phía client chưa? (Xem Block 4) |

**Quy tắc:** `maskedKey` hay bất kỳ giá trị nào có thể tính ra từ state khác → đừng tạo state mới, dùng `const` thẳng.

---

### Tầng 2 — Actions

1. **Gõ vào field** → Cập nhật `form` state + lưu vào `localStorage`
2. **Load trang / Refresh** → Đọc từ `localStorage`, pre-fill form nếu có data
3. **Bấm Submit** → Chuyển `isSubmitted = true`, hiện success UI
4. **Bấm Clear (Trash)** → Xóa `localStorage`, reset form về rỗng

### Tầng 3 — UI phản chiếu State

- `isReturningUser = true` → Hiện banner "Welcome back, [Tên]!"
- `saveStatus = "saving"` → Badge "Saving..." với icon nhấp nháy
- `saveStatus = "saved"` → Badge "Saved ✓" màu xanh
- `isSubmitted = true` → Ẩn form, hiện màn hình success với icon checkmark

---

## PHẦN 2: Cấu trúc Code — Đọc từng block

### Block 1: Kiến trúc dữ liệu

```tsx
const STORAGE_KEY = "puzzle5_form_data";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
}
```

- `STORAGE_KEY` là một hằng số (constant). Đặt ra ngoài để tránh lỗi typo nếu dùng lại nhiều nơi.
- `interface FormData` định nghĩa hình dạng của dữ liệu. TypeScript giúp đảm bảo bạn không bao giờ gõ sai tên field.

---

### Block 2: Đọc dữ liệu khi tải trang (localStorage → State)

```tsx
useEffect(() => {
  setMounted(true);
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const saved: FormData = JSON.parse(raw);
    const hasData = Object.values(saved).some((v) => v.trim() !== "");
    if (hasData) {
      setForm(saved);
      setIsReturningUser(true);
    }
  }
}, []);
```

**Tại sao phải trong `useEffect`?**

> Next.js render component 2 lần: lần đầu trên Server (Node.js), lần 2 trên trình duyệt (Client).
> Server không có `localStorage` → Nếu gọi `localStorage` ngoài `useEffect`, app sẽ bị crash ngay.
> `useEffect` chỉ chạy ở phía Client, sau khi component đã được "gắn" vào trình duyệt.

**`JSON.parse` và `JSON.stringify`:** localStorage chỉ lưu được `string`. Vì vậy:
- Khi **ghi**: `JSON.stringify(object)` → biến object thành chuỗi JSON.
- Khi **đọc**: `JSON.parse(string)` → biến chuỗi JSON trở lại thành object.

---

### Block 3: Ghi dữ liệu khi user gõ (State → localStorage)

```tsx
const saveToStorage = useCallback((data: FormData) => {
  setSaveStatus("saving");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  setTimeout(() => setSaveStatus("saved"), 600);
  setTimeout(() => setSaveStatus("idle"), 2200);
}, []);

const handleChange = (key: keyof FormData, value: string) => {
  const updated = { ...form, [key]: value };
  setForm(updated);
  saveToStorage(updated);
};
```

**Tại sao dùng `useCallback`?** Để React không tạo lại hàm `saveToStorage` mới sau mỗi lần render → tối ưu hiệu năng.

**`keyof FormData`:** TypeScript đảm bảo rằng tham số `key` chỉ được là một trong các key hợp lệ: `"name"`, `"email"`, `"company"`, hoặc `"role"`. Không thể truyền vào giá trị tùy tiện.

**`{ ...form, [key]: value }`:** Tạo một bản copy mới của form với đúng 1 field được cập nhật. Dấu `[key]` là cú pháp "Computed Property Name" — cho phép dùng biến làm tên thuộc tính động.

---

### Block 4: Xử lý Hydration Mismatch (Vấn đề đặc thù của Next.js)

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  // ...đọc localStorage
}, []);

if (!mounted) return null;
```

**Vấn đề:** Next.js render HTML trên Server trước (form rỗng). Sau đó trình duyệt nhận HTML đó, đọc localStorage, và muốn điền dữ liệu vào (form có data). Hai kết quả này khác nhau → React báo lỗi "Hydration Mismatch".

**Giải pháp:** Không render gì cả (`return null`) cho đến khi `mounted = true`. Điều này đảm bảo Server và Client đều render cùng một thứ ở lần đầu (không có gì), rồi Client mới cập nhật với dữ liệu thật.

---

### Block 5: Cấu trúc field dạng mảng (Tái sử dụng cao)

```tsx
const fields = [
  { key: "name", label: "Full Name", type: "text", placeholder: "...", icon: User },
  // ...
];

// Trong JSX:
{fields.map(({ key, label, type, placeholder, icon: Icon }) => (
  <div key={key}>
    <input value={form[key]} onChange={(e) => handleChange(key, e.target.value)} />
  </div>
))}
```

**Tại sao dùng cách này?** Thay vì viết 4 khối `<div><input>` giống hệt nhau (lặp code), tôi khai báo "cấu hình" các field trong một mảng và chỉ viết code render **một lần**. Muốn thêm field mới? Chỉ cần thêm 1 dòng vào mảng.

---

## PHẦN 3: Công nghệ cốt lõi — `localStorage`

| Phương thức | Chức năng |
|---|---|
| `localStorage.setItem(key, value)` | Lưu một cặp key-value (cả hai phải là string) |
| `localStorage.getItem(key)` | Đọc giá trị theo key, trả về `null` nếu không tìm thấy |
| `localStorage.removeItem(key)` | Xóa một cặp key-value |

**So sánh với `sessionStorage`:**
- `localStorage` → Tồn tại vĩnh viễn cho đến khi bị xóa thủ công.
- `sessionStorage` → Bị xóa khi đóng tab trình duyệt.

---

## PHẦN 4: Prompt Template cho Puzzle tương tự

```text
Build a [form/dashboard] that persists user data using localStorage.

BEHAVIOR:
- On every field change, save ALL form data to localStorage (key: "your_key")
- On component mount (useEffect), read localStorage and pre-fill the form
- If data exists on mount, show a "Welcome back" banner
- Add a "Clear" button to remove saved data

TECHNICAL CONSTRAINTS:
- Use useEffect for all localStorage reads (SSR safety for Next.js)
- Use JSON.stringify/JSON.parse for read/write
- Add a visual "Auto-saved" indicator (3 states: idle, saving, saved)
- Use "use client" directive

UI RULES (Luxury Dark Mode):
- 100% Tailwind CSS, no separate CSS files
- Framer Motion AnimatePresence for all transitions
- Glassmorphism card, dark background
```

---

## TÓM TẮT: Pattern localStorage trong 3 bước

```text
1. WRITE  → onChange: JSON.stringify(data) → localStorage.setItem(KEY, ...)
2. READ   → useEffect([], mount): localStorage.getItem(KEY) → JSON.parse → setState
3. CLEAR  → onClick: localStorage.removeItem(KEY) → reset state về rỗng
```
