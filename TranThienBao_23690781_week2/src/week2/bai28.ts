function simulateBatchTask(taskId: number, timeMs: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${taskId} done`);
    }, timeMs);
  });
}

export async function batchProcess(): Promise<string[]> {
  const tasks: Promise<string>[] = [
    simulateBatchTask(1, 1000),
    simulateBatchTask(2, 600),
    simulateBatchTask(3, 1500),
    simulateBatchTask(4, 800),
    simulateBatchTask(5, 1200),
  ];

  return Promise.all(tasks);
}

async function main(): Promise<void> {
  const results = await batchProcess();
  console.log(results);
}

main();
