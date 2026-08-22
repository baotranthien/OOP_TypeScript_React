class Rectangle {
  constructor(public width: number, public height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rectangle = new Rectangle(5, 3);
console.log("Area:", rectangle.area());
console.log("Perimeter:", rectangle.perimeter());

export {};
