interface Animal {
  name: string;
  sound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log(`${this.name} says Woof`);
  }
}

const dog = new Dog("Buddy");
dog.sound();

export {};
