abstract class Appliance {
  abstract turnOn(): void;
}

class Fan extends Appliance {
  turnOn(): void {
    console.log("Fan is on");
  }
}

class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Air conditioner is on");
  }
}

new Fan().turnOn();
new AirConditioner().turnOn();

export {};
