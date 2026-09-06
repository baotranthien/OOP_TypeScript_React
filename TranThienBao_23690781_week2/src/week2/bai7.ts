function simulateRacer(name: string, delayMs: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${name} (${delayMs}ms)`);
    }, delayMs);
  });
}

const racerA = simulateRacer("A", 1200);
const racerB = simulateRacer("B", 600);
const racerC = simulateRacer("C", 1800);

Promise.race([racerA, racerB, racerC])
  .then((winner) => {
    console.log("Winner:", winner);
  })
  .catch((err: Error) => {
    console.error(err.message);
  });

export {};
