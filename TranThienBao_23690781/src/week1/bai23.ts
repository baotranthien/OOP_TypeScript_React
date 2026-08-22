interface Payment {
  pay(amount: number): void;
}

class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} with cash`);
  }
}

class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} with card`);
  }
}

new CashPayment().pay(50);
new CardPayment().pay(100);

export {};
