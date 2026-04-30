# 🧩 Breakdown: Puzzle #101 — Smart Notification Preferences

## PHẦN 1: Tư duy & Phân tích yêu cầu

Yêu cầu của Puzzle này là xây dựng một trang quản lý thông báo (Notification Settings) thường thấy trong các ứng dụng SaaS.

### Tầng 1 — State & Context (Cấu trúc dữ liệu)
Dữ liệu thông báo thường có tính chất lồng nhau (Nested): Mỗi **loại thông báo** (Type) sẽ có nhiều **kênh nhận** (Channels).

- **Cấu trúc State lý tưởng**:
  ```ts
  type Preferences = {
    [typeId: string]: {
      email: boolean;
      push: boolean;
      inApp: boolean;
    }
  }
  ```
- **Master Switch**: Một biến boolean độc lập (`isMuted`) để kiểm soát trạng thái hoạt động của toàn bộ bảng điều khiển.

### Tầng 2 — Actions (Xử lý tương tác)
1. **Toggle Channel**: Khi click vào một icon (Email/Push/In-App), ta chỉ cập nhật đúng thuộc tính đó cho đúng ID đó.
2. **Master Mute**: Khi bật "Mute All", ta vô hiệu hóa (disabled) toàn bộ các nút bên dưới. Điều này giúp giữ nguyên cấu hình cũ của user nếu họ bật lại.
3. **Auto-save**: Sử dụng `useEffect` lắng nghe sự thay đổi của `prefs` để tự động đẩy vào `localStorage`.

### Tầng 3 — UI (Trải nghiệm người dùng)
- **Vibe**: Modern SaaS (Indigo & Slate) với Glassmorphism.
- **Feedback**: Khi user thao tác, cần có một chỉ báo (indicator) hiển thị "Saving..." rồi "Saved" để user yên tâm rằng dữ liệu đã được lưu mà không cần nút bấm thủ công.

---

## PHẦN 2: Cấu trúc Code — Đọc từng block

### Block 1: Quản lý Hydration (Next.js)

```tsx
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("...");
  // ... set state từ localStorage
  setIsLoaded(true);
}, []);

if (!isLoaded) return null;
```
- **Tại sao cần?**: `localStorage` chỉ tồn tại trên trình duyệt (client). Next.js render lần đầu trên server. Nếu ta render ngay dữ liệu từ `localStorage`, HTML của server và client sẽ khác nhau gây lỗi Hydration. Việc chờ `isLoaded` đảm bảo trang chỉ hiện sau khi đã đọc xong dữ liệu từ máy user.

### Block 2: Cập nhật Nested State

```tsx
setPrefs(prev => ({
  ...prev,
  [typeId]: {
    ...prev[typeId],
    [channel]: !prev[typeId][channel]
  }
}));
```
- Đây là cách chuẩn để update object lồng nhau trong React: Ta phải "clone" (dùng `...`) tất cả các level để không làm mất dữ liệu của các key khác.

### Block 3: Hiệu ứng Auto-save Feedback

```tsx
useEffect(() => {
  setSaveStatus("saving");
  // ... lưu vào localStorage
  const timer = setTimeout(() => setSaveStatus("saved"), 600);
  const hideTimer = setTimeout(() => setSaveStatus("idle"), 2500);
  return () => { ...clearTimeout... };
}, [prefs, isMuted]);
```
- Sử dụng `setTimeout` lồng nhau để tạo ra luồng trạng thái: `Idle` → `Saving` → `Saved` → `Idle`. Điều này giúp UI trở nên "sống động" và có tính tương tác cao.

---

## PHẦN 3: Những điểm nổi bật về UX

1. **Master Switch (Option A)**: Khi tắt, toàn bộ UI bên dưới được áp dụng `grayscale` và `pointer-events-none`. User vẫn nhìn thấy setting cũ nhưng hiểu rằng nó đang không hoạt động.
2. **Channel Pills**: Thay vì dùng checkbox nhàm chán, tôi sử dụng các "Pill buttons" với icon. Khi active, chúng có hiệu ứng đổ bóng (glow) và một dấu chấm nhỏ ở góc (`active-dot`) dùng `layoutId` của Framer Motion để animate cực mượt.
3. **Layout Animation**: Sử dụng thuộc tính `layout` của `motion.div` để khi các thành phần thay đổi, chúng sẽ co giãn mượt mà thay vì giật cục.

---

## PHẦN 4: Prompt Template cho Puzzle tương tự

```text
Build a smart preferences panel with nested state management.

DATA:
- 5+ categories, each with 3 sub-toggle channels.
- Persist everything in localStorage.

FEATURES:
- Master switch that disables sub-options but preserves their values.
- Auto-save feedback loop (Show "Saving..." and "Saved" status).
- Handle Next.js Hydration mismatch for localStorage.

STYLING:
- Modern SaaS aesthetic (Deep Indigo / Violet).
- Custom toggle buttons with icons instead of native checkboxes.
- Glassmorphism containers with subtle borders.
```
