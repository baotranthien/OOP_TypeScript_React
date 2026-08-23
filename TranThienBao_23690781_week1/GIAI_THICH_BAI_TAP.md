# HƯỚNG DẪN CHI TIẾT CÁC BƯỚC LÀM BÀI TẬP TYPESCRIPT OOP (BÀI 1 - 30)

Tài liệu này giải thích chi tiết các bước thực hiện và tư duy lập trình hướng đối tượng (OOP) cho từng bài từ Bài 1 đến Bài 30.

---

## 📑 BÀI 1: Khởi tạo Class cơ bản (`bai1.ts`)
* Kiến thức cốt lõi: Khai báo class, constructor parameter properties, method trong class.
* Các bước thực hiện:
  - Bước 1: Khai báo class `Person`.
  - Bước 2: Trong constructor, sử dụng parameter properties với từ khóa `public` (`public name: string, public age: number`) để TypeScript tự động tạo và gán giá trị cho 2 thuộc tính này.
  - Bước 3: Định nghĩa phương thức `displayInfo(): void` để in ra chuỗi thông tin gồm tên và tuổi bằng cú pháp template literal (`` `Name: ${this.name}, Age: ${this.age}` ``).
  - Bước 4: Khởi tạo một đối tượng (instance) từ class: `const person = new Person("Bao", 20);`.
  - Bước 5: Gọi phương thức `person.displayInfo()` để kiểm tra kết quả.

---

## 📑 BÀI 2: Kế thừa cơ bản (Inheritance) (`bai2.ts`)
* Kiến thức cốt lõi: Kế thừa (`extends`), hàm khởi tạo lớp con (`super`).
* Các bước thực hiện:
  - Bước 1: Khai báo lớp cha `Person` có constructor nhận `name` và `age`.
  - Bước 2: Khai báo lớp con `Student` kế thừa `Person` bằng từ khóa `extends Person`.
  - Bước 3: Trong constructor của `Student`, nhận 3 tham số: `name`, `age` và `public grade: string`.
  - Bước 4: Gọi `super(name, age)` ở dòng đầu tiên của constructor để truyền giá trị lên constructor của lớp cha `Person`.
  - Bước 5: Định nghĩa phương thức `displayAllInfo(): void` trong `Student` để in cả 3 thuộc tính (`name`, `age`, `grade`).
  - Bước 6: Tạo đối tượng `Student` và gọi `displayAllInfo()`.

---

## 📑 BÀI 3: Class thông tin Xe (`bai3.ts`)
* Kiến thức cốt lõi: Định nghĩa thuộc tính xe hơi và phương thức hiển thị.
* Các bước thực hiện:
  - Bước 1: Tạo class `Car`.
  - Bước 2: Khai báo constructor nhận các thuộc tính công khai: `brand` (hãng xe), `model` (dòng xe), `year` (năm sản xuất).
  - Bước 3: Viết phương thức `showInfo(): void` in thông tin xe theo định dạng: `${this.year} ${this.brand} ${this.model}`.
  - Bước 4: Khởi tạo instance với dữ liệu mẫu (ví dụ: `"Toyota"`, `"Camry"`, `2024`) và gọi `showInfo()`.

---

## 📑 BÀI 4: Tính diện tích và chu vi Hình chữ nhật (`bai4.ts`)
* Kiến thức cốt lõi: Các phương thức tính toán và trả về giá trị kiểu số (`number`).
* Các bước thực hiện:
  - Bước 1: Khởi tạo class `Rectangle` với constructor nhận `width` (chiều rộng) và `height` (chiều cao).
  - Bước 2: Viết phương thức `area(): number` trả về công thức tính diện tích: `this.width * this.height`.
  - Bước 3: Viết phương thức `perimeter(): number` trả về công thức chu vi: `2 * (this.width + this.height)`.
  - Bước 4: Khởi tạo một hình chữ nhật với kích thước cụ thể và in kết quả trả về của 2 hàm tính toán.

---

