import fs from "fs/promises";
import path from "path";

const cache = new Map<string, string>();

export async function getMarkdown(filePath: string) {
  const normalized = filePath.replace(/^\//, "");

  if (cache.has(normalized)) {
    return cache.get(normalized)!;
  }

  const fullPath = path.join(process.cwd(), normalized);
  const content = await fs.readFile(fullPath, "utf-8");

  cache.set(normalized, content);

  return content;
}