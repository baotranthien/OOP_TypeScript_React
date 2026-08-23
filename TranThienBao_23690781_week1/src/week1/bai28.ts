class Animal {
  protected makeSound(): void {
    console.log("Some animal sound");
  }

  speak(): void {
    this.makeSound();
  }
}

class Dog extends Animal {
  protected override makeSound(): void {
    console.log("Woof");
  }
}

class Cat extends Animal {
  protected override makeSound(): void {
    console.log("Meow");
  }
}

new Dog().speak();
new Cat().speak();

export {};
