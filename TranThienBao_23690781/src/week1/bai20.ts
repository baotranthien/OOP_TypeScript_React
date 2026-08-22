interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start(): void {
    console.log("Car starts");
  }

  stop(): void {
    console.log("Car stops");
  }
}

class Bike implements Vehicle {
  start(): void {
    console.log("Bike starts");
  }

  stop(): void {
    console.log("Bike stops");
  }
}

new Car().start();
new Bike().stop();

export {};
