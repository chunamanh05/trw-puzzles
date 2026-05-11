# 📜 ScrollStory: Interactive Narrative Reveal (Puzzle #91)

## 📌 Tổng quan
Một hệ thống trình diễn nội dung dựa trên thao tác cuộn chuột (Scroll-based), giúp biến trang Landing Page thành một câu chuyện kể có chiều sâu. Ứng dụng tự động nhận diện vị trí người dùng đang xem để kích hoạt các hiệu ứng "tiết lộ" nội dung và cập nhật nút hành động (CTA) theo đúng ngữ cảnh của từng "chương".

## 🛠️ Công nghệ sử dụng
- **Intersection Observer API**: Công nghệ lõi để theo dõi vị trí của các Section trên màn hình. Hệ thống được cấu hình với `threshold: 0.5`, nghĩa là khi 50% Section hiện diện, nó sẽ được coi là "Active".
- **Framer Motion `whileInView`**: Sử dụng để kích hoạt các hiệu ứng animation ngay khi phần tử bước vào tầm mắt (Viewport), tạo cảm giác nội dung đang "sống" dậy theo bước chân người dùng.
- **Contextual Floating CTA**: Nút hành động cố định ở chân trang nhưng nội dung và màu sắc thay đổi linh hoạt thông qua `AnimatePresence`.
- **CSS Snap Scroll**: Kết hợp cơ chế `snap-y snap-mandatory` để mỗi lần cuộn chuột, trình duyệt sẽ tự động dừng lại đúng ở đầu mỗi Section, tạo sự tập trung tối đa.

## 💡 Giải pháp kỹ thuật
1.  **Ref Management**: Sử dụng `useRef` với cấu trúc `Record<string, HTMLElement>` để quản lý danh sách các Section động mà không cần tạo quá nhiều biến Ref đơn lẻ.
2.  **Parallax & Masking**: Hình nền của mỗi Section có hiệu ứng Scale nhẹ khi bước vào tầm mắt, kết hợp với lớp phủ (Overlay) tối màu để tôn lên nội dung văn bản.
3.  **Dynamic Side Nav**: Thanh điều hướng bên phải cung cấp cái nhìn tổng quan về lộ trình và cho phép người dùng nhảy nhanh đến bất kỳ "chương" nào của câu chuyện.

## 🚀 Tính năng chính
- [x] **Auto-detection**: Nhận diện Section đang xem cực kỳ chính xác.
- [x] **Progressive Reveal**: Nội dung hiện ra mượt mà theo thao tác cuộn.
- [x] **Smart CTA**: Nút hành động thay đổi nhãn và màu sắc theo Section.
- [x] **Smooth Snap**: Tự động căn chỉnh vị trí Section.

## 🏷️ Tags
`Storytelling` · `ScrollReveal` · `FramerMotion` · `UX`
