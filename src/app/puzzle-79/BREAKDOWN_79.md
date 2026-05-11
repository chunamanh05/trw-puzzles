# 🚀 ConversionBoost: Sticky CTA & Trust Bar (Puzzle #79)

## 📌 Tổng quan
Thử thách xây dựng một thanh kêu gọi hành động (CTA) bám dính (sticky) kết hợp với các yếu tố gây dựng lòng tin (Trust elements). Ứng dụng tập trung vào việc tối ưu hóa tỷ lệ chuyển đổi bằng cách luôn giữ nút hành động trong tầm mắt người dùng và thay đổi nội dung nút dựa trên ngữ cảnh cuộn trang.

## 🛠️ Công nghệ sử dụng
- **Intersection Observer API**: Kỹ thuật chính để theo dõi các phần tử đang hiển thị trên màn hình (Viewport) mà không làm ảnh hưởng đến hiệu suất như sự kiện `scroll` truyền thống.
- **React Hooks (`useState`, `useEffect`)**: Quản lý trạng thái kiểu dáng (Pill/Full) và Section đang hoạt động.
- **Framer Motion**: Xử lý hiệu ứng **Fade** mượt mà khi chuyển đổi văn bản trên nút bấm và hiệu ứng trượt của thanh Sticky.
- **Tailwind CSS**: Tạo hiệu ứng Backdrop Blur (Glassmorphism) và thiết kế đáp ứng (Responsive) hoàn hảo trên cả Mobile và Desktop.

## 💡 Giải pháp kỹ thuật
1.  **Flex-Centered Architecture**: Sử dụng Container bao ngoài với `flex justify-center` để đảm bảo thanh Bar luôn nằm chính giữa tuyệt đối, loại bỏ xung đột giữa Tailwind và Framer Motion.
2.  **Context-Aware CTA**: Sử dụng `IntersectionObserver` để theo dõi các Section. State `activeSection` sẽ kích hoạt hiệu ứng Fade mượt mà khi đổi nội dung nút bấm dựa trên vị trí cuộn.
3.  **Optimized Padding & Layout**: Tăng cường Padding nội khu (`p-5`) và sử dụng `gap-8` để nút CTA nằm gọn gàng, không bị chạm lề hay lòi ra ngoài dải bar.
4.  **Spring Motion Dynamics**: Sử dụng hiệu ứng `spring` với độ cứng (stiffness) 120 để thanh Bar xuất hiện một cách sống động và chắc chắn khi người dùng cuộn trang.

## 🚀 Tính năng chính
- [x] **Perfectly Centered Bar**: Căn giữa tuyệt đối trên mọi thiết bị.
- [x] **Safe-Zone CTA**: Nút bấm được bảo vệ trong vùng đệm an toàn, thẩm mỹ.
- [x] **3 Trust Elements**: Rating (với icon mạ vàng), Guarantee, và Client count.
- [x] **Interactive Shine**: Hiệu ứng ánh sáng lướt trên nút bấm khi Hover.

## 🏷️ Tags
`Marketing` · `Conversion` · `IntersectionObserver` · `UX`
