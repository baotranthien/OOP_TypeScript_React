class Person {
  constructor(public name: string, public age: number) {}
}

class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }

  introduce(): void {
    console.log(`I am ${this.name}. I teach ${this.subject}.`);
  }
}

new Teacher("Ms. Hoa", 30, "Mathematics").introduce();

export {};
