import { promises as fs } from 'fs';

export type PathLike = string | { toString(): string };

export async function parseJson<T>(fileName: PathLike): Promise<T | undefined> {
  try {
    const text = await fs.readFile(fileName.toString(), 'utf-8');
    return JSON.parse(text);
  } catch (err) {

  }
  return undefined;
}