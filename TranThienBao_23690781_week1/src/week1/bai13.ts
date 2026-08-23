abstract class Shape {
  abstract area(): number;
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }

  area(): number {
    return this.side * this.side;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

console.log(new Square(4).area());
console.log(new Circle(3).area());

export {};