## 📑 BÀI 5: Tài khoản ngân hàng (Nạp / Rút tiền) (`bai5.ts`)
* Kiến thức cốt lõi: Quản lý trạng thái thuộc tính (state) và kiểm tra điều kiện logic.
* Các bước thực hiện:
  - Bước 1: Khai báo class `BankAccount` có thuộc tính `balance` với giá trị mặc định là 0 (`balance: number = 0`).
  - Bước 2: Viết phương thức `deposit(amount: number): void` cộng dồn số tiền gửi vào `balance`: `this.balance += amount`.
  - Bước 3: Viết phương thức `withdraw(amount: number): void` kiểm tra: nếu `amount <= this.balance` thì trừ tiền (`this.balance -= amount`), ngược lại in thông báo lỗi không đủ tiền.
  - Bước 4: Tạo tài khoản, thử nạp tiền, rút tiền và in số dư còn lại.

---

## 📑 BÀI 6: Quản lý Sách (`bai6.ts`)
* Kiến thức cốt lõi: Mô hình hóa đối tượng sách với thông tin tác giả, năm xuất bản.
* Các bước thực hiện:
  - Bước 1: Tạo class `Book`.
  - Bước 2: Constructor nhận 3 tham số: `title: string` (tên sách), `author: string` (tác giả), `year: number` (năm phát hành).
  - Bước 3: Định nghĩa hàm `showInfo(): void` để in ra chuỗi mô tả thông tin sách.
  - Bước 4: Tạo một cuốn sách và gọi hàm `showInfo()`.

---

## 📑 BÀI 7: Đóng gói với Getter và Setter (`bai7.ts`)
* Kiến thức cốt lõi: Tính đóng gói (Encapsulation), thuộc tính `private`, truy cập qua `get` và `set`.
* Các bước thực hiện:
  - Bước 1: Khai báo class `User` với thuộc tính ẩn `private userName: string`.
  - Bước 2: Trong constructor, gán giá trị truyền vào cho `this.userName`.
  - Bước 3: Viết getter `get name(): string` để cho phép đọc giá trị `this.userName`.
  - Bước 4: Viết setter `set name(newName: string)` để cho phép cập nhật lại `this.userName`.
  - Bước 5: Thử truy cập đọc `user.name` và gán lại giá trị mới `user.name = "..."`.

---

## 📑 BÀI 8: Lọc danh sách Sản phẩm (`bai8.ts`)
* Kiến thức cốt lõi: Quản lý mảng đối tượng và hàm xử lý mảng `filter`.
* Các bước thực hiện:
  - Bước 1: Định nghĩa class `Product` gồm `name: string` và `price: number`.
  - Bước 2: Khởi tạo một mảng gồm nhiều đối tượng `Product` với các mức giá khác nhau.
  - Bước 3: Sử dụng hàm `products.filter(...)` với điều kiện `product.price > 100` để lọc ra danh sách các sản phẩm có giá lớn hơn 100.
  - Bước 4: In mảng kết quả ra màn hình.

---

## 📑 BÀI 9: Hiện thực Interface Động vật (`bai9.ts`)
* Kiến thức cốt lõi: Khai báo `interface` và implements vào class.
* Các bước thực hiện:
  - Bước 1: Định nghĩa `interface Animal` quy định cấu trúc gồm thuộc tính `name: string` và phương thức `sound(): void`.
  - Bước 2: Khai báo class `Dog implements Animal`.
  - Bước 3: Bắt buộc hiện thực đầy đủ thuộc tính `name` trong constructor và viết nội dung cho phương thức `sound()` (in tiếng sủa).
  - Bước 4: Tạo đối tượng `Dog` và gọi phương thức `sound()`.

---

