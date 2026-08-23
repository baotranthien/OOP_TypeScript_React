class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number
  ) {}

  showInfo(): void {
    console.log(`${this.title} by ${this.author} (${this.year})`);
  }
}

const book = new Book("The Little Prince", "Antoine de Saint-Exupery", 1943);
book.showInfo();

export {};
