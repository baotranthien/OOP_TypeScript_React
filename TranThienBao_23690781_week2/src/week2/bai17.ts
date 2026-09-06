function createDelayedPromise(name: string, delayMs: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, delayMs);
  });
}

async function iterateWithForAwait(): Promise<void> {
  const promises: Promise<string>[] = [
    createDelayedPromise("Item 1", 1000),
    createDelayedPromise("Item 2", 500),
    createDelayedPromise("Item 3", 1500),
  ];

  for await (const result of promises) {
    console.log(result);
  }
}

iterateWithForAwait();

export {};
