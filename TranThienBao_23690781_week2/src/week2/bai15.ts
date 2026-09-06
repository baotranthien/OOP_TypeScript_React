async function asyncTask(stepName: string, durationMs: number): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, durationMs));
  return `${stepName} done`;
}

async function runSequentially(): Promise<void> {
  const res1 = await asyncTask("Step 1", 1000);
  console.log(res1);
  const res2 = await asyncTask("Step 2", 1000);
  console.log(res2);
  const res3 = await asyncTask("Step 3", 1000);
  console.log(res3);
}

runSequentially();

export {};