## 📑 BÀI 10: Phạm vi truy cập Access Modifiers (`bai10.ts`)
* Kiến thức cốt lõi: Phân biệt `public`, `private`, và `readonly`.
* Các bước thực hiện:
  - Bước 1: Tạo class `Account` với 3 thuộc tính có phạm vi khác nhau:
     - `public owner: string` (ai cũng có thể đọc/ghi).
     - `private password: string` (chỉ truy cập nội bộ trong class).
     - `readonly accountNumber: string` (chỉ đọc, không thể sửa sau khi gán).
  - Bước 2: Khởi tạo các thuộc tính qua constructor.
  - Bước 3: Tạo phương thức `checkPassword(password: string): boolean` để so khớp mật khẩu mà không làm lộ trực tiếp biến `private`.
  - Bước 4: Khởi tạo tài khoản, đọc các trường công khai và kiểm tra hàm xác thực mật khẩu.

---

## 📑 BÀI 11: Đa thừa kế cùng một lớp cha (`bai11.ts`)
* Kiến thức cốt lõi: Kế thừa phân cấp (Hierarchical Inheritance).
* Các bước thực hiện:
  - Bước 1: Tạo lớp cha `Animal` nhận thuộc tính `name`.
  - Bước 2: Tạo lớp con `Dog extends Animal` bổ sung phương thức riêng `bark(): void`.
  - Bước 3: Tạo lớp con `Cat extends Animal` bổ sung phương thức riêng `meow(): void`.
  - Bước 4: Cả hai lớp con đều tự động kế thừa thuộc tính `name` từ `Animal` và sử dụng trong phương thức riêng của mình.
  - Bước 5: Khởi tạo instance của `Dog` và `Cat` rồi gọi các phương thức tương ứng.

---

## 📑 BÀI 12: Đa Interface (Multiple Interfaces) (`bai12.ts`)
* Kiến thức cốt lõi: Thiết kế giao diện hành vi độc lập (Interface Segregation).
* Các bước thực hiện:
  - Bước 1: Khai báo interface `Flyable` chứa hàm `fly(): void`.
  - Bước 2: Khai báo interface `Swimmable` chứa hàm `swim(): void`.
  - Bước 3: Tạo class `Bird implements Flyable` và hiện thực hàm `fly()`.
  - Bước 4: Tạo class `Fish implements Swimmable` và hiện thực hàm `swim()`.
  - Bước 5: Khởi tạo đối tượng `Bird` và `Fish`, thực thi các hành vi bay và bơi.

---

## 📑 BÀI 13: Lớp trừu tượng (Abstract Class) Hình học (`bai13.ts`)
* Kiến thức cốt lõi: `abstract class` và `abstract method`.
* Các bước thực hiện:
  - Bước 1: Khai báo `abstract class Shape` chứa phương thức trừu tượng `abstract area(): number` (không có thân hàm).
  - Bước 2: Tạo class `Square extends Shape`, constructor nhận `side` và hiện thực hàm `area()` trả về `side * side`.
  - Bước 3: Tạo class `Circle extends Shape`, constructor nhận `radius` và hiện thực hàm `area()` trả về `Math.PI * radius * radius`.
  - Bước 4: Khởi tạo các đối tượng hình vuông và hình tròn rồi in ra diện tích tính được.

---

## 📑 BÀI 14: Phân cấp Nhân viên (`bai14.ts`)
* Kiến thức cốt lõi: Kế thừa để phân tách vai trò nghiệp vụ.
* Các bước thực hiện:
  - Bước 1: Tạo lớp cha `Employee` lưu trữ tên nhân viên `name`.
  - Bước 2: Tạo lớp con `Manager extends Employee` có phương thức quản lý `manage(): void`.
  - Bước 3: Tạo lớp con `Developer extends Employee` có phương thức lập trình `code(): void`.
  - Bước 4: Khởi tạo các nhân sự theo từng vai trò và gọi hàm tương ứng.

---

## 📑 BÀI 15: Quan hệ Chứa (Composition / Aggregation) Thư viện (`bai15.ts`)
* Kiến thức cốt lõi: Quản lý quan hệ giữa nhiều class độc lập tập hợp lại trong một class quản lý.
* Các bước thực hiện:
  - Bước 1: Tạo class `Book` (chứa `title`) và class `User` (chứa `name`).
  - Bước 2: Tạo class `Library` chứa 2 mảng: `books: Book[] = []` và `users: User[] = []`.
  - Bước 3: Viết phương thức `addBook(book: Book): void` thêm sách vào danh sách thư viện.
  - Bước 4: Viết phương thức `addUser(user: User): void` thêm người dùng vào danh sách.
  - Bước 5: Khởi tạo thư viện, thêm dữ liệu và in danh sách `books`, `users`.

