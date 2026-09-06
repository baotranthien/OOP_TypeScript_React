function waitMs(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function simulateFiveSecondWait(): Promise<void> {
  console.log("Start waiting...");
  await waitMs(5000);
  console.log("Wait finished");
}

simulateFiveSecondWait();

export {};
