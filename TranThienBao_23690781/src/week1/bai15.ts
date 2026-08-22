class Book {
  constructor(public title: string) {}
}

class User {
  constructor(public name: string) {}
}

class Library {
  books: Book[] = [];
  users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}

const library = new Library();
library.addBook(new Book("TypeScript Basics"));
library.addUser(new User("Bao"));
console.log(library.books, library.users);

export {};
