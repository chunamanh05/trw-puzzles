# 🧩 Breakdown: Puzzle #102 — Interactive 3D Digital Twin

## PHẦN 1: Tư duy & Phân tích yêu cầu

Puzzle này yêu cầu đưa một bản sao 3D của Trái Đất (Digital Twin) lên trình duyệt. Nghe thì có vẻ cực kỳ phức tạp, nhưng với sức mạnh của WebGL và hệ sinh thái thư viện hiện tại, ta có thể giải quyết bài toán một cách rất mượt mà.

### Tầng 1 — The Engine (WebGL & Three.js)
Để render đồ họa 3D hiệu năng cao trên trình duyệt mà không làm treo máy, ta buộc phải dùng **WebGL**. Thay vì viết WebGL "thuần" rất khó, ta dùng **Three.js**. Và để dựng một quả cầu Trái Đất nhanh chóng, ta dùng wrapper **`react-globe.gl`** (một thư viện chuyên dụng bọc Three.js lại cho React).

### Tầng 2 — Data & Assets (Load hiệu quả)
- **Geometry**: Là một khối cầu (Sphere).
- **Textures (Vật liệu)**: Thay vì bắt user tải một cục mô hình 3D nặng vài chục MB, thư viện chỉ cần load các file ảnh JPG/PNG:
  - `globeImageUrl`: Ảnh bản đồ Trái đất (Blue Marble).
  - `bumpImageUrl`: Ảnh bản đồ độ cao (để tạo hiệu ứng 3D lồi lõm cho núi non).
- **Markers**: Là các thẻ HTML thông thường được ghim vào các tọa độ (Lat/Lng) thực. Thư viện sẽ tính toán để dịch chuyển thẻ HTML đó theo chuyển động xoay của quả cầu.

### Tầng 3 — Tương tác (The "Fly-To" Effect)
Hiệu ứng "Wow" nhất của Digital Twin là khi user click vào một điểm, camera lập tức bay sát xuống bề mặt.
- **State**: Biến `activeCity` lưu giữ thành phố đang được chọn.
- **Action**: Gọi hàm `globeRef.current.pointOfView({ lat, lng, altitude })` để điều khiển góc nhìn camera.

---

## PHẦN 2: Thử thách kỹ thuật & Cách giải quyết

### Vấn đề cốt lõi: Next.js SSR Crash
**Nguyên nhân:** Khi Next.js build ứng dụng trên Server (SSR), nó không có đối tượng `window` hay `document` (những thứ chỉ tồn tại trong trình duyệt). `react-globe.gl` khi import sẽ ngay lập tức gọi đến `window`, khiến ứng dụng bị crash nát bét.

**Giải pháp (Magic Trick):**
Sử dụng hàm `dynamic` của `next/dynamic` với option `ssr: false`.
```tsx
const EarthGlobe = dynamic(() => import("./GlobeComponent"), {
  ssr: false, // Bắt buộc!
  loading: () => <LoadingScreen /> // Hiện màn hình loading trong lúc chờ tải thư viện
});
```
Điều này buộc Next.js phải bỏ qua file `GlobeComponent.tsx` khi render trên Server, và chỉ tải nó về khi user đã mở trang trên Client.

---

## PHẦN 3: Cấu trúc UI (The HUD Overlay)

Để tạo cảm giác giống một phần mềm quản lý không gian mạng (Cyber/Sci-fi), ta chia giao diện làm 2 lớp:
1. **Lớp Background (z-0)**: Chính là component `EarthGlobe` chiếm toàn màn hình (`absolute inset-0`).
2. **Lớp Overlay (z-10)**: 
   - Đặt thuộc tính `pointer-events-none` cho container chính để chuột có thể "xuyên" qua và xoay quả cầu bên dưới.
   - Với những nút bấm (như nút chọn thành phố), ta cấp lại quyền `pointer-events-auto` để user có thể click được.
   - Sử dụng hiệu ứng `backdrop-blur` (kính mờ) và viền sáng (glow) để tạo cảm giác giao diện nổi 3D.

---

## TÓM TẮT BÀI HỌC
1. **WebGL trong React**: Luôn luôn bọc các component 3D trong một wrapper được load động (`next/dynamic` với `ssr: false`).
2. **Performance**: Dùng ảnh texture có sẵn trên CDN thay vì nhúng trực tiếp ảnh nặng vào project.
3. **Layering (Lớp layer)**: Tách biệt hoàn toàn phần render 3D và phần UI điều khiển thành 2 lớp đè lên nhau (Z-index layering) để dễ quản lý state và sự kiện chuột.
