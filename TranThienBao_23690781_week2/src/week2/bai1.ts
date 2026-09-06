const helloAsyncPromise: Promise<string> = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

helloAsyncPromise.then((message) => {
  console.log(message);
});

export {};
