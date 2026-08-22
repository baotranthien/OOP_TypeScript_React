interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("The bird is flying");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("The fish is swimming");
  }
}

new Bird().fly();
new Fish().swim();

export {};
