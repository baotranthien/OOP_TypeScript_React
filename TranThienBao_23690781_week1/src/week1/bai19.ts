class Animal {
  makeSound(): void {
    console.log("Some animal sound");
  }
}

class Dog extends Animal {
  override makeSound(): void {
    console.log("Woof");
  }
}

class Cat extends Animal {
  override makeSound(): void {
    console.log("Meow");
  }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach((animal) => animal.makeSound());

export {};
