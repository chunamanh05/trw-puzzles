# 🔄 FluxFrame: Drag-and-Drop Page Builder (Puzzle #72)

## 📌 Tổng quan
Thử thách xây dựng một công cụ quản lý bố cục trang web, cho phép người dùng thay đổi thứ tự các khối nội dung (Sections) thông qua hành động kéo thả. Mọi thay đổi được cập nhật trực tiếp (Live Preview) và lưu trữ cục bộ.

## 🛠️ Công nghệ sử dụng
- **Framer Motion (`Reorder` API)**: Xử lý logic kéo thả mượt mà với các hiệu ứng chuyển động dựa trên spring-physics.
- **LocalStorage API**: Lưu trữ thứ tự các Section để dữ liệu không bị mất khi làm mới trang.
- **Lucide React**: Cung cấp hệ thống Icon cho các khối nội dung.
- **Tailwind CSS**: Thiết kế giao diện Glassmorphism hiện đại với tông màu Cyan & Indigo.

## 💡 Giải pháp kỹ thuật
1.  **Hydration Pattern**: Hệ thống sử dụng `useEffect` để kiểm tra `localStorage` sau khi Component được mount, tránh lỗi bất đồng bộ giữa Server và Client (Hydration Error) trong Next.js.
2.  **Live Binding**: Mảng `sections` đóng vai trò là "Single Source of Truth". Khi kéo thẻ ở bảng điều khiển bên trái, mảng này thay đổi và tự động kích hoạt quá trình render lại ở bảng Preview bên phải.
3.  **AnimatePresence**: Sử dụng để tạo hiệu ứng chuyển đổi mượt mà khi các khối nội dung thay đổi vị trí hoặc khi Reset lại bố cục.

## 🚀 Tính năng chính
- [x] **Draggable List**: Kéo thả để sắp xếp lại 4 Section (FAQ, Features, Hero, Testimonials).
- [x] **Live Preview**: Cột bên phải cập nhật vị trí ngay lập tức theo thao tác kéo thả.
- [x] **Persistence**: Lưu bố cục tự động vào máy tính người dùng.
- [x] **Hard Reset**: Nút khôi phục cấu trúc ban đầu chỉ với 1 cú click.

## 🏷️ Tags
`Drag-and-Drop` · `Page Builder` · `Framer Motion` · `LocalStorage`
