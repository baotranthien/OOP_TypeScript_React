function simulateApiCall(durationMs: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Data received after ${durationMs}ms`);
    }, durationMs);
  });
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 2000): Promise<T> {
  let timer: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

async function main(): Promise<void> {
  try {
    const data = await withTimeout(simulateApiCall(1000), 2000);
    console.log(data);
  } catch (err) {
    console.error((err as Error).message);
  }

  try {
    const data = await withTimeout(simulateApiCall(3000), 2000);
    console.log(data);
  } catch (err) {
    console.error((err as Error).message);
  }
}

main();
