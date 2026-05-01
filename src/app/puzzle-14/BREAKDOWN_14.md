# 🧩 Breakdown: Puzzle #14 — Google Trends Explorer

## PHẦN 1: Tư duy & Phân tích yêu cầu

Yêu cầu của Puzzle này là tạo một biểu đồ dạng Area Chart hiển thị dữ liệu "Interest Over Time" giống hệt Google Trends. Điểm khó nhất không nằm ở việc vẽ biểu đồ, mà là ở việc làm sao để **lấy được dữ liệu thật từ Google mà không bị chặn (CORS/Rate limit)**.

### Tầng 1 — The Data Layer (Bypass CORS bằng Next.js API Route)
Trình duyệt web mặc định sẽ chặn các request API (fetch) tới máy chủ khác nếu máy chủ đó không cho phép (CORS). Google Trends không có API công khai, nên ta không thể fetch trực tiếp từ Front-end.
- **Giải pháp**: Xây dựng một Backend Route bằng Next.js (`src/app/api/trends/route.ts`). Next.js sẽ đóng vai trò như một Proxy. Server của chúng ta gọi cho Google, lấy dữ liệu về, xử lý gọn gàng rồi mới đưa lại cho Front-end.
- Thư viện `google-trends-api` (npm) thực chất là một scraper ngầm rất an toàn, đóng giả làm một user bình thường để xin file JSON từ Google.

### Tầng 2 — The Fallback (Mock Data)
Mặc dù dùng Backend an toàn hơn, nhưng Google vẫn có thể giới hạn (Rate limit) nếu ta F5 trang liên tục. Để đảm bảo App không bao giờ bị sập, tôi viết một hàm `generateMockData()`. Hàm này sử dụng thuật toán Hash (mã hóa tên từ khóa) kết hợp với hàm Sin/Cos để vẽ ra một đường biểu đồ nhấp nhô vô cùng chân thực.

### Tầng 3 — The UI & Charting (Recharts)
Thư viện `recharts` là "ông vua" trong mảng vẽ biểu đồ React.
- **Area Chart**: Biểu đồ dạng mảng.
- **Gradient Fill**: Dùng thẻ `<defs><linearGradient>` trong SVG để tạo màu xanh nhạt dần xuống dưới, tạo cảm giác mềm mại như ảnh mẫu.

---

## PHẦN 2: Dark / Light Mode Toggle

Thông thường, ta dùng Tailwind `dark:` variant và quản lý bằng class ở thẻ `<html>`. Nhưng để Puzzle này hoạt động độc lập và không ảnh hưởng đến các layout khác, tôi tự quản lý Theme bằng State cục bộ:
```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('dark');
const isDark = theme === 'dark';

// Áp dụng class động:
const bgMain = isDark ? "bg-[#0b0e14]" : "bg-slate-50";
```

Với Framer Motion, nút Toggle có hiệu ứng `AnimatePresence`. Khi chuyển đổi giữa Mặt trời / Mặt trăng, icon sẽ xoay và mờ đi rất đã mắt.

---

## TÓM TẮT BÀI HỌC
1. **API Proxy:** Không bao giờ gọi API bên thứ 3 (đặc biệt là không chính thức) trực tiếp từ Client. Luôn tạo một Route trên Server (Next.js API Routes) để lấy data.
2. **Graceful Degradation:** Luôn có "phương án B" (Mock Data) khi API bị sập. Một UI/UX tốt là UI không bao giờ hiện màn hình trắng bóc hoặc báo lỗi khô khan.
3. **SVG Gradients:** Để biểu đồ nhìn "Pro", đừng tô màu đặc (solid). Hãy dùng Linear Gradient để tăng tính chiều sâu cho Data Visualization.
