class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number
  ) {}

  showInfo(): void {
    console.log(`${this.year} ${this.brand} ${this.model}`);
  }
}

const car = new Car("Toyota", "Camry", 2024);
car.showInfo();

export {};