---

## 📑 BÀI 16: Generic Class cơ bản (`bai16.ts`)
* Kiến thức cốt lõi: Tham số kiểu chung (Generics `<T>`).
* Các bước thực hiện:
  - Bước 1: Định nghĩa class `Box<T>` với thuộc tính `value` có kiểu là `T`.
  - Bước 2: Viết phương thức `getValue(): T` trả về giá trị kiểu `T`.
  - Bước 3: Khởi tạo một hộp chứa số: `new Box<number>(100)`.
  - Bước 4: Khởi tạo một hộp chứa chuỗi: `new Box<string>("Hello")`.
  - Bước 5: Gọi `getValue()` trên cả 2 hộp để thấy tính linh hoạt tái sử dụng code của Generic.

---

## 📑 BÀI 17: Singleton Design Pattern (`bai17.ts`)
* Kiến thức cốt lõi: Mẫu thiết kế Singleton chỉ cho phép tạo đúng một instance duy nhất.
* Các bước thực hiện:
  - Bước 1: Khai báo class `Logger`.
  - Bước 2: Khai báo biến tĩnh riêng tư để giữ thể hiện duy nhất: `private static instance: Logger`.
  - Bước 3: Khóa constructor bằng `private constructor() {}` để ngăn không cho bên ngoài dùng từ khóa `new Logger()`.
  - Bước 4: Viết phương thức tĩnh `static getInstance(): Logger`: nếu chưa có `instance` thì khởi tạo mới, nếu có rồi thì trả về `instance` cũ.
  - Bước 5: Thêm phương thức ghi log `log(message: string): void`.
  - Bước 6: Lấy instance qua `Logger.getInstance()` và gọi hàm `log()`.

---

## 📑 BÀI 18: Các phương thức tĩnh (Static Methods) (`bai18.ts`)
* Kiến thức cốt lõi: Phương thức tĩnh thuộc về class thay vì thuộc về instance của class.
* Các bước thực hiện:
  - Bước 1: Tạo class tiện ích `MathUtil`.
  - Bước 2: Định nghĩa các hàm tĩnh: `static add`, `static subtract`, `static multiply`.
  - Bước 3: Định nghĩa hàm `static divide(a: number, b: number)` có kiểm tra `if (b === 0)` để ném lỗi `throw new Error("Cannot divide by zero")`.
  - Bước 4: Gọi trực tiếp qua tên lớp: `MathUtil.add(5, 2)`, `MathUtil.divide(10, 2)` mà không cần khởi tạo `new MathUtil()`.

---

## 📑 BÀI 19: Tính Đa hình (Polymorphism & Method Overriding) (`bai19.ts`)
* Kiến thức cốt lõi: Ghi đè phương thức (`override`) và xử lý mảng đa hình.
* Các bước thực hiện:
  - Bước 1: Tạo lớp cha `Animal` có hàm `makeSound(): void`.
  - Bước 2: Tạo các lớp con `Dog` và `Cat` kế thừa `Animal` và dùng từ khóa `override makeSound()` để viết lại tiếng kêu riêng của từng loài.
  - Bước 3: Tạo mảng đa hình `animals: Animal[] = [new Dog(), new Cat()]`.
  - Bước 4: Dùng vòng lặp `forEach` duyệt qua mảng và gọi `makeSound()`, mỗi đối tượng sẽ tự phát ra âm thanh tương ứng với lớp thực tế của nó.

---

