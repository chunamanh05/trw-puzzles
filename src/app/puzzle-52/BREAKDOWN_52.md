# 🧠 Puzzle #52: Nexus AI Chat Agent

## 🌟 Tổng quan
Phát triển một Chat Agent thông minh với giao diện **Terminal-Style** cao cấp, tích hợp OpenAI để tự động hóa việc chăm sóc khách hàng và thu thập thông tin (Lead Capture).

## 🛠️ Công nghệ sử dụng
- **Next.js API Routes**: Giao tiếp bảo mật với OpenAI phía server.
- **OpenAI (gpt-4o-mini)**: Xử lý ngôn ngữ tự nhiên và logic hội thoại.
- **Framer Motion**: Tạo hiệu ứng xuất hiện tin nhắn và trạng thái "Typing...".
- **Tailwind CSS**: Thiết kế giao diện Terminal đen bóng với các thành phần của hệ điều hành.

## 💡 Giải pháp kỹ thuật

### 1. Logic "Lead Capture" (Thu thập thông tin)
Thay vì dùng form cứng nhắc, chúng ta sử dụng **System Prompt** để hướng dẫn AI:
- Luôn kiểm tra xem đã biết tên người dùng chưa.
- Sau khi biết tên, tìm cơ hội tự nhiên để hỏi email.
- Trả lời các câu hỏi chuyên môn nhưng luôn kết nối lại với mục tiêu thu thập thông tin liên hệ.

### 2. Giao diện Terminal chuyên nghiệp
- **Visuals**: Sử dụng font chữ Monospace, dải màu Cyan trên nền đen tuyệt đối (`#050505`).
- **Interaction**: Hỗ trợ phím Enter để gửi, tự động cuộn xuống khi có tin nhắn mới, và trạng thái phản hồi của AI.
- **Window Controls**: Mô phỏng cửa sổ macOS với 3 nút chức năng đặc trưng.

### 3. Bảo mật API
- API Key được lưu trữ trong `.env.local` và chỉ được truy cập từ phía Server, đảm bảo khách hàng không bao giờ thấy được khóa bí mật của bạn.

## 🚀 Bài học rút ra
- **AI-driven UX**: Chatbot không chỉ là công cụ trả lời, nó là một nhân viên bán hàng chủ động.
- **Terminal Aesthetics**: Giao diện tối giản nhưng tập trung vào văn bản giúp tăng sự tin tưởng trong các sản phẩm kỹ thuật hoặc SaaS.
- **Context Management**: Gửi toàn bộ lịch sử hội thoại lên OpenAI giúp AI ghi nhớ được tên người dùng xuyên suốt quá trình trò chuyện.

## 🏷️ Tags
`OpenAI` · `AI Agent` · `Terminal UI` · `Next.js` · `Framer Motion`
