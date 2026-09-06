function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

async function runTask(): Promise<void> {
  const result = await simulateTask(2000);
  console.log(result);
}

runTask();

export {};
