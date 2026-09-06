export async function multiplyAfterOneSecond(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function main(): Promise<void> {
  const result = await multiplyAfterOneSecond(5);
  console.log(result);
}

main();
