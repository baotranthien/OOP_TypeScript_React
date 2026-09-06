export interface PostRequestData {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponseData extends PostRequestData {
  id: number;
}

export async function postData(): Promise<PostResponseData> {
  const newPost: PostRequestData = {
    title: "Title test",
    body: "Content test",
    userId: 1,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return (await response.json()) as PostResponseData;
}

async function main(): Promise<void> {
  try {
    const result = await postData();
    console.log(result);
  } catch (error) {
    console.error((error as Error).message);
  }
}

main();
