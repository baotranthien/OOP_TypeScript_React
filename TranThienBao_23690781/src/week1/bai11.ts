class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(`${this.name} is meowing`);
  }
}

new Dog("Max").bark();
new Cat("Mimi").meow();

export {};
