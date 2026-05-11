# 🏢 BranchFlow: Multi-Location Switcher (Puzzle #88)

## 📌 Tổng quan
Một công cụ giúp khách hàng dễ dàng chuyển đổi thông tin liên hệ giữa các chi nhánh khác nhau của một doanh nghiệp. Ứng dụng tập trung vào tính tức thì (Instant updates) và khả năng ghi nhớ lựa chọn của người dùng (Persistence).

## 🛠️ Công nghệ sử dụng
- **State-Driven UI**: Toàn bộ thông tin địa chỉ, hotline và giờ mở cửa được điều khiển bởi một biến `selectedId`. Khi ID thay đổi, toàn bộ dữ liệu trên màn hình sẽ cập nhật đồng bộ.
- **LocalStorage Persistence**: Sử dụng bộ nhớ trình duyệt để lưu lại chi nhánh mà khách hàng đã chọn. Khi họ quay lại trang web hoặc tải lại trang (Refresh), hệ thống sẽ tự động hiển thị chi nhánh đó thay vì quay về mặc định.
- **SSR-Safe Implementation**: Xử lý việc truy cập `localStorage` bên trong `useEffect` để đảm bảo tính tương thích với cơ chế Server-side Rendering của Next.js.
- **Framer Motion Layout Transitions**: Hiệu ứng chuyển cảnh mượt mà khi thay đổi chi nhánh và thanh Highlight trượt dưới các Tabs.

## 💡 Giải pháp kỹ thuật
1.  **Centralized Data Object**: Mọi thông tin chi nhánh được quản lý tập trung trong một mảng `BRANCHES`, giúp việc bảo trì và thêm chi nhánh mới cực kỳ dễ dàng (chỉ cần thêm 1 object vào mảng).
2.  **Dynamic CTA System**: Các nút "Get Directions" và "Direct Line" tự động cập nhật URL và Số điện thoại theo chi nhánh được chọn, đảm bảo khách hàng luôn kết nối đúng điểm đến.
3.  **Visual Consistency**: Sử dụng tông màu Orange/Dark tạo cảm giác hiện đại và chuyên nghiệp của một hệ thống chuỗi cửa hàng lớn.

## 🚀 Tính năng chính
- [x] **Instant Switcher**: Chuyển đổi chi nhánh không độ trễ.
- [x] **Smart Persistence**: Ghi nhớ lựa chọn qua LocalStorage.
- [x] **Responsive Tabs**: Bộ chọn chi nhánh dạng tab hiện đại.
- [x] **Location-specific Actions**: Chỉ đường và gọi điện theo chi nhánh.

## 🏷️ Tags
`Franchise` · `StateManagement` · `UX` · `LocalStorage`
