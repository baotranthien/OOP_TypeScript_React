export interface User {
  id: number;
  name: string;
  email: string;
}

export async function fetchUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };
}

async function main(): Promise<void> {
  const user = await fetchUser(1);
  console.log(user);
}

main();
