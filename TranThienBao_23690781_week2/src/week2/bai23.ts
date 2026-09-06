export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchCompletedTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const todos: Todo[] = await response.json();
  return todos.filter((todo) => todo.completed === true);
}

async function main(): Promise<void> {
  try {
    const completedTodos = await fetchCompletedTodos();
    console.log(completedTodos);
  } catch (error) {
    console.error((error as Error).message);
  }
}

main();
