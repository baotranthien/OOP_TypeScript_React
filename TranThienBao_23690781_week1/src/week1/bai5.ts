class BankAccount {
  constructor(public balance: number = 0) {}

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Not enough money");
    }
  }
}

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log("Balance:", account.balance);

export {};
