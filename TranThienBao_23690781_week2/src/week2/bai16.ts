async function asyncTask(id: number, delayMs: number): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return `Task ${id} done`;
}

async function runInParallel(): Promise<void> {
  const results = await Promise.all([
    asyncTask(1, 1000),
    asyncTask(2, 1200),
    asyncTask(3, 800),
  ]);

  console.log(results);
}

runInParallel();

export {};
