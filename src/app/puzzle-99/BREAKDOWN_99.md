# 🧩 Breakdown: Puzzle #99 — Dynamic Lead Scoring & Qualification

## PHẦN 1: Tư duy & Kiến trúc (State Machine)

Puzzle này yêu cầu xây dựng một **hệ thống phân loại** — không đơn giản là form thông thường. Điểm mấu chốt là **không có đáp án đúng hay sai**, mà mỗi lựa chọn đều mang một **giá trị điểm** ẩn, và tổng điểm cuối cùng quyết định bạn thuộc nhóm nào.

### Tầng 1 — State (Dữ liệu cần theo dõi)

Thay vì dùng nhiều boolean lộn xộn, tôi dùng mô hình **State Machine** với một biến phase duy nhất:

| State | Kiểu | Vai trò |
|---|---|---|
| `phase` | `"quiz" \| "result"` | Đang ở bước nào của luồng? |
| `currentQ` | `number (0→4)` | Câu hỏi đang hiển thị |
| `selectedOption` | `number \| null` | Đáp án đang chọn ở câu hiện tại |
| `totalScore` | `number` | Tổng điểm tích lũy qua từng câu |

### Tầng 2 — Actions

1. User chọn một đáp án → `setSelectedOption(idx)`
2. User bấm "Next" → Cộng điểm vào `totalScore`, chuyển câu tiếp
3. Câu cuối → Tính tier, chuyển `phase` sang `"result"`
4. User bấm "Retake" → Reset toàn bộ state về ban đầu

### Tầng 3 — UI phản chiếu State

- `phase === "quiz"`: Hiện câu hỏi + đáp án + progress bar
- `phase === "result"`: Hiện gauge tròn + tier badge + CTA động

---

## PHẦN 2: Hệ thống chấm điểm (Scoring System)

### Thiết kế điểm

- **5 câu hỏi** × **tối đa 3 điểm/câu** = **Tối đa 15 điểm**
- **Tối thiểu**: 5 điểm (mỗi câu đều chọn đáp án kém nhất)

```ts
// Mỗi option trong data đều có field `score`
{ label: "A", text: "...", score: 1 },  // Điểm thấp
{ label: "D", text: "...", score: 3 },  // Điểm cao
```

### Phân loại Tier (Threshold Logic)

```ts
function getTier(score: number): TierKey {
  if (score <= 8)  return "cold";   // 5–8  điểm → Getting Started
  if (score <= 11) return "warm";   // 9–11 điểm → Strong Potential
  return "hot";                     // 12–15 điểm → Elite Candidate
}
```

---

## PHẦN 3: Cấu trúc Code — Đọc từng block

### Block 1: Data Layer — Tách data ra khỏi logic

```ts
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is your primary fitness goal?",
    options: [
      { label: "A", text: "...", score: 1 },
      { label: "D", text: "...", score: 3 },
    ],
  },
  // ...5 câu
];
```

**Nguyên tắc:** Data (câu hỏi, đáp án, điểm) phải tách hoàn toàn khỏi logic và UI. Muốn thêm câu hỏi mới → chỉ cần thêm vào mảng, không sờ vào code logic.

---

### Block 2: Tier Configuration — Map tier sang UI

```ts
const TIERS: Record<TierKey, TierConfig> = {
  cold: {
    glowColor: "#34d399",
    ctaLabel: "Download Free Guide",
    ctaIcon: Download,
    // ...
  },
  hot: {
    glowColor: "#00f5d4",
    ctaLabel: "Get My Custom Plan",
    ctaIcon: Zap,
  },
};
```

**Tại sao dùng cách này?** Toàn bộ thông tin của 1 tier (màu sắc, label, CTA, icon) được đóng gói vào 1 object duy nhất. Sau đó render bằng cách tra cứu:

```tsx
const tier = TIERS[tierKey];  // "hot" → lấy ra object config của tier hot
const CtaIcon = tier.ctaIcon; // Dùng biến làm React Component
```

---

### Block 3: Logic tích lũy điểm (Accumulation)

```tsx
const handleNext = () => {
  const pointsEarned = question.options[selectedOption].score;
  const newScore = totalScore + pointsEarned;

  if (isLastQ) {
    setTotalScore(newScore);
    setPhase("result");
  } else {
    setTotalScore(newScore);
    setCurrentQ((q) => q + 1);
    setSelectedOption(null);  // Reset lựa chọn cho câu tiếp theo
  }
};
```

**Điểm quan trọng:** Tôi dùng `newScore` (biến tạm) chứ không dùng `totalScore + ...` trực tiếp 2 lần, vì React cập nhật state bất đồng bộ (async) — nếu dùng `totalScore` 2 lần trong cùng 1 handler, giá trị có thể bị cũ.

---

### Block 4: SVG Circular Score Gauge

```tsx
const circumference = 2 * Math.PI * radius;  // ~326px
const dashOffset = circumference * (1 - score / max);

<motion.circle
  strokeDasharray={circumference}
  initial={{ strokeDashoffset: circumference }}  // Bắt đầu ở 0% (rỗng)
  animate={{ strokeDashoffset: dashOffset }}     // Animate đến % điểm thực
/>
```

**Cơ chế hoạt động:**
- `strokeDasharray`: Độ dài của "nét gạch" = toàn bộ chu vi vòng tròn
- `strokeDashoffset`: Phần bị ẩn đi. Khi = 0 → full vòng. Khi = circumference → rỗng.
- Animate từ "rỗng" → "% điểm" tạo hiệu ứng "loading gauge" mượt mà.

---

## PHẦN 4: Prompt Template

```text
Build a Lead Scoring Quiz using Next.js, Tailwind, and Framer Motion.

DATA STRUCTURE:
- 5 questions, each with 4 options (A/B/C/D), each option has a hidden `score` field (1-3).
- A separate TIERS config object maps tier keys to: color, label, message, CTA label, CTA icon.

SCORING LOGIC:
- Accumulate score as user answers each question.
- On final question, call getTier(totalScore) to get tier key.
- getTier uses threshold if/else: low tier ≤ X, mid tier ≤ Y, else high tier.

STATE MACHINE (Single phase variable):
  type Phase = "quiz" | "result"
  NO multiple boolean flags.

UI REQUIREMENTS:
- Progress bar that advances each question
- Option cards highlight on selection
- "Next" button disabled until an option is selected
- Result screen: SVG circular gauge (animate stroke-dashoffset), tier badge, description, CTA

STYLE: Luxury dark mode, Tailwind CSS, Framer Motion AnimatePresence for phase transitions.
```

---

## TÓM TẮT: Pattern Lead Scoring

```text
1. DATA     → Mỗi đáp án có score ẩn. Tách data ra constant/file riêng.
2. SCORE    → Cộng dồn score khi user "Next". Dùng biến tạm, không dùng state cũ.
3. CLASSIFY → Sau câu cuối, dùng threshold function để phân loại tier.
4. RENDER   → Tra cứu TIERS[tierKey] để lấy config (màu, CTA, icon) và render động.
```
