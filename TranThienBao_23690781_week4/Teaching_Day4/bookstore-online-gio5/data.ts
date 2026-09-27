// Dữ liệu mẫu dùng chung cho toàn bộ 5 Giờ — đúng tinh thần "cho sẵn trong data.js"
// của tài liệu, để không phải nhập liệu tay, chỉ tập trung vào LAYOUT.

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  discountPercent?: number; // có giá trị -> Giờ 3 vẽ badge "-x%"
  isNew?: boolean; // true -> Giờ 3 vẽ badge "Mới" thay vì badge giảm giá
  description: string; // dùng cho Giờ 4 (màn Chi tiết, đoạn mô tả dài cần cuộn)
  category?: string;
  publisher?: string;
  pages?: number;
}

export const CATEGORIES: string[] = [
  "Tất cả",
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Kỹ năng sống",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

// Cố tình để vài tựa sách DÀI (để test numberOfLines + layout không vỡ khi nội dung dài
// — đúng tiêu chí "Không bị lệch khi đổi nội dung" ở cuối tài liệu).
export const BOOKS: Book[] = [
  {
    id: 1,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 45000,
    cover: "https://picsum.photos/seed/book1/400/560",
    discountPercent: 20,
    category: "Thiếu nhi",
    publisher: "NXB Kim Đồng",
    pages: 188,
    description:
      "Cuốn sách kể về hành trình phiêu lưu của chú Dế Mèn, qua đó gửi gắm bài học về lòng dũng cảm, " +
      "sự trưởng thành và tình bạn. Đây là tác phẩm văn học thiếu nhi kinh điển của Việt Nam, được nhiều " +
      "thế hệ độc giả yêu thích và đưa vào chương trình giảng dạy phổ thông.\n\n" +
      "Trải qua nhiều thử thách nghiệt ngã từ sự bồng bột nông nổi ban đầu, Dế Mèn dần nhận thức được ý nghĩa " +
      "đích thực của cuộc sống, tinh thần hiệp sĩ sẵn sàng bảo vệ kẻ yếu và khát vọng hòa bình cho muôn loài " +
      "trong thế giới đồng cỏ bao la.\n\n" +
      "Tác phẩm mang giá trị nhân văn sâu sắc, giàu hình ảnh miêu tả thiên nhiên sinh động và nghệ thuật nhân hóa " +
      "đặc sắc bậc thầy của nhà văn Tô Hoài.",
  },
  {
    id: 2,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    cover: "https://picsum.photos/seed/book2/400/560",
    isNew: true,
    category: "Văn học",
    publisher: "NXB Hội Nhà Văn",
    pages: 224,
    description:
      "Câu chuyện ngụ ngôn về chàng chăn cừu Santiago trên hành trình đi tìm kho báu, khám phá ra rằng " +
      "kho báu lớn nhất chính là những bài học có được trên con đường mình đã đi qua.\n\n" +
      "Mỗi trải nghiệm trên sa mạc mênh mông, những lần trò chuyện cùng nhà giả kim hay lắng nghe tiếng nói " +
      "từ trái tim mình đều giúp Santiago thấu hiểu dấu hiệu của vũ trụ và tìm thấy 'Vận mệnh cá nhân'.\n\n" +
      "Cuốn sách đã chạm tới trái tim của hàng triệu độc giả khắp thế giới, trở thành một trong những tác phẩm " +
      "được dịch ra nhiều thứ tiếng nhất lịch sử văn học đương đại.",
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 129000,
    cover: "https://picsum.photos/seed/book3/400/560",
    category: "Lịch sử",
    publisher: "NXB Thế Giới",
    pages: 560,
    description:
      "Một góc nhìn tổng quan về lịch sử loài người, từ thời kỳ đồ đá cho đến cuộc cách mạng khoa học " +
      "và công nghệ hiện đại, lý giải vì sao Homo sapiens trở thành loài thống trị hành tinh.\n\n" +
      "Tác giả Yuval Noah Harari dẫn dắt người đọc qua ba cuộc cách mạng lớn định hình dòng chảy văn minh: " +
      "Cách mạng Nhận thức mở đầu cách đây 70.000 năm, Cách mạng Nông nghiệp cách đây 12.000 năm và Cách mạng Khoa học " +
      "bùng nổ cách đây chỉ 500 năm.\n\n" +
      "Những phân tích sắc bén kết hợp giữa sinh học, nhân chủng học và kinh tế học sẽ khiến bạn đọc nhìn lại " +
      "những giả định cơ bản nhất về xã hội, tiền tệ, tôn giáo và tương lai của chính giống loài chúng ta.",
  },
  {
    id: 4,
    title: "Điều Kỳ Diệu Của Tiệm Tạp Hoá Namiya",
    author: "Higashino Keigo",
    price: 98000,
    cover: "https://picsum.photos/seed/book4/400/560",
    discountPercent: 15,
    category: "Văn học",
    publisher: "NXB Nhã Nam",
    pages: 360,
    description:
      "Những lá thư gửi đến một tiệm tạp hoá cũ kỹ vượt thời gian, kết nối quá khứ và hiện tại, mang đến " +
      "câu chuyện ấm áp về sự sẻ chia và chữa lành.\n\n" +
      "Ba tên trộm tình cờ trú ẩn trong một tiệm tạp hóa bỏ hoang và bất ngờ nhận được những phong thư xin lời khuyên " +
      "từ những con người sống ở thời điểm 30 năm trước. Từ sự bỡ ngỡ ban đầu, những hồi đáp chân thành của họ đã vô tình " +
      "thay đổi số phận của nhiều cuộc đời.\n\n" +
      "Tác phẩm là bản tình ca lắng đọng về tình người, lòng trắc ẩn và sợi dây nhân duyên kỳ diệu kết nối con người.",
  },
  {
    id: 5,
    title: "Muôn Kiếp Nhân Sinh",
    author: "Nguyên Phong",
    price: 150000,
    cover: "https://picsum.photos/seed/book5/400/560",
    category: "Kỹ năng sống",
    publisher: "NXB Tổng Hợp TP.HCM",
    pages: 420,
    description:
      "Hành trình khám phá luân hồi và nhân quả qua nhiều kiếp sống, dựa trên các nghiên cứu tâm linh.\n\n" +
      "Cuốn sách ghi lại những trải nghiệm kỳ lạ về tiền kiếp của một doanh nhân thành đạt người Mỹ gốc Do Thái mang tên Thomas, " +
      "dưới sự chấp bút và chiêm nghiệm sâu sắc của Giáo sư John Vũ (Nguyên Phong).\n\n" +
      "Qua các kiếp sống tại nền văn minh Atlantis cổ đại hay Ai Cập cổ đại, tác phẩm gửi gắm thông điệp cảnh tỉnh " +
      "về luật nhân quả, lòng nhân ái và sự thức tỉnh lương tri của nhân loại trước những biến thiên thời đại.",
  },
  {
    id: 6,
    title: "Cách Nghĩ Để Thành Công (Think and Grow Rich)",
    author: "Napoleon Hill",
    price: 79000,
    cover: "https://picsum.photos/seed/book6/400/560",
    isNew: true,
    category: "Kinh tế",
    publisher: "NXB Trẻ",
    pages: 396,
    description:
      "Đúc kết 13 nguyên tắc thành công từ hơn 500 nhân vật thành đạt nhất nước Mỹ đầu thế kỷ 20.\n\n" +
      "Cuốn sách không chỉ hướng dẫn phương pháp làm giàu về mặt tài chính mà còn truyền cảm hứng xây dựng tư duy " +
      "tích cực, rèn luyện sự kiên trì, làm chủ nỗi sợ hãi và hiện thực hóa mục tiêu cuộc sống.\n\n" +
      "Đây là cuốn cẩm nang phát triển bản thân bán chạy nhất mọi thời đại, đã đồng hành cùng hàng triệu triệu độc giả " +
      "trên con đường chinh phục ước mơ.",
  },
  {
    id: 7,
    title: "Đắc Nhân Tâm (How to Win Friends and Influence People)",
    author: "Dale Carnegie",
    price: 86000,
    cover: "https://picsum.photos/seed/book7/400/560",
    discountPercent: 10,
    category: "Kỹ năng sống",
    publisher: "NXB First News",
    pages: 320,
    description:
      "Nghệ thuật thu phục lòng người và giao tiếp ứng xử đỉnh cao của Dale Carnegie.\n\n" +
      "Tác phẩm đưa ra những nguyên tắc vàng trong đối nhân xử thế, lắng nghe chân thành, thấu hiểu tâm lý " +
      "và xây dựng các mối quan hệ bền vững trong công việc lẫn cuộc sống hàng ngày.",
  },
  {
    id: 8,
    title: "Lược Sử Thời Gian",
    author: "Stephen Hawking",
    price: 115000,
    cover: "https://picsum.photos/seed/book8/400/560",
    isNew: true,
    category: "Lịch sử",
    publisher: "NXB Trẻ",
    pages: 288,
    description:
      "Khám phá vũ trụ bao la, từ Vụ nổ lớn (Big Bang) đến các lỗ đen bí ẩn và bản chất của thời gian qua ngòi bút thiên tài " +
      "của nhà vật lý lỗi lạc Stephen Hawking.",
  },
];

export interface CartItem {
  book: Book;
  quantity: number;
}

// Giỏ hàng mẫu dùng sẵn cho Giờ 5 — Bài tập 2 (Cart Screen)
// Có đủ 5 sản phẩm để kiểm tra ScrollView cuộn mượt mà mà không ảnh hưởng TotalBar & TabBar
export const CART_ITEMS: CartItem[] = [
  { book: BOOKS[0], quantity: 2 },
  { book: BOOKS[1], quantity: 1 },
  { book: BOOKS[2], quantity: 1 },
  { book: BOOKS[3], quantity: 1 },
  { book: BOOKS[4], quantity: 2 },
];
