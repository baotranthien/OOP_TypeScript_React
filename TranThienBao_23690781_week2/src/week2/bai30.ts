interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchFromEndpoint(url: string): Promise<Todo> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }
  return (await response.json()) as Todo;
}

async function handleMultipleCalls(): Promise<void> {
  const apiUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/invalid-url-404",
  ];

  const fetchPromises = apiUrls.map((url) => fetchFromEndpoint(url));
  const settledResults = await Promise.allSettled(fetchPromises);

  settledResults.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      console.log(`Success [${apiUrls[idx]}]:`, result.value);
    } else {
      console.log(`Failed [${apiUrls[idx]}]:`, (result.reason as Error).message);
    }
  });
}

handleMultipleCalls();

export {};
