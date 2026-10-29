/* =========================================================
   20 QUESTIONS DATABASE (LÃNH ĐẠO CÁCH MẠNG CẢ NƯỚC 1965 - 1975)
   ========================================================= */
export const QUESTIONS_DATA = [
  {
    id: 1,
    question: "Đường lối kháng chiến chống Mỹ, cứu nước trên phạm vi toàn quốc được Ban Chấp hành Trung ương Đảng đề ra tại các hội nghị nào?",
    options: {
      A: "Hội nghị Trung ương 9 (12/1963) và Hội nghị Trung ương 10 (12/1964)",
      B: "Hội nghị Trung ương 11 (3/1965) và Hội nghị Trung ương 12 (12/1965)",
      C: "Hội nghị Trung ương 13 (1/1967) và Hội nghị Trung ương 14 (1/1968)",
      D: "Hội nghị Trung ương 15 (1/1959) và Hội nghị Trung ương 18 (1/1970)"
    },
    correct: "B",
    explanation: "Trước việc Mỹ mở rộng 'Chiến tranh cục bộ' ở miền Nam và gây chiến tranh phá hoại miền Bắc, Hội nghị lần thứ 11 (3/1965) và lần thứ 12 (12/1965) của Trung ương Đảng đã hạ quyết tâm phát động cuộc kháng chiến chống Mỹ, cứu nước trên phạm vi toàn quốc.",
    special: null
  },
  {
    id: 2,
    question: "Trong đường lối kháng chiến chống Mỹ (1965), Đảng xác định khẩu hiệu chung cho nhân dân cả nước là gì?",
    options: {
      A: "\"Tất cả cho tiền tuyến, tất cả để chiến thắng\"",
      B: "\"Thần tốc, táo bạo, bất ngờ, chắc thắng\"",
      C: "\"Tất cả để đánh thắng giặc Mỹ xâm lược\"",
      D: "\"Nhằm thẳng quân thù mà bắn\""
    },
    correct: "C",
    explanation: "Trung ương Đảng nhấn mạnh mối quan hệ giữa hai miền Nam - Bắc và đề ra khẩu hiệu chung cho nhân dân cả nước lúc này là 'Tất cả để đánh thắng giặc Mỹ xâm lược'.",
    special: null
  },
  {
    id: 3,
    question: "Khẩu hiệu lịch sử nổi tiếng trong Lời kêu gọi ngày 17-7-1966 của Chủ tịch Hồ Chí Minh là gì?",
    options: {
      A: "\"Dù phải đốt cháy cả dãy Trường Sơn cũng phải giành cho được độc lập\"",
      B: "\"Không có gì quý hơn độc lập, tự do\"",
      C: "\"Vì độc lập, vì tự do, đánh cho Mỹ cút, đánh cho ngụy nhào\"",
      D: "\"Thà hy sinh tất cả chứ nhất định không chịu mất nước\""
    },
    correct: "B",
    explanation: "Trong Lời kêu gọi chống Mỹ cứu nước ngày 17-7-1966, Chủ tịch Hồ Chí Minh đã khẳng định quyết tâm: 'Chiến tranh có thể kéo dài 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa... Không có gì quý hơn độc lập, tự do'.",
    special: null
  },
  {
    id: 4,
    question: "Chiến thắng quân sự đầu tiên thể hiện khả năng quân dân miền Nam có thể đánh thắng quân chiến đấu Mỹ trong chiến lược 'Chiến tranh cục bộ' là chiến thắng nào?",
    options: {
      A: "Chiến thắng Ấp Bắc (1/1963)",
      B: "Chiến thắng Bình Giã (12/1964)",
      C: "Chiến thắng Núi Thành (5/1965) và Vạn Tường (8/1965)",
      D: "Chiến thắng Ba Gia (5/1965)"
    },
    correct: "C",
    explanation: "Bước vào chiến lược 'Chiến tranh cục bộ', quân và dân miền Nam đã thử nghiệm và đánh thắng quân chiến đấu Mỹ trong các trận đánh tiêu biểu tại Núi Thành (5/1965) và Vạn Tường (8/1965).",
    special: null
  },
  {
    id: 5,
    question: "Đảng quyết định mở mặt trận ngoại giao, mở ra cục diện 'vừa đánh, vừa đàm' tại Hội nghị Trung ương nào?",
    options: {
      A: "Hội nghị Trung ương 11 (3/1965)",
      B: "Hội nghị Trung ương 12 (12/1965)",
      C: "Hội nghị Trung ương 13 (1/1967)",
      D: "Hội nghị Trung ương 14 (1/1968)"
    },
    correct: "C",
    explanation: "Tháng 1/1967, Hội nghị lần thứ 13 Ban Chấp hành Trung ương Đảng (khóa III) đã quyết định mở mặt trận ngoại giao nhằm tranh thủ sự ủng hộ quốc tế, mở ra cục diện vừa đánh vừa đàm.",
    special: {
      type: "gold",
      name: "MỐC CÂU 5: MẶC ĐỊNH X2 ĐIỂM",
      desc: "Hoàn thành câu này bạn sẽ mặc định được NHÂN ĐÔI (x2) điểm số!",
      icon: "⭐"
    }
  },
  {
    id: 6,
    question: "Chủ trương chuyển cuộc chiến tranh cách mạng miền Nam sang thời kỳ tiến lên giành thắng lợi quyết định bằng phương pháp tổng công kích - tổng khởi nghĩa Tết Mậu Thân 1968 được đề ra tại đâu?",
    options: {
      A: "Hội nghị Trung ương 13 (1/1967)",
      B: "Nghị quyết Bộ Chính trị (12/1967) và Hội nghị Trung ương 14 (1/1968)",
      C: "Hội nghị Trung ương 15 (1/1969)",
      D: "Hội nghị Trung ương 18 (1/1970)"
    },
    correct: "B",
    explanation: "Tháng 12/1967, Bộ Chính trị ra nghị quyết lịch sử chuyển chiến tranh cách mạng miền Nam sang Tổng công kích - tổng khởi nghĩa vào các đô thị, được Hội nghị Trung ương 14 (1/1968) chính thức thông qua.",
    special: null
  },
  {
    id: 7,
    question: "Thắng lợi nào của quân và dân ta đã làm phá sản chiến lược 'Chiến tranh cục bộ', buộc Mỹ phải chấp nhận đàm phán tại Paris từ ngày 13-5-1968?",
    options: {
      A: "Cuộc Tiến công chiến lược Xuân - Hè 1972",
      B: "Tổng tiến công và nổi dậy Tết Mậu Thân 1968",
      C: "Chiến dịch Đường 9 - Nam Lào 1971",
      D: "Trận \"Điện Biên Phủ trên không\" 1972"
    },
    correct: "B",
    explanation: "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968 là đòn tiến công chiến lược đánh gục ý chí xâm lược của Mỹ, làm phá sản 'Chiến tranh cục bộ' và buộc Mỹ phải đàm phán với ta tại Paris.",
    special: null
  },
  {
    id: 8,
    question: "Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam được thành lập vào ngày tháng năm nào?",
    options: {
      A: "Ngày 20-12-1960",
      B: "Ngày 13-5-1968",
      C: "Ngày 6-6-1969",
      D: "Ngày 27-1-1973"
    },
    correct: "C",
    explanation: "Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam được thành lập ngày 6-6-1969 do Kiến trúc sư Huỳnh Tấn Phát làm Chủ tịch.",
    special: null
  },
  {
    id: 9,
    question: "Nhằm chống lại chiến lược 'Việt Nam hóa chiến tranh' của Mỹ, Thư chúc mừng năm mới (1-1-1969) của Chủ tịch Hồ Chí Minh đã nêu rõ mục tiêu chiến lược hai bước là gì?",
    options: {
      A: "\"Đánh cho Mỹ ngã, đánh cho ngụy tan\"",
      B: "\"Vì độc lập, vì tự do, đánh cho Mỹ cút, đánh cho ngụy nhào\"",
      C: "\"Thần tốc, thần tốc hơn nữa, táo bạo, táo bạo hơn nữa\"",
      D: "\"Nhất định hoàn toàn độc lập, nhất định thống nhất Bắc Nam\""
    },
    correct: "B",
    explanation: "Trong Thư chúc mừng năm mới ngày 1-1-1969, Chủ tịch Hồ Chí Minh đã nêu rõ quyết tâm: 'Vì độc lập, vì tự do, đánh cho Mỹ cút, đánh cho ngụy nhào'.",
    special: null
  },
  {
    id: 10,
    question: "Trong giai đoạn 1969-1972, đế quốc Mỹ đã thực hiện chiến lược toàn cầu nào dưới thời Tổng thống Richard Nixon tại miền Nam Việt Nam?",
    options: {
      A: "\"Chiến tranh đơn phương\"",
      B: "\"Chiến tranh đặc biệt\"",
      C: "\"Chiến tranh cục bộ\"",
      D: "\"Việt Nam hóa chiến tranh\""
    },
    correct: "D",
    explanation: "Từ đầu năm 1969, Tổng thống Mỹ R. Nixon đề ra 'Học thuyết Nixon' và thực hiện chiến lược 'Việt Nam hóa chiến tranh' nhằm 'dùng người Việt Nam đánh người Việt Nam'.",
    special: null
  },
  {
    id: 11,
    question: "Chiến thắng quân sự nào của liên quân Việt - Lào năm 1971 đã đập tan cuộc hành quân 'Lam Sơn 719' của Mỹ - ngụy?",
    options: {
      A: "Chiến thắng Cánh Đồng Chum",
      B: "Chiến thắng Đường 9 - Nam Lào",
      C: "Chiến thắng Đông-Bắc Campuchia",
      D: "Chiến thắng Thượng Lào"
    },
    correct: "B",
    explanation: "Năm 1971, quân và dân Việt Nam phối hợp với quân dân Lào đánh bại cuộc hành quân quy mô lớn 'Lam Sơn 719' đánh vào Đường 9 - Nam Lào.",
    special: null
  },
  {
    id: 12,
    question: "Trận chiến đấu oanh liệt diễn ra suốt 81 ngày đêm (từ 28-6 đến 16-9-1972) của Quân giải phóng nằm ở địa danh nào?",
    options: {
      A: "Căn cứ A Lưới (Thừa Thiên)",
      B: "Thành cổ Quảng Trị",
      C: "Đồn Sê Pôn (Lào)",
      D: "Thị xã An Lộc (Bình Long)"
    },
    correct: "B",
    explanation: "Cuộc tiến công chiến lược năm 1972 nổi bật với cuộc chiến đấu vô cùng oanh liệt của Quân giải phóng tại Thành cổ Quảng Trị trong 81 ngày đêm.",
    special: {
      type: "blue",
      name: "MỐC CÂU 12: MỞ BOOK BÍ MẬT",
      desc: "Xong câu này sẽ mở Book chọn: Nhân đôi (x2) HOẶC Cướp điểm thưởng!",
      icon: "📖"
    }
  },
  {
    id: 13,
    question: "Trận 'Điện Biên Phủ trên không' đánh bại cuộc tập kích chiến lược bằng máy bay B-52 của Mỹ vào Hà Nội và Hải Phòng diễn ra trong bao nhiêu ngày đêm?",
    options: {
      A: "10 ngày đêm (từ 18 đến 28-12-1972)",
      B: "12 ngày đêm (từ 18 đến 30-12-1972)",
      C: "14 ngày đêm (từ 15 đến 29-12-1972)",
      D: "15 ngày đêm (từ 12 đến 27-12-1972)"
    },
    correct: "B",
    explanation: "Trong 12 ngày đêm (từ 18 đến 30-12-1972), quân dân miền Bắc đã lập nên trận 'Điện Biên Phủ trên không', bắn rơi 84 máy bay (trong đó có 34 máy bay B-52), buộc Mỹ phải ký Hiệp định Paris.",
    special: null
  },
  {
    id: 14,
    question: "Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được chính thức ký kết vào thời gian nào?",
    options: {
      A: "Ngày 1-11-1968",
      B: "Ngày 15-1-1973",
      C: "Ngày 27-1-1973",
      D: "Ngày 30-4-1975"
    },
    correct: "C",
    explanation: "Cuộc đàm phán tại Paris kết thúc và Hiệp định Paris chính thức được ký kết vào ngày 27-1-1973.",
    special: null
  },
  {
    id: 15,
    question: "Sau Hiệp định Paris 1973, Hội nghị Trung ương nào đã xác định con đường cách mạng miền Nam vẫn là con đường bạo lực cách mạng, giữ vững thế tiến công?",
    options: {
      A: "Hội nghị Trung ương 19 (1/1971)",
      B: "Hội nghị Trung ương 20 (4/1972)",
      C: "Hội nghị Trung ương 21 (7/1973)",
      D: "Hội nghị Trung ương 22 (1/1974)"
    },
    correct: "C",
    explanation: "Tháng 7/1973, Hội nghị lần thứ 21 Ban Chấp hành Trung ương Đảng (khóa III) khẳng định con đường cách mạng miền Nam là con đường bạo lực cách mạng và giữ vững đường lối tiến công.",
    special: null
  },
  {
    id: 16,
    question: "Chiến thắng quân sự nào ở miền Đông Nam Bộ (ngày 6-1-1975) được Bộ Chính trị đánh giá có ý nghĩa như một 'đòn thăm dò chiến lược'?",
    options: {
      A: "Chiến thắng Buôn Ma Thuột",
      B: "Chiến thắng Phước Long",
      C: "Chiến thắng Xuân Lộc",
      D: "Chiến thắng An Lộc"
    },
    correct: "B",
    explanation: "Ngày 6-1-1975, quân ta giải phóng hoàn toàn tỉnh Phước Long. Chiến thắng này có ý nghĩa như một đòn thăm dò chiến lược, chứng minh quân chủ lực ta đã mạnh hơn hẳn địch và Mỹ không còn khả năng can thiệp lại.",
    special: null
  },
  {
    id: 17,
    question: "Các Hội nghị Bộ Chính trị đợt 1 (10/1974) và đợt 2 (12/1974 - 1/1975) đã đề ra kế hoạch giải phóng hoàn toàn miền Nam trong thời gian bao lâu?",
    options: {
      A: "Kế hoạch 1 năm (ngay trong năm 1975)",
      B: "Kế hoạch 2 năm (1975 - 1976)",
      C: "Kế hoạch 3 năm (1975 - 1977)",
      D: "Kế hoạch 5 năm (1975 - 1980)"
    },
    correct: "B",
    explanation: "Bộ Chính trị đề ra quyết tâm chiến lược giải phóng miền Nam trong 2 năm 1975 - 1976, đồng thời cài đặt phương hướng linh hoạt: nếu thời cơ đến sẽ giải phóng ngay trong năm 1975.",
    special: {
      type: "pink",
      name: "MỐC CÂU 17: CHỌN X2 HOẶC 50% ĐIỂM",
      desc: "Xong câu này hãy lựa chọn: Nhân đôi (x2) HOẶC Lấy 50% số điểm!",
      icon: "⚖️"
    }
  },
  {
    id: 18,
    question: "Trận đánh mở màn quyết định cho cuộc Tổng tiến công và nổi dậy Xuân 1975 là trận tiến công vào địa danh nào?",
    options: {
      A: "Thị xã Phước Long (6-1-1975)",
      B: "Thị xã Buôn Ma Thuột (10-3-1975)",
      C: "Thành phố Huế (21-3-1975)",
      D: "Thành phố Đà Nẵng (26-3-1975)"
    },
    correct: "B",
    explanation: "Cuộc Tổng tiến công và nổi dậy Xuân 1975 bắt đầu bằng Chiến dịch Tây Nguyên, mở màn bằng trận tiến công thị xã Buôn Ma Thuột ngày 10-3-1975.",
    special: null
  },
  {
    id: 19,
    question: "Bộ Tư lệnh Chiến dịch Hồ Chí Minh giải phóng Sài Gòn - Gia Định gồm các đồng chí nào?",
    options: {
      A: "Văn Tiến Dũng (Tư lệnh), Phạm Hùng (Chính ủy), Trần Văn Trà (Phó Tư lệnh)",
      B: "Võ Nguyên Giáp (Tư lệnh), Lê Duẩn (Chính ủy), Văn Tiến Dũng (Phó Tư lệnh)",
      C: "Trần Văn Trà (Tư lệnh), Nguyễn Chí Thanh (Chính ủy), Lê Trọng Tấn (Phó Tư lệnh)",
      D: "Văn Tiến Dũng (Tư lệnh), Lê Đức Thọ (Chính ủy), Hoàng Văn Thái (Phó Tư lệnh)"
    },
    correct: "A",
    explanation: "Bộ Tư lệnh Chiến dịch Hồ Chí Minh được thành lập do Đại tướng Văn Tiến Dũng làm Tư lệnh, đồng chí Phạm Hùng làm Chính ủy, đồng chí Trần Văn Trà làm Phó Tư lệnh.",
    special: null
  },
  {
    id: 20,
    question: "Ý nghĩa lịch sử của Đại thắng Xuân 1975 được Đại hội đại biểu toàn quốc lần thứ IV của Đảng (12/1976) đánh giá như thế nào?",
    options: {
      A: "Là thắng lợi ngang tầm với cuộc Cách mạng Tháng Tám năm 1945",
      B: "Mãi mãi được ghi vào lịch sử dân tộc như một trong những trang chói lọi nhất, một biểu tượng sáng ngời về sự toàn thắng của chủ nghĩa anh hùng cách mạng và trí tuệ con người",
      C: "Đánh dấu bước nhảy vọt vĩ đại đưa đất nước đi lên chủ nghĩa xã hội trong vòng 20 năm",
      D: "Là chiến công vĩ đại nhất của phong trào cộng sản quốc tế ở nửa đầu thế kỷ XX"
    },
    correct: "B",
    explanation: "Đại hội IV (12/1976) khẳng định: Thắng lợi kháng chiến chống Mỹ 'mãi mãi được ghi vào lịch sử dân tộc ta như một trong những trang chói lọi nhất, một biểu tượng sáng ngời về sự toàn thắng của chủ nghĩa anh hùng cách mạng và trí tuệ con người...'",
    special: {
      type: "red",
      name: "MỐC CÂU 20: RESET ĐIỂM VỀ 0",
      desc: "Chặng cuối cùng: Toàn bộ điểm số sẽ bị RESET VỀ 0!",
      icon: "🔄"
    }
  }
];
