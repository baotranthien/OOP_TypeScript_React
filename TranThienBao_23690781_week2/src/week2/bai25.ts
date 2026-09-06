export function downloadFile(filename: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const message = `Downloaded ${filename}`;
      console.log(message);
      resolve(message);
    }, 3000);
  });
}

downloadFile("sample.pdf");
