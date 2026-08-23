class Account {
  public owner: string;
  private password: string;
  readonly accountNumber: string;

  constructor(owner: string, password: string, accountNumber: string) {
    this.owner = owner;
    this.password = password;
    this.accountNumber = accountNumber;
  }

  checkPassword(password: string): boolean {
    return this.password === password;
  }
}

const account = new Account("Bao", "1234", "A001");
console.log(account.owner, account.accountNumber);
console.log(account.checkPassword("1234"));

export {};
