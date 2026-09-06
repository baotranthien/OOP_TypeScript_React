Promise.resolve(2)
  .then((num) => {
    return num * num;
  })
  .then((num) => {
    return num * 2;
  })
  .then((num) => {
    return num + 5;
  })
  .then((finalValue) => {
    console.log(finalValue);
  })
  .catch((err: Error) => {
    console.error(err.message);
  });

export {};
