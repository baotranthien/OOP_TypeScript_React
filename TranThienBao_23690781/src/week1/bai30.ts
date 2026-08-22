class Student {
  constructor(public name: string) {}
}

class Teacher {
  constructor(public name: string) {}
}

class School {
  constructor(
    public students: Student[] = [],
    public teachers: Teacher[] = []
  ) {}

  displayInfo(): void {
    console.log("Students:", this.students.map((student) => student.name));
    console.log("Teachers:", this.teachers.map((teacher) => teacher.name));
  }
}

const school = new School(
  [new Student("Bao"), new Student("Lan")],
  [new Teacher("Mr. Nam")]
);
school.displayInfo();

export {};
