import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for margin_name, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{margin_name}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_report():
    doc = Document()

    # Set page margins (0.75 inch all sides)
    for section in doc.sections:
        section.top_margin = Inches(0.75)
        section.bottom_margin = Inches(0.75)
        section.left_margin = Inches(0.75)
        section.right_margin = Inches(0.75)

    # Document Header Title
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title_p.add_run("BÁO CÁO THỰC HÀNH BUỔI 7 — BOOKSTORE")
    title_run.font.name = "Calibri"
    title_run.font.size = Pt(20)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(11, 31, 92) # Navy #0B1F5C

    subtitle_p = doc.add_paragraph()
    subtitle_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle_run = subtitle_p.add_run("Điều hướng 2 tầng, Redux Toolkit, Tích hợp API json-server & Tìm kiếm Debounce")
    subtitle_run.font.name = "Calibri"
    subtitle_run.font.size = Pt(13)
    subtitle_run.font.italic = True
    subtitle_run.font.color.rgb = RGBColor(59, 63, 216) # Indigo #3B3FD8

    # Student Info Box (Table)
    info_table = doc.add_table(rows=3, cols=2)
    info_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    info_table.autofit = False

    data = [
        ("Sinh viên thực hiện:", "Trần Thiện Bảo — MSSV: 23690781"),
        ("Môn học / Lớp:", "Thực hành Lập trình Thiết bị Di động (React Native & TypeScript)"),
        ("Công nghệ sử dụng:", "React Native, Expo Web, Redux Toolkit, Axios, json-server, TypeScript"),
    ]

    for i, (col1, col2) in enumerate(data):
        row = info_table.rows[i]
        
        c0 = row.cells[0]
        c0.width = Inches(2.2)
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        p0.paragraph_format.space_before = Pt(2)
        r0 = p0.add_run(col1)
        r0.font.bold = True
        r0.font.size = Pt(10.5)
        r0.font.name = "Calibri"
        r0.font.color.rgb = RGBColor(11, 31, 92)

        c1 = row.cells[1]
        c1.width = Inches(4.5)
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        r1 = p1.add_run(col2)
        r1.font.size = Pt(10.5)
        r1.font.name = "Calibri"

        # Style cells with light background and clean padding
        shading = parse_xml(r'<w:shd {} w:fill="F4F6FB"/>'.format(nsdecls('w')))
        c0._tc.get_or_add_tcPr().append(shading)
        shading2 = parse_xml(r'<w:shd {} w:fill="F4F6FB"/>'.format(nsdecls('w')))
        c1._tc.get_or_add_tcPr().append(shading2)
        set_cell_margins(c0, 60, 60, 100, 100)
        set_cell_margins(c1, 60, 60, 100, 100)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # Exercises list
    exercises = [
        {
            "id": "7.1",
            "title": "Bài 7.1: Điều hướng 2 tầng & Tab Bar tự dựng (CustomTabBar, TabNavigator, RootNavigator)",
            "desc": "Xây dựng hệ thống điều hướng 2 tầng cho ứng dụng BookStore: tầng ngoài là Native Stack Navigator (RootNavigator) quản lý Tabs, BookDetail, Checkout; tầng trong là Bottom Tab Navigator (TabNavigator) với 4 tab (Home, Categories, Cart, Account). Triển khai CustomTabBar tự dựng sử dụng các icon emoji (🏠, 🗂️, 🛒, 👤) và hiển thị badge số lượng sách trong giỏ hàng.",
            "img": "screenshot_bt7_1.png",
            "expl": "Thanh Tab Bar tự dựng ở cạnh dưới hiển thị đầy đủ 4 tab kèm biểu tượng emoji và số lượng badge giỏ hàng. Tab 'Trang chủ' được active nổi bật, cho phép chuyển đổi mượt mà giữa các màn hình trong ứng dụng."
        },
        {
            "id": "7.2",
            "title": "Bài 7.2: Truyền tham số giữa các màn hình (HomeScreen -> BookDetail, CartScreen -> Checkout)",
            "desc": "Thực hiện truyền tham số có kiểm tra kiểu dữ liệu TypeScript giữa các màn hình: truyền { bookId: number } từ HomeScreen sang màn hình BookDetail khi người dùng nhấn vào thẻ sách; truyền { total: number } từ CartScreen sang màn hình Checkout khi nhấn nút 'Thanh toán'.",
            "img": "screenshot_bt7_2.png",
            "expl": "Khi nhấn chọn sách 'Nhà Giả Kim' từ màn hình chính, HomeScreen truyền thành công tham số bookId: 1 sang BookDetailScreen để tải và hiển thị chi tiết tên sách, tác giả, giá tiền (79.000 đ) và mô tả tương ứng."
        },
        {
            "id": "7.3",
            "title": "Bài 7.3: Quản lý Giỏ hàng tập trung bằng Redux Toolkit (cartSlice, useCart)",
            "desc": "Tạo cartSlice quản lý trạng thái giỏ hàng toàn cục gồm các reducers addItem, removeItem, setQuantity, clearCart. Xây dựng custom hook useCart tính toán totalQuantity và totalPrice bằng useMemo. Đồng bộ số lượng hiển thị lên nút giỏ hàng nổi FloatingCartButton, badge trên CustomTabBar và màn hình CartScreen.",
            "img": "screenshot_bt7_3.png",
            "expl": "Màn hình Giỏ hàng quản lý trạng thái qua Redux Toolkit, cho phép cập nhật số lượng sách chính xác theo tồn kho (10 cuốn, tổng 790.000 đ) và đồng bộ tức thì số lượng lên huy hiệu badge tab giỏ hàng."
        },
        {
            "id": "7.4",
            "title": "Bài 7.4: Quản lý Phiên đăng nhập Tài khoản (authSlice, useAuth, AccountScreen)",
            "desc": "Tạo authSlice quản lý phiên người dùng (user, token). Xây dựng custom hook useAuth trả về trạng thái isLoggedIn. Màn hình AccountScreen hiển thị giao diện động: khi chưa đăng nhập có nút 'Đăng nhập thử'; khi đã đăng nhập hiển thị thông tin thẻ hội viên (Học viên Demo, demo@bookstore.vn), mã thẻ #BK-1 và nút 'Đăng xuất'.",
            "img": "screenshot_bt7_4.png",
            "expl": "Màn hình Tài khoản phản hồi theo state authSlice: sau khi đăng nhập giả lập thành công, giao diện hiển thị đầy đủ thông tin thành viên, email, mã thẻ và nút đăng xuất xóa sạch phiên trong Redux."
        },
        {
            "id": "7.5",
            "title": "Bài 7.5: Tải danh sách sách từ API json-server (bookService, HomeScreen, BookDetailScreen)",
            "desc": "Cấu hình Axios client và xây dựng bookService với getBooks(params) và getBookById(id) kết nối đến json-server (cổng 3000). Màn hình HomeScreen gọi API lấy danh sách 12 cuốn sách, hiển thị trạng thái LoadingView, ErrorView (có nút thử lại) và lưới sách BookGrid khi tải thành công.",
            "img": "screenshot_bt7_5.png",
            "expl": "Dữ liệu sách được gọi bất đồng bộ từ REST API GET /books của json-server và hiển thị dạng lưới sách BookGrid trực quan, kèm xử lý trạng thái đang tải (Loading) và bắt lỗi (Error) đầy đủ."
        },
        {
            "id": "7.6",
            "title": "Bài 7.6: Tải danh mục từ API json-server (categoryService, CategoriesScreen)",
            "desc": "Xây dựng categoryService với hàm getCategories() gọi endpoint GET /categories từ json-server. Màn hình CategoriesScreen hiển thị danh sách 5 danh mục (Văn học, Kinh tế, Lập trình, Thiếu nhi, Khoa học) kèm số lượng sách và emoji đại diện; khi chọn một danh mục sẽ điều hướng về HomeScreen lọc theo danh mục đó.",
            "img": "screenshot_bt7_6.png",
            "expl": "Màn hình Danh mục tải dữ liệu thực tế từ API GET /categories, hiển thị 5 danh mục trực quan kèm số lượng sách tương ứng và hỗ trợ nhấn chọn để chuyển sang màn hình chính lọc theo danh mục."
        },
        {
            "id": "7.7",
            "title": "Bài 7.7: Tìm kiếm Sách với kỹ thuật Debounce và Chuẩn hóa tiếng Việt (useDebounce, filters.ts)",
            "desc": "Tạo custom hook useDebounce trì hoãn 400ms để tối ưu hiệu năng tìm kiếm, tránh re-render liên tục. Xây dựng hàm normalize loại bỏ dấu tiếng Việt và chuyển chữ thường trong filters.ts. Tích hợp SearchBar trên HomeScreen cho phép gõ từ khóa không dấu tìm kiếm chính xác cả tiêu đề và tác giả.",
            "img": "screenshot_bt7_7.png",
            "expl": "Khi người dùng nhập từ khóa không dấu 'nha gia', hook useDebounce trì hoãn 400ms và hàm lọc chuẩn hóa tiếng Việt lọc chính xác cuốn sách 'Nhà Giả Kim' của Paulo Coelho mà không gây giật lag giao diện."
        },
        {
            "id": "7.8",
            "title": "Bài 7.8: Lọc kết hợp Danh mục và Từ khóa (filters.ts, HomeScreen)",
            "desc": "Nâng cấp hàm filterBooks thực hiện lọc kết hợp đa tiêu chí (AND logic) giữa từ khóa tìm kiếm (đã debounce) và danh mục được chọn (hỗ trợ nhận categoryId từ route.params khi chuyển từ CategoriesScreen). Hiển thị nút '✕ Xóa bộ lọc' khi có điều kiện lọc đang kích hoạt và hiển thị EmptyState khi không tìm thấy kết quả.",
            "img": "screenshot_bt7_8.png",
            "expl": "Chức năng lọc kết hợp đồng thời danh mục 'Lập trình' và từ khóa tìm kiếm 'react', lọc chính xác cuốn 'React Native in Action', đồng thời hiển thị nút '✕ Xóa bộ lọc' để người dùng đặt lại toàn bộ bộ lọc nhanh chóng."
        },
        {
            "id": "BT7.C1",
            "title": "Thử thách cộng điểm BT7.C1: Danh sách Yêu thích Wishlist với Redux Toolkit (wishlistSlice, BookDetailScreen)",
            "desc": "Tạo wishlistSlice quản lý danh sách mã sách yêu thích bookIds: number[] với reducer toggleWishlist(bookId). Tại BookDetailScreen, gắn nút biểu tượng trái tim: hiển thị màu đỏ '♥ Đã thích' nếu sách nằm trong Wishlist và màu xám '♡ Thêm vào yêu thích' nếu chưa, lưu trữ trạng thái đồng bộ toàn app.",
            "img": "screenshot_bt7_c1.png",
            "expl": "Tại trang chi tiết sách, nút yêu thích kết nối với wishlistSlice: khi người dùng bấm chọn, trạng thái lập tức chuyển sang nút đỏ '♥ Đã thích' và cập nhật mã sách vào danh sách Wishlist toàn cục."
        },
        {
            "id": "BT7.C2",
            "title": "Thử thách cộng điểm BT7.C2: Lọc khoảng giá kết hợp (PriceFilter, filters.ts, HomeScreen)",
            "desc": "Mở rộng bộ lọc BookFilter với thuộc tính priceRange gồm 3 mức: 'Dưới 100k' (< 100.000 đ), '100k - 300k' (100.000 đ - 300.000 đ), 'Trên 300k' (> 300.000 đ). Tạo component PriceFilter trên HomeScreen và tích hợp điều kiện kiểm tra giá vào logic lọc đa tầng của hàm filterBooks.",
            "img": "screenshot_bt7_c2.png",
            "expl": "Khi chọn chip khoảng giá 'Dưới 100k', hàm filterBooks áp dụng điều kiện kết hợp lọc ra danh sách các cuốn sách có giá dưới 100.000 đ (như Đắc Nhân Tâm 86k, Nhà Giả Kim 79k, Dế Mèn Phiêu Lưu Ký 55k...)."
        }
    ]

    for item in exercises:
        # Heading
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(14)
        h.paragraph_format.space_after = Pt(4)
        h.paragraph_format.keep_with_next = True
        hrun = h.add_run(item["title"])
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(13)
        hrun.font.bold = True
        hrun.font.color.rgb = RGBColor(11, 31, 92)

        # De bai
        p_desc = doc.add_paragraph()
        p_desc.paragraph_format.space_before = Pt(0)
        p_desc.paragraph_format.space_after = Pt(6)
        p_desc.paragraph_format.line_spacing = 1.15
        r_desc_label = p_desc.add_run("Đề bài: ")
        r_desc_label.font.name = "Calibri"
        r_desc_label.font.bold = True
        r_desc_label.font.size = Pt(11)
        r_desc = p_desc.add_run(item["desc"])
        r_desc.font.name = "Calibri"
        r_desc.font.size = Pt(11)

        # Image (Screenshot)
        img_path = os.path.abspath(item["img"])
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(4)
            p_img.paragraph_format.space_after = Pt(4)
            p_img.paragraph_format.keep_with_next = True
            run_img = p_img.add_run()
            # 6.5 inches fits standard A4 with 0.75 margins (8.5 - 1.5 = 7.0 max width)
            run_img.add_picture(img_path, width=Inches(6.6))
        else:
            p_err = doc.add_paragraph()
            p_err.add_run(f"[Hình ảnh không tìm thấy: {item['img']}]").font.color.rgb = RGBColor(255, 0, 0)

        # Giai thich
        p_expl = doc.add_paragraph()
        p_expl.paragraph_format.space_before = Pt(4)
        p_expl.paragraph_format.space_after = Pt(12)
        p_expl.paragraph_format.line_spacing = 1.15
        r_expl_label = p_expl.add_run("Minh chứng & Giải thích: ")
        r_expl_label.font.name = "Calibri"
        r_expl_label.font.bold = True
        r_expl_label.font.size = Pt(11)
        r_expl_label.font.color.rgb = RGBColor(59, 63, 216)
        r_expl = p_expl.add_run(item["expl"])
        r_expl.font.name = "Calibri"
        r_expl.font.size = Pt(11)

    output_path = os.path.abspath("BaoCao_MinhChung_Buoi7.docx")
    doc.save(output_path)
    print(f"Created: {output_path} ({os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    create_report()

