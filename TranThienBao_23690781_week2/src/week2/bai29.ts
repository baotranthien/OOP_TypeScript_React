export type QueueTask<T> = () => Promise<T>;

export async function queueProcess<T>(tasks: QueueTask<T>[]): Promise<T[]> {
  const results: T[] = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

function createMockTask(name: string, delayMs: number): QueueTask<string> {
  return () =>
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`${name} done`);
      }, delayMs);
    });
}

async function main(): Promise<void> {
  const taskQueue: QueueTask<string>[] = [
    createMockTask("Task 1", 1000),
    createMockTask("Task 2", 800),
    createMockTask("Task 3", 600),
  ];

  const results = await queueProcess(taskQueue);
  console.log(results);
}

main();
