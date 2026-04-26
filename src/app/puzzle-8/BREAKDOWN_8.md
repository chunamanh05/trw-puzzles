# 🧩 Breakdown: Puzzle #8 — Visual Product Search (AI + Lens)

## PHẦN 1: Tư duy & Kiến trúc hệ thống (System Design)

Puzzle này yêu cầu kết hợp 2 hệ thống AI khác nhau:
1. **Google Lens (Visual Search):** Lấy ảnh $\rightarrow$ Tìm ra dữ liệu thô trên mạng.
2. **LLM (Gemini/GPT):** Lấy dữ liệu thô $\rightarrow$ Làm sạch (Clean/Normalize) thành thông tin chuẩn.

**Tại sao phải có bước 2?**
Google Lens hoặc SerpAPI thường trả về tên sản phẩm rất lộn xộn, chứa đầy các từ khóa SEO để bán hàng (ví dụ: *"Sony WH-1000XM5 Wireless Noise Canceling Headphones, Black - New in Box (Authentic) 2023 Model"*). Việc dùng AI (Gemini) để lọc lại thành *"Sony WH-1000XM5"* là điểm mấu chốt tạo nên một ứng dụng "Pro".

---

## PHẦN 2: Quản lý State — Mô hình "Tiến trình" (State Machine)

Bài này phức tạp ở chỗ có rất nhiều bước đang chờ đợi (async). Nếu quản lý bằng nhiều biến boolean rác (ví dụ: `isUploading`, `isScanning`, `isCleaning`) code sẽ cực kỳ dễ lỗi.

Thay vào đó, tôi dùng **Một biến State duy nhất** đại diện cho toàn bộ luồng:

```tsx
type SearchState = "idle" | "uploading" | "scanning_lens" | "cleaning_ai" | "success";
const [searchState, setSearchState] = useState<SearchState>("idle");
```

**Lợi ích của mô hình này:**
- Tại bất kỳ thời điểm nào, UI chỉ có thể ở **duy nhất 1 trạng thái**. Không bao giờ có chuyện vừa "uploading" vừa "success".
- Việc render UI (Tầng 3) trở nên cực kỳ dễ viết bằng câu lệnh `if` hoặc `&&`.

---

## PHẦN 3: Cấu trúc Code — Đọc từng block

### Block 1: Giả lập API Flow (Mocking)

Vì tập trung vào UI, chúng ta viết một hàm giả lập toàn bộ thời gian chờ (delay) của API thật:

```tsx
const startSearchProcess = async () => {
  setSearchState("uploading");
  await new Promise((res) => setTimeout(res, 800)); // Đợi 0.8s

  setSearchState("scanning_lens");
  await new Promise((res) => setTimeout(res, 1500)); // Đợi 1.5s

  setSearchState("cleaning_ai");
  await new Promise((res) => setTimeout(res, 1200)); // Đợi 1.2s

  setResult(MOCK_RESULT);
  setSearchState("success");
};
```
*Ghi chú: Nếu ráp API thật vào, bạn chỉ việc thay cái `setTimeout` bằng lệnh `fetch()` tới backend.*

### Block 2: Xử lý Kéo Thả (Drag & Drop)

```tsx
const handleDragOver = (e) => {
  e.preventDefault(); // Rất quan trọng! Nếu không trình duyệt sẽ mở ảnh sang tab mới
  setIsDragging(true);
};

const handleDrop = (e) => {
  e.preventDefault();
  setIsDragging(false);
  if (e.dataTransfer.files[0]) {
    handleImageUpload(e.dataTransfer.files[0]);
  }
};
```
Trình duyệt mặc định sẽ "tải" ảnh nếu bạn ném nó vào web. Lệnh `e.preventDefault()` ngăn chặn điều đó, cho phép ta tự xử lý file lấy từ `e.dataTransfer.files`.

### Block 3: Preview ảnh bằng `URL.createObjectURL`

```tsx
const url = URL.createObjectURL(file);
setImagePreview(url);
```
Thay vì phải upload ảnh lên server rồi mới lấy link về hiển thị (tốn thời gian), lệnh này tạo ra một đường link **ảo** (`blob:http://...`) ngay trong bộ nhớ trình duyệt, giúp hiện ảnh lập tức.

---

## PHẦN 4: UI/UX Tricks — Cách làm app trông "Xịn"

1. **Scanner Animation (Hiệu ứng quét ảnh):**
   ```tsx
   <motion.div animate={{ top: ["0%", "100%", "0%"] }} />
   ```
   Dùng Framer Motion chạy một vạch sáng (box-shadow cyan) chạy từ trên xuống dưới liên tục, mô phỏng tia laser của máy quét.

2. **Step Tracker (Theo dõi tiến độ):**
   Thay vì chỉ xoay cái spinner (vòng tròn quay) nhàm chán, tôi tách nhỏ luồng xử lý và hiện cho user xem:
   - [x] Đã tải ảnh
   - [x] Đang quét Lens... *(kèm hiện dữ liệu thô mờ mờ)*
   - [x] Đang dùng AI dọn dẹp...

   **UX Psychology:** Người dùng sẵn sàng chờ lâu hơn nếu họ BIẾT hệ thống đang làm gì.

---

## TÓM TẮT: Cách Prompt để AI tạo tính năng này

```text
Build a Visual Product Search UI using Next.js, Tailwind, and Framer Motion.

FLOW:
1. User uploads an image via Drag & Drop or Click.
2. Show image preview with a laser-scanning animation overlay.
3. Simulate an API process with 4 states: idle -> uploading -> scanning_lens -> cleaning_ai -> success.
4. Show a Step Tracker component updating in real-time as state changes.
5. On success, show a sleek Product Card with a Buy button.

STATE MANAGEMENT:
- Do NOT use multiple booleans. Use a single union type: 
  type State = "idle" | "uploading" | ...

UX RULES (Luxury Dark):
- Colors: Dark background, cyan/purple glowing accents.
- Use 'backdrop-blur' for glassmorphism.
- Use framer-motion AnimatePresence for smooth state switching.
```
