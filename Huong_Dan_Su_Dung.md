# HƯỚNG DẪN DỰ ÁN VITE: ĐẤU TRÍ X - O: ĐƯỜNG ĐẾN ĐẠI THẮNG
**Chủ đề:** Lãnh đạo cách mạng cả nước (1965 - 1975) • Bộ 20 câu hỏi trắc nghiệm Lịch sử Đảng

---

## ⚡ 1. CÁCH KHỞI CHẠY BẰNG NPM / VITE
Dự án đã được tích hợp sẵn **Vite 6** và cài đặt sẵn dependencies (`node_modules`).

Bạn có thể chạy bằng các cách sau:

### Cách 1: Chạy bằng lệnh npm trong terminal
Mở terminal / cmd tại thư mục dự án và gõ:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại địa chỉ: `http://localhost:3000` (kèm tính năng Hot-Reload tức thì).

### Cách 2: Nhấp đúp file `.bat`
Chỉ cần nhấp đúp vào file [Mo_Game.bat](file:///c:/Users/exorc/Downloads/mới/Mo_Game.bat), script sẽ tự động chạy `npm run dev` và mở trình duyệt cho bạn!

### Các lệnh hữu ích khác:
- `npm run build`: Đóng gói sản phẩm tối ưu ra thư mục `dist/`
- `npm run preview`: Xem trước bản build production

---

## 🎯 2. TỔNG QUAN LUẬT CHƠI
- **Hai đội thi đấu:** Đội **X** (Xanh Neon) và Đội **O** (Đỏ Neon).
- **Quy tắc bốc thăm:** 
  - Trong thực tế: MC / Quản trò cho bốc thăm thẻ X hoặc O bằng tay.
  - Trên web: Có sẵn nút **🎲 BỐC THĂM X / O** (vòng quay lật đồng xu 3D ngẫu nhiên kèm âm thanh).
  - Có nút **👉 Chọn Lượt X** / **👉 Chọn Lượt O** để MC bấm chỉ định lượt theo kết quả bốc thăm thực tế.
- **Điểm cơ bản:** Mỗi câu trả lời đúng được **+1 điểm**.

---

## ⭐ 3. HỆ THỐNG 5 Ô LUCKY (MAY MẮN / BÍ MẬT)
| Ô số | Tên sự kiện | Hiệu ứng đặc biệt |
| :--- | :--- | :--- |
| **Câu 5** | ⭐ **Ngôi sao Vàng (x2)** | Đội trả lời đúng được **x2 điểm số hiện tại** (hoặc +2 điểm nếu đang 0đ) |
| **Câu 9** | ⭐ **Ngôi sao Vàng (x2)** | Đội trả lời đúng được **x2 điểm số hiện tại** (hoặc +2 điểm nếu đang 0đ) |
| **Câu 12** | ⚔️ **Ngôi sao Xanh (Cướp / Swap)** | Đội trả lời đúng được chọn: **Cướp 2 điểm từ đội bạn** HOẶC **Hoán đổi (Swap) điểm 2 đội** |
| **Câu 17** | 🌸 **Ngôi sao Hồng (Chia đôi)** | Cực kỳ nguy hiểm: Bị **chia đôi số điểm hiện có** (/2) nếu trả lời sai hoặc gặp rủi ro |
| **Câu 20** | 🔴 **Ngôi sao Đỏ (Về Mo)** | Định mệnh phút chót: **Mất sạch điểm (về 0 điểm)** nếu trả lời sai |

> 💡 **Mẹo:** Trên thanh Legend có nút **"👁️ Hiện vị trí Lucky / Ẩn vị trí Lucky"** để MC tùy ý giữ bí mật bất ngờ cho cả lớp hoặc bật xem trước.

---

## 🖥️ 4. HIỆU ỨNG TƯƠNG TÁC ĐÁP ÁN (CHUẨN YÊU CẦU)
- Khi ấn vào 1 trong 4 đáp án (A, B, C, D):
  - **Nếu ĐÚNG:** Nền đổi sang **Xanh Lá Cây** rực rỡ + hiện biểu tượng tích `✓ CHÍNH XÁC` + âm thanh chúc mừng + pháo hoa confetti.
  - **Nếu SAI:** Thẻ chọn đổi sang **Nền Đỏ** + dấu `✗ SAI RỒI`, đồng thời đáp án đúng tự động sáng bừng **Nền Xanh Lá** + dấu `✓ ĐÁP ÁN ĐÚNG`.
  - Hộp **Giải thích chi tiết** (trích chuẩn từ đề cương Lịch sử Đảng) trượt lên để cả lớp cùng ôn tập.

---

## 📁 5. CẤU TRÚC THƯ MỤC DỰ ÁN VITE
```
mới/
├── index.html          # File HTML gốc của Vite
├── vite.config.js      # Cấu hình Vite (port 3000, auto-open)
├── package.json        # Cấu hình npm scripts & devDependencies
├── Mo_Game.bat         # Phím tắt 1-click chạy npm run dev
├── Huong_Dan_Su_Dung.md# Hướng dẫn chi tiết
└── src/
    ├── main.js         # Logic điều khiển game, UI, events
    ├── data.js         # Bộ dữ liệu 20 câu hỏi & giải thích
    ├── sound.js        # Bộ tổng hợp âm thanh Web Audio API offline
    ├── confetti.js     # Hiệu ứng pháo hoa ăn mừng Canvas
    └── style.css       # CSS phong cách Sci-Fi Gameshow
```