## 📑 BÀI 20: Interface cho Phương tiện di chuyển (`bai20.ts`)
* Kiến thức cốt lõi: Thiết kế hợp đồng hành vi khởi động / dừng xe.
* Các bước thực hiện:
  - Bước 1: Khai báo `interface Vehicle` gồm 2 hàm `start(): void` và `stop(): void`.
  - Bước 2: Tạo class `Car implements Vehicle` và cài đặt 2 hàm `start`, `stop`.
  - Bước 3: Tạo class `Bike implements Vehicle` và cài đặt 2 hàm `start`, `stop`.
  - Bước 4: Khởi tạo và gọi phương thức trên từng loại xe.

---

## 📑 BÀI 21: Generic Repository (`bai21.ts`)
* Kiến thức cốt lõi: Lớp generic quản lý tập hợp dữ liệu bất kỳ.
* Các bước thực hiện:
  - Bước 1: Khai báo class `Repository<T>` với mảng dữ liệu nội bộ `private items: T[] = []`.
  - Bước 2: Viết phương thức `add(item: T): void` để đẩy một phần tử mới vào mảng.
  - Bước 3: Viết phương thức `getAll(): T[]` trả về toàn bộ mảng `items`.
  - Bước 4: Khởi tạo repository kiểu chuỗi `new Repository<string>()`, thêm phần tử và lấy danh sách ra xem.

---

## 📑 BÀI 22: Cấu trúc dữ liệu Ngăn xếp Generic (Stack) (`bai22.ts`)
* Kiến thức cốt lõi: Hiện thực nguyên lý LIFO (Last In First Out) với kiểu Generic.
* Các bước thực hiện:
  - Bước 1: Khai báo class `Stack<T>` với mảng lưu trữ phần tử `private items: T[] = []`.
  - Bước 2: Viết hàm `push(item: T): void` thêm phần tử vào đỉnh ngăn xếp.
  - Bước 3: Viết hàm `pop(): T | undefined` lấy và xóa phần tử ở đỉnh ngăn xếp ra (`items.pop()`).
  - Bước 4: Viết hàm `peek(): T | undefined` xem phần tử ở đỉnh mà không xóa (`items[items.length - 1]`).
  - Bước 5: Viết hàm `isEmpty(): boolean` kiểm tra ngăn xếp có rỗng không (`items.length === 0`).
  - Bước 6: Tạo `Stack<number>`, đẩy các số vào và kiểm tra `peek`, `pop`, `isEmpty`.

---

## 📑 BÀI 23: Interface Thanh toán (Strategy Pattern) (`bai23.ts`)
* Kiến thức cốt lõi: Tính linh hoạt trong việc thay đổi thuật toán / phương thức thanh toán.
* Các bước thực hiện:
  - Bước 1: Tạo `interface Payment` với phương thức `pay(amount: number): void`.
  - Bước 2: Tạo class `CashPayment implements Payment` in thông báo thanh toán bằng tiền mặt.
  - Bước 3: Tạo class `CardPayment implements Payment` in thông báo thanh toán bằng thẻ.
  - Bước 4: Khởi tạo và gọi hàm `pay(...)` cho từng hình thức thanh toán.

---

## 📑 BÀI 24: Abstract Class Thiết bị gia dụng (`bai24.ts`)
* Kiến thức cốt lõi: Kế thừa từ lớp trừu tượng đại diện cho thiết bị điện.
* Các bước thực hiện:
  - Bước 1: Định nghĩa `abstract class Appliance` có phương thức trừu tượng `abstract turnOn(): void`.
  - Bước 2: Tạo class `Fan extends Appliance` hiện thực hàm `turnOn()` (bật quạt).
  - Bước 3: Tạo class `AirConditioner extends Appliance` hiện thực hàm `turnOn()` (bật máy lạnh).
  - Bước 4: Khởi tạo và gọi lệnh bật thiết bị cho cả hai.

---

## 📑 BÀI 25: Static Method miêu tả Hình học (`bai25.ts`)
* Kiến thức cốt lõi: Phương thức tĩnh độc lập cung cấp thông tin chung.
* Các bước thực hiện:
  - Bước 1: Tạo class `Shape`.
  - Bước 2: Định nghĩa phương thức tĩnh `static describe(): void` in ra định nghĩa chung về hình học.
  - Bước 3: Gọi trực tiếp `Shape.describe()`.

