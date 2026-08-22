class Product {
  constructor(public name: string, public price: number) {}
}

const products = [
  new Product("Keyboard", 80),
  new Product("Monitor", 150),
  new Product("Laptop", 900),
];

const expensiveProducts = products.filter((product) => product.price > 100);
console.log(expensiveProducts);

export {};
