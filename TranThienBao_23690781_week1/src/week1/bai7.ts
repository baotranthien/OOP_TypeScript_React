class User {
  private userName: string;

  constructor(name: string) {
    this.userName = name;
  }

  get name(): string {
    return this.userName;
  }

  set name(newName: string) {
    this.userName = newName;
  }
}

const user = new User("Bao");
console.log(user.name);

export {};
user.name = "Thien Bao";
console.log(user.name);
