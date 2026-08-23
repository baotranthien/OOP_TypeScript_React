interface Movable {
  move(): void;
}

class Car implements Movable {
  move(): void {
    console.log("The car is moving");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("The robot is moving");
  }
}

new Car().move();
new Robot().move();

export {};
