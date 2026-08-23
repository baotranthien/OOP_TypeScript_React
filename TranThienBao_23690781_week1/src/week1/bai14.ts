class Employee {
  constructor(public name: string) {}
}

class Manager extends Employee {
  manage(): void {
    console.log(`${this.name} manages the team`);
  }
}

class Developer extends Employee {
  code(): void {
    console.log(`${this.name} writes code`);
  }
}

new Manager("Mai").manage();
new Developer("Nam").code();

export {};
