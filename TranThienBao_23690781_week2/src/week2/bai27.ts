export async function fetchWithRetry<T>(url: string, retries: number): Promise<T> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw new Error(`Failed after ${retries} retries: ${(err as Error).message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error("Unable to fetch");
}

async function main(): Promise<void> {
  try {
    const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 2);
    console.log(data);
  } catch (error) {
    console.error((error as Error).message);
  }
}

main();
