function getHelloAsync(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

async function main(): Promise<void> {
  const result = await getHelloAsync();
  console.log(result);
}

main();

export {};
