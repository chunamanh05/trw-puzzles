# 📝 FlowForm: Multi-step Progress Form (Puzzle #76)

## 📌 Tổng quan
Thử thách xây dựng một hệ thống Form đa bước chuyên nghiệp. Ứng dụng tập trung vào trải nghiệm người dùng (UX) bằng cách chia nhỏ quá trình nhập liệu, cung cấp chỉ báo tiến trình và đảm bảo dữ liệu không bị mất khi điều hướng.

## 🛠️ Công nghệ sử dụng
- **React Hooks (`useState`, `useEffect`)**: Quản lý trạng thái Form, theo dõi bước hiện tại và tương tác với LocalStorage.
- **Framer Motion**: Xử lý hiệu ứng chuyển cảnh trượt (Slide) giữa các bước và animation pháo hoa (Confetti) khi hoàn thành.
- **Lucide React**: Hệ thống Icon minh họa cho từng bước của Stepper.
- **Tailwind CSS**: Thiết kế giao diện Card hiện đại với phong cách tối giản (Minimalist).

## 💡 Giải pháp kỹ thuật
1.  **Unified State Object**: Toàn bộ dữ liệu của 3 bước được lưu trữ trong một đối tượng `formData` duy nhất. Điều này giúp việc truy xuất và hiển thị lại dữ liệu ở bước "Review" trở nên cực kỳ đơn giản.
2.  **Conditional Validation**: Mỗi bước có logic kiểm tra riêng. Hàm `isStepValid()` sẽ kiểm tra các trường bắt buộc của bước hiện tại trước khi cho phép người dùng tiến tới bước tiếp theo.
3.  **Local Persistence**: Sử dụng `localStorage` để đồng bộ hóa dữ liệu Form theo thời gian thực. Dữ liệu sẽ tự động bị xóa sau khi người dùng nhấn "Submit" thành công.
4.  **Interactive Stepper**: Thanh tiến trình không chỉ để xem mà còn phản ứng theo trạng thái hoàn thành của người dùng, mang lại phản hồi thị giác (visual feedback) rõ ràng.

## 🚀 Tính năng chính
- [x] **3-Step Wizard**: Identity -> Scope -> Review.
- [x] **Progress Indicator**: Thanh tiến trình động với hiệu ứng spring.
- [x] **Data Persistence**: Tự động lưu và khôi phục dữ liệu từ LocalStorage.
- [x] **Success Celebration**: Màn hình chúc mừng với hiệu ứng PartyPopper.

## 🏷️ Tags
`Form` · `UX` · `Validation` · `LocalStorage`
