export function filterEvenNumbersAsync(arr: number[]): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((num) => num % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

filterEvenNumbersAsync(numbers).then((evenNumbers) => {
  console.log(evenNumbers);
});
