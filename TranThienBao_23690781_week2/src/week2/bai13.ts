function fetchSomethingRisky(shouldSucceed: boolean): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Success");
      } else {
        reject(new Error("Something went wrong"));
      }
    }, 1000);
  });
}

async function handleAsyncWithError(): Promise<void> {
  try {
    const data = await fetchSomethingRisky(false);
    console.log(data);
  } catch (error) {
    console.error((error as Error).message);
  }
}

handleAsyncWithError();

export {};
