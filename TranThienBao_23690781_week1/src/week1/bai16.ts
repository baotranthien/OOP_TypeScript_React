class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(100);
const textBox = new Box<string>("Hello");
console.log(numberBox.getValue());
console.log(textBox.getValue());

export {};
