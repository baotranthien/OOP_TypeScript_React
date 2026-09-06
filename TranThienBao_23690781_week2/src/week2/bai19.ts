export interface User {
  id: number;
  name: string;
  email: string;
}

export async function fetchUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };
}

export async function fetchUsers(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map((id) => fetchUser(id)));
}

async function main(): Promise<void> {
  const users = await fetchUsers([1, 2, 3, 4, 5]);
  console.log(users);
}

main();
