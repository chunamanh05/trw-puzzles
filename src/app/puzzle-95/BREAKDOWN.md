# 🧩 Breakdown: Puzzle #95 — API Key Dashboard

## PHẦN 1: Tư duy khi nhận một Puzzle

Khi thấy đề bài, tôi không nhảy vào code ngay. Tôi phân tích đề theo **3 tầng**:

### Tầng 1 — State (Dữ liệu cần theo dõi)
> "Chương trình này cần nhớ những gì?"

| State | Kiểu | Vai trò |
|---|---|---|
| `apiKey` | `string` | Chứa giá trị key thật |
| `isVisible` | `boolean` | Đang hiện hay đang ẩn key? |
| `isCopied` | `boolean` | Đã copy xong chưa? |
| `isRegenerating` | `boolean` | Đang trong quá trình tạo key mới? |

**Nguyên tắc:** Bất kỳ thứ gì mà **thay đổi trên màn hình** theo thời gian đều phải là `useState`.

---

### Tầng 2 — Actions (Hành động người dùng kích hoạt)
> "Người dùng có thể làm gì?"

1. **Reveal / Hide Key** → Toggle `isVisible`
2. **Copy Key** → Ghi vào clipboard, bật `isCopied`, tắt sau 2 giây
3. **Regenerate** → Đặt `isRegenerating = true`, chờ giả lập, tạo key mới

### Tầng 3 — UI (Màn hình phản chiếu State)
> "Màn hình thay đổi thế nào khi State thay đổi?"

- Khi `isVisible = false` → Hiện `maskedKey` (chuỗi dấu chấm)
- Khi `isCopied = true` → Nút "Copy" đổi thành "Copied ✓" trong 2 giây
- Khi `isRegenerating = true` → Nút "Regenerate" hiện spinner và lock cả 2 nút lại

---

## PHẦN 2: Cấu trúc Code — Đọc từng block

### Block 1: Khai báo State

```tsx
const [apiKey, setApiKey] = useState("");
const [isVisible, setIsVisible] = useState(false);
const [isCopied, setIsCopied] = useState(false);
const [isRegenerating, setIsRegenerating] = useState(false);
```

**Tư duy:** Tôi không bao giờ tạo thêm state "thừa". Ví dụ: `maskedKey` **không** cần là state riêng, vì nó chỉ là một phép tính đơn giản từ `apiKey` → tôi tính thẳng ra bằng `const`:

```tsx
const maskedKey = apiKey ? `${apiKey.slice(0, 7)}${"•".repeat(24)}` : "";
```

> **Quy tắc vàng:** Nếu một giá trị có thể **tính ra được từ State khác**, đừng biến nó thành State. Tính thẳng trên dòng `const`.

---

### Block 2: Tạo Key ngẫu nhiên

```tsx
const generateNewKey = () => {
  const randomPart = Array.from({ length: 32 }, () =>
    Math.random().toString(36)[2]
  ).join("");

  const chunks = randomPart.match(/.{1,8}/g) || [];
  return `${GENERATED_PREFIX}${chunks.join("-")}`;
};
```

**Phân tích từng dòng:**

1. `Array.from({ length: 32 }, () => Math.random().toString(36)[2])` 
   - Tạo một mảng 32 ký tự ngẫu nhiên.
   - `Math.random()` → tạo số ngẫu nhiên như `0.3847...`
   - `.toString(36)` → chuyển sang hệ cơ số 36 (dùng ký tự 0-9, a-z) → `"dcjf..."`
   - `[2]` → lấy ký tự thứ 3 trong chuỗi đó (bỏ qua `"0."` ở đầu)

2. `.match(/.{1,8}/g)` → Dùng Regex để cắt chuỗi 32 ký tự thành từng đoạn 8 ký tự.

3. `.join("-")` → Nối các đoạn lại bằng dấu `-` → Format: `kv_xxxxxxxx-xxxxxxxx-...`

---

### Block 3: `useEffect` để khởi tạo

```tsx
useEffect(() => {
  setApiKey(generateNewKey());
}, []);
```

**Tại sao cần `useEffect`?**

- React render component *trước*, sau đó mới chạy `useEffect`.
- `[]` rỗng có nghĩa là: **"Chỉ chạy đúng 1 lần khi component được tạo ra lần đầu."**
- Nếu không có `useEffect`, mỗi lần re-render (ví dụ bấm Copy) key sẽ bị tạo lại → Sai!

---

