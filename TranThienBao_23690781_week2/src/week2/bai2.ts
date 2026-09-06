export function getNumberTen(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

getNumberTen().then((result) => {
  console.log(result);
});
