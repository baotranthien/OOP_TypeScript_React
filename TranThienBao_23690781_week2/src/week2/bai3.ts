export function rejectWithError(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

rejectWithError()
  .then((data) => {
    console.log(data);
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
