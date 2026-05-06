# 🧩 Breakdown: Puzzle #48 — Instant Search Engine (Tìm Kiếm Tức Thì)

## PHẦN 1: Tư duy khi nhận Puzzle

### Tầng 1 — Vấn đề của tìm kiếm thông thường
Cách tìm kiếm truyền thống: Người dùng gõ → gửi request lên server → server truy vấn database → trả kết quả về → hiển thị. Mỗi lần gõ tốn 100–500ms (hoặc hơn nếu mạng chậm). Kết quả: giao diện "giật" và cảm giác chậm.

### Tầng 2 — Giải pháp: Index hóa phía client
Thay vì hỏi server mỗi lần, ta:
1. **Tải toàn bộ dữ liệu** vào bộ nhớ RAM của trình duyệt một lần duy nhất khi trang load
2. **Xây dựng index** (chỉ mục tìm kiếm) bằng Fuse.js — cũng chỉ một lần
3. **Tìm kiếm trong RAM** khi người dùng gõ — không cần mạng, kết quả hiện ngay lập tức

### Tầng 3 — Fuzzy Search vs Exact Search
| | Tìm chính xác | Fuzzy Search (Fuse.js) |
|:---|:---:|:---:|
| Gõ "villa" | Tìm "villa" | Tìm "villa", "Villa Azure"... |
| Gõ "vlla" (lỗi typo) | ❌ Không tìm thấy | ✅ Vẫn khớp với "villa" |
| Tốc độ | O(n) | O(n) với index đã dựng sẵn |
| Cài đặt | `str.includes(query)` | Thuật toán Bitap |

## PHẦN 2: Cách thực hiện

### Xây dựng Fuse index (ngoài component — chỉ chạy 1 lần)
```ts
const fuse = new Fuse(articles, {
  keys: [
    { name: "title",       weight: 3 },   // khớp tiêu đề → điểm cao nhất
    { name: "description", weight: 2 },
    { name: "location",    weight: 1.5 },
    { name: "content",     weight: 1 },
  ],
  threshold: 0.35,    // 0 = chính xác tuyệt đối, 1 = khớp mọi thứ
  includeScore: true, // trả về % độ tin cậy của kết quả
  minMatchCharLength: 2,
});
```

> **Quan trọng:** Đặt `new Fuse(...)` ở **ngoài component** để index không bị tái tạo mỗi khi component re-render.

### Chạy tìm kiếm theo thời gian thực
```tsx
useEffect(() => {
  if (!query.trim()) { setResults([]); return; }
  const found = fuse.search(query); // tức thì — chạy trong RAM
  setResults(found);
}, [query]); // kích hoạt mỗi lần query thay đổi (mỗi lần gõ)
```

### Highlight từ khóa trong kết quả
Sau khi có kết quả, ta cần bôi sáng từ khóa. Không thể dùng `.replace()` đơn thuần vì React cần render `<mark>` như HTML thật:

```tsx
function highlight(text: string, query: string): React.ReactNode {
  // Thoát ký tự đặc biệt của RegExp trước
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi"); // "gi" = global + case-insensitive

  // Tách chuỗi tại vị trí khớp, bọc phần khớp trong <mark>
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="search-highlight">{part}</mark>
      : part
  );
}
```

### Phím tắt Ctrl+K
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault(); // ngăn trình duyệt mở lịch sử
      inputRef.current?.focus();
    }
    if (e.key === "Escape") {
      setQuery(""); // xóa query và blur input
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler); // dọn dẹp
}, []);
```

## PHẦN 3: Bài học rút ra

- **Không bao giờ truy vấn database mỗi lần gõ phím.** Tải dữ liệu trước, tìm kiếm phía client để đạt UX tức thì.
- **`threshold` của Fuse.js** kiểm soát độ "dễ tính" của tìm kiếm. `0.35` là điểm cân bằng tốt giữa độ chính xác và độ bao phủ.
- **Highlight từ khóa** cần dùng `RegExp.split()` chứ không phải `.replace()` — vì React cần nhận ReactNode, không phải HTML string.
- **Đặt trọng số (weight) cho từng field** giúp tinh chỉnh relevance: khớp ở tiêu đề nên được điểm cao hơn khớp ở nội dung.
- **`Ctrl+K`** là UX pattern phổ biến (VS Code, Linear, GitHub) — người dùng kỹ thuật quen với nó.

## 🏷️ Tags
`Fuse.js` · `Fuzzy Search` · `Giao Diện Thời Gian Thực` · `Index Phía Client` · `Highlight Từ Khóa`
