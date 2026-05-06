# 🧩 Breakdown: Puzzle #46 — The Estate Horizon (Cuộn Ngang Dính)

## PHẦN 1: Tư duy khi nhận Puzzle

### Tầng 1 — Vấn đề cốt lõi
Người dùng chỉ **cuộn chuột xuống** (chiều dọc), nhưng nội dung phải **chuyển động ngang**. Đây là bài toán về **chuyển đổi trục chuyển động** — một trong những hiệu ứng đẹp nhất và khó nhất của web hiện đại.

### Tầng 2 — Tại sao không dùng `overflow-x: scroll`?
Cách scroll ngang thông thường yêu cầu người dùng cuộn ngang bằng trackpad hoặc thanh cuộn ngang. Puzzle yêu cầu **chỉ dùng scroll dọc** để điều khiển chuyển động ngang — đây là kỹ thuật hoàn toàn khác.

### Tầng 3 — Nguyên lý "Sticky + Transform"
```
Container cao (500vh) = tạo ra "hành trình cuộn"
    └── Phần tử sticky (100vh) = khóa trên màn hình
            └── Track ngang (600vw rộng) = di chuyển ngang theo scroll
```

## PHẦN 2: Cách thực hiện

### Bước 1: Tạo không gian cuộn với CSS Sticky
```css
/* Container ngoài — tạo "hành trình" dài */
.outer-container {
  height: 500vh;  /* Càng cao → cuộn càng lâu → gallery chạy chậm hơn */
}

/* Phần tử con — dính vào đầu màn hình */
.sticky-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;  /* Ẩn phần track bị tràn ra ngoài */
}

/* Track ngang chứa tất cả thẻ */
.horizontal-track {
  display: flex;
  width: 600vw;  /* Đủ rộng để chứa tất cả card */
}
```

### Bước 2: Đo tiến trình cuộn với `useScroll`
```tsx
const containerRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: containerRef,
  // "start start" = bắt đầu khi đỉnh container chạm đỉnh viewport
  // "end end" = kết thúc khi đáy container chạm đáy viewport
  offset: ["start start", "end end"],
});
```

`scrollYProgress` là một **MotionValue** từ 0 (bắt đầu) đến 1 (kết thúc) — tự động cập nhật khi cuộn.

### Bước 3: Biến đổi tiến trình → chuyển động ngang
```tsx
// Map 0→1 thành "0px" → "-4500px" (khoảng cách cần dịch chuyển)
const x = useTransform(scrollYProgress, [0, 1], ["0px", "-4500px"]);

// Áp dụng vào track
<motion.div style={{ x }} className="horizontal-track">
  {cards.map(card => <PropertyCard key={card.id} {...card} />)}
</motion.div>
```

### Tính toán khoảng cách dịch chuyển
```
Tổng chiều rộng track = số lượng card × chiều rộng mỗi card + gap
Khoảng dịch chuyển   = Tổng chiều rộng track − 1 viewport (100vw)
```
Nếu tính thiếu → gallery không chạy đến card cuối. Nếu tính thừa → gallery dừng ở khoảng trống.

## PHẦN 3: Bài học rút ra

- **`position: sticky`** là nguyên liệu bí mật — nó "khóa" phần tử trên màn hình trong khi container cha vẫn cuộn.
- **`useScroll` với `target` ref** cho phép theo dõi chính xác vị trí của một phần tử cụ thể, không phải toàn trang.
- **`useTransform`** của Framer Motion ánh xạ một giá trị sang giá trị khác — không cần event listener thủ công.
- Điều chỉnh `height` của container ngoài (500vh, 600vh…) kiểm soát "tốc độ" cảm nhận của gallery.
- Kỹ thuật này không cần JavaScript thuần túy — Framer Motion xử lý mượt bằng GPU transforms.

## 🏷️ Tags
`Cuộn Ngang` · `Framer Motion` · `Sticky UI` · `Bất Động Sản` · `Hiệu Ứng Cuộn`
