class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const repository = new Repository<string>();
repository.add("First item");
repository.add("Second item");
console.log(repository.getAll());

export {};
