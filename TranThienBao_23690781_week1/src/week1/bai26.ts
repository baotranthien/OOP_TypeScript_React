class Product {
  constructor(public name: string, public price: number) {}
}

class Order {
  constructor(public products: Product[] = []) {}

  calculateTotal(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}

const order = new Order([
  new Product("Book", 20),
  new Product("Pen", 5),
]);
console.log("Total:", order.calculateTotal());

export {};
