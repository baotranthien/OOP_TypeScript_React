export function getRandomNumberPromise(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const randomVal = Math.random();
    if (randomVal >= 0.3) {
      resolve(randomVal);
    } else {
      reject(new Error(`Số ngẫu nhiên quá nhỏ (< 0.3): ${randomVal.toFixed(4)}`));
    }
  });
}

getRandomNumberPromise()
  .then((val) => {
    console.log("Success:", val);
  })
  .catch((err: Error) => {
    console.error("Error:", err.message);
  });
