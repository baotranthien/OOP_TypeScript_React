export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function callApiMultipleTimes(ids: number[]): Promise<void> {
  try {
    const fetchPromises = ids.map(async (id) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return (await res.json()) as Todo;
    });

    const results = await Promise.all(fetchPromises);
    results.forEach((todo) => {
      console.log(todo);
    });
  } catch (error) {
    console.error((error as Error).message);
  }
}

callApiMultipleTimes([1, 2, 3, 4]);
