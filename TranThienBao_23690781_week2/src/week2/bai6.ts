function simulateTask(id: number, time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed in ${time}ms`);
    }, time);
  });
}

const p1 = simulateTask(1, 1000);
const p2 = simulateTask(2, 2000);
const p3 = simulateTask(3, 1500);

Promise.all([p1, p2, p3])
  .then((results) => {
    results.forEach((res) => console.log(res));
  })
  .catch((err: Error) => {
    console.error(err.message);
  });

export {};
