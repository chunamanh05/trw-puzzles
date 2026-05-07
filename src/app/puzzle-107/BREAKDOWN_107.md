# 🧩 Breakdown: Puzzle #107 — Smart File Validator

## PHẦN 1: Tư duy khi nhận Puzzle

Bài toán yêu cầu xây dựng một hệ thống tải lên file có khả năng kiểm tra (validate) dữ liệu ngay lập tức tại trình duyệt. Đây là tính năng cực kỳ quan trọng để cải thiện trải nghiệm người dùng (UX) và giảm tải cho server.

### Tầng 1 — Quản lý trạng thái (State Management)
Chúng ta không chỉ lưu một danh sách file thuần túy. Mỗi file cần được đi kèm với các metadata:
- **ID duy nhất**: Để xóa file chính xác.
- **isValid**: Trạng thái hợp lệ (đúng định dạng và kích thước).
- **error**: Thông báo lỗi cụ thể để hiển thị cho người dùng.
- **sizeFormatted**: Chuỗi dung lượng đã được làm tròn (KB, MB) để hiển thị đẹp.

### Tầng 2 — Cơ chế Validation
Việc kiểm tra phải xảy ra ngay khi file được chọn (qua `input` hoặc `drop`):
1. **Kiểm tra loại file (MIME type)**: So sánh với mảng `ALLOWED_TYPES` (PDF, PNG, JPG).
2. **Kiểm tra dung lượng**: So sánh với `MAX_SIZE_BYTES` (5MB).

### Tầng 3 — Giao diện phản hồi (Feedback Loop)
Chia danh sách file thành 2 nhóm: **Accepted** (Chấp nhận) và **Rejected** (Từ chối). Việc tách biệt này giúp người dùng biết chính xác file nào sẽ được gửi đi và file nào cần thay thế.

## PHẦN 2: Cách thực hiện

### 1. Xử lý Drag & Drop
Sử dụng các sự kiện `onDragOver`, `onDragLeave` và `onDrop` để tạo hiệu ứng hover khi người dùng kéo file vào vùng tải lên.

```tsx
const onDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
  handleFiles(e.dataTransfer.files);
};
```

### 2. Hàm định dạng dung lượng file
Một hàm tiện ích để chuyển đổi số bytes khô khan thành định dạng dễ đọc:

```tsx
const formatFileSize = (bytes: number) => {
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
```

### 3. Hiệu ứng với Framer Motion
Sử dụng `AnimatePresence` và `layout` prop để các phần tử di chuyển mượt mà khi có file bị xóa hoặc thêm mới.

```tsx
<AnimatePresence mode="popLayout">
  {files.map((f) => (
    <motion.div key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* File Row Content */}
    </motion.div>
  ))}
</AnimatePresence>
```

## PHẦN 3: Bài học rút ra

- **Client-side Validation là bắt buộc**: Đừng đợi đến khi gửi lên server mới báo lỗi dung lượng file. Nó làm lãng phí băng thông và thời gian của người dùng.
- **Tính năng "Xóa" (Remove)**: Luôn cho phép người dùng kiểm soát danh sách file trước khi ấn nút Submit cuối cùng.
- **Visual Feedback**: Sử dụng màu sắc (xanh cho Accepted, đỏ cho Rejected) và icon (Check, Alert) để truyền tải thông tin nhanh hơn văn bản.
- **Trải nghiệm kéo thả**: Làm cho vùng Dropzone cảm giác "sống động" bằng cách thay đổi border hoặc background khi đang kéo file qua.

## 🏷️ Tags
`File API` · `Validation` · `UX/UI` · `Framer Motion` · `React State`
