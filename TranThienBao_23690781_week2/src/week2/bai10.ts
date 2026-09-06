function runProcess(isSuccess: boolean): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve("Success");
      } else {
        reject(new Error("Failed"));
      }
    }, 1000);
  });
}

runProcess(true)
  .then((res) => console.log(res))
  .catch((err: Error) => console.error(err.message))
  .finally(() => console.log("Done"));

export {};