### Block 4: Hành động Regenerate (Quan trọng nhất)

```tsx
const handleRegenerate = async () => {
  setIsRegenerating(true);
  await new Promise((resolve) => setTimeout(resolve, 800));
  setApiKey(generateNewKey());
  setIsRegenerating(false);
  setIsVisible(true); // Tự động reveal key mới
};
```

**Tư duy UX ẩn sau đoạn code này:**

1. `setIsRegenerating(true)` → Ngay lập tức lock UI, tránh user bấm 2 lần.
2. `await new Promise(...)` → Giả lập 800ms "server đang xử lý". Nếu key xuất hiện tức thì, người dùng sẽ không cảm nhận được sự "an toàn". Delay ngắn = Cảm giác cao cấp.
3. `setIsVisible(true)` → Sau khi tạo xong, tự động hiện key mới để user biết nó đã thay đổi. Đây là **UX design decision** — không phải yêu cầu kỹ thuật.

---

### Block 5: Hành động Copy

```tsx
const handleCopy = () => {
  navigator.clipboard.writeText(apiKey);
  setIsCopied(true);
  setTimeout(() => setIsCopied(false), 2000);
};
```

- `navigator.clipboard.writeText()` → API của trình duyệt để ghi vào clipboard.
- `setTimeout(() => setIsCopied(false), 2000)` → Sau 2 giây, reset nút về trạng thái ban đầu.

---

## PHẦN 3: Cách viết UI — "State → UI" Mapping

Phần UI của tôi được xây dựng theo nguyên tắc: **Mỗi state được "map" trực tiếp ra một kết quả hiển thị cụ thể.**

### Ví dụ: Nút Copy

```tsx
{isCopied ? (
  <>
    <Check size={18} />
    Copied
  </>
) : (
  <>
    <Copy size={18} />
    Copy Key
  </>
)}
```

Đọc theo ngôn ngữ tự nhiên: *"Nếu đã copy rồi, hiện icon Check + chữ Copied. Nếu chưa, hiện icon Copy + chữ Copy Key."*

### Ví dụ: Ẩn/Hiện Key bằng Framer Motion

```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={isVisible ? "visible" : "masked"}
    initial={{ opacity: 0, filter: "blur(4px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, filter: "blur(4px)" }}
  >
    {isVisible ? apiKey : maskedKey}
  </motion.span>
</AnimatePresence>
```

- `key={isVisible ? "visible" : "masked"}` → Khi `key` thay đổi, Framer Motion biết phải animate ra/vào.
- Hiệu ứng `blur` tạo cảm giác "bức màn bí mật" khi reveal key — đây là lý do puzzle này trông premium hơn hẳn dù chỉ là 1 trang đơn.

---

## PHẦN 4: Cách Prompt để AI tạo ra kết quả tương tự

Dưới đây là cấu trúc prompt bạn có thể dùng:

```text
Build [TÊN TÍNH NĂNG] using Next.js, Tailwind CSS, and Framer Motion.

REQUIREMENTS:
- [Liệt kê từng tính năng cụ thể từ đề bài]

STATE MANAGEMENT:
- Use useState for: [liệt kê các state cần theo dõi]
- No external libraries for state (no Redux/Zustand)

UI RULES (Luxury Dark Mode):
- Dark background (#050505), accent color: #00f5d4 (cyan)
- Glassmorphism cards (backdrop-blur, subtle borders)
- Framer Motion for all state transitions (blur + opacity)
- 100% Tailwind CSS utility classes — no separate CSS files

CODE ARCHITECTURE (Portable Single-File):
- All logic AND UI in ONE file: page.tsx
- No imports from outside this folder
- File must be copy-pasteable to any Next.js project
```

> **Mẹo:** Phần "STATE MANAGEMENT" và "CODE ARCHITECTURE" là phần bạn phải **tự thêm vào** dựa trên phân tích của bạn ở Phần 1. AI không tự biết bạn muốn kiến trúc như thế nào, bạn phải chỉ đạo rõ.

---

## TÓM TẮT: Quy trình 4 bước để giải 1 Puzzle

```text
1. PHÂN TÍCH  → Xác định: State cần gì? Actions là gì? UI thay đổi thế nào?
2. CODE LOGIC → Viết hàm xử lý (generate, copy, toggle) — không nghĩ đến giao diện
3. CODE UI    → Map từng State ra giao diện với Tailwind + Framer Motion
4. POLISH     → Thêm delay, animation, disabled states để cảm giác "luxury"
```