---

## 📑 BÀI 26: Tính tổng tiền Đơn hàng (Order) (`bai26.ts`)
* Kiến thức cốt lõi: Tính toán tổng hợp từ danh sách đối tượng bằng `reduce`.
* Các bước thực hiện:
  - Bước 1: Tạo class `Product` gồm `name` và `price`.
  - Bước 2: Tạo class `Order` có thuộc tính `products: Product[] = []`.
  - Bước 3: Viết phương thức `calculateTotal(): number` sử dụng hàm `this.products.reduce((total, product) => total + product.price, 0)` để cộng dồn giá tiền tất cả sản phẩm.
  - Bước 4: Tạo một đơn hàng gồm nhiều sản phẩm và in tổng tiền `calculateTotal()`.

---

## 📑 BÀI 27: Kế thừa Giáo viên (Teacher extends Person) (`bai27.ts`)
* Kiến thức cốt lõi: Mở rộng lớp người với môn học giảng dạy.
* Các bước thực hiện:
  - Bước 1: Tạo lớp cha `Person` nhận `name` và `age`.
  - Bước 2: Tạo lớp con `Teacher extends Person`, constructor nhận `name`, `age` và `public subject: string`.
  - Bước 3: Trong constructor gọi `super(name, age)`.
  - Bước 4: Định nghĩa phương thức `introduce(): void` để giáo viên tự giới thiệu tên và môn học giảng dạy.
  - Bước 5: Khởi tạo một giáo viên và gọi hàm `introduce()`.

---

## 📑 BÀI 28: Phạm vi truy cập protected (`bai28.ts`)
* Kiến thức cốt lõi: Thuộc tính/phương thức `protected` cho phép lớp con truy cập và ghi đè nhưng giấu kín với bên ngoài.
* Các bước thực hiện:
  - Bước 1: Khai báo class `Animal` có phương thức `protected makeSound(): void` và phương thức công khai `speak(): void` bên trong gọi `this.makeSound()`.
  - Bước 2: Tạo lớp con `Dog extends Animal` ghi đè `protected override makeSound()` phát ra tiếng sủa `"Woof"`.
  - Bước 3: Tạo lớp con `Cat extends Animal` ghi đè `protected override makeSound()` phát ra tiếng kêu `"Meow"`.
  - Bước 4: Bên ngoài chỉ gọi được hàm công khai `speak()`, hàm `speak()` sẽ tự kích hoạt `makeSound()` tương ứng của từng lớp con.

---

## 📑 BÀI 29: Interface Di chuyển (Movable) (`bai29.ts`)
* Kiến thức cốt lõi: Giao diện hành vi dùng chung cho các đối tượng khác biệt về bản chất.
* Các bước thực hiện:
  - Bước 1: Khai báo `interface Movable` có phương thức `move(): void`.
  - Bước 2: Cho class `Car implements Movable` và viết logic xe di chuyển.
  - Bước 3: Cho class `Robot implements Movable` và viết logic robot di chuyển.
  - Bước 4: Khởi tạo `Car` và `Robot` rồi gọi hàm `move()` của từng đối tượng.

---

## 📑 BÀI 30: Quản lý Trường học (School Management) (`bai30.ts`)
* Kiến thức cốt lõi: Tổng hợp quan hệ giữa nhiều thực thể trong một hệ thống.
* Các bước thực hiện:
  - Bước 1: Tạo class `Student` (có thuộc tính `name`) và class `Teacher` (có thuộc tính `name`).
  - Bước 2: Tạo class `School` nhận vào 2 danh sách trong constructor: `students: Student[] = []` và `teachers: Teacher[] = []`.
  - Bước 3: Viết phương thức `displayInfo(): void` sử dụng hàm `.map(s => s.name)` để trích xuất và in danh sách tên của tất cả học sinh và giáo viên trong trường.
  - Bước 4: Khởi tạo trường học với danh sách học sinh và giáo viên mẫu, sau đó gọi `displayInfo()` để xem báo cáo thông tin.
