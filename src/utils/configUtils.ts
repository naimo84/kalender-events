import { promises as fs } from 'fs';
import { join } from 'path';

export type PathLike = string | { toString(): string };

export async function parseJson<T>(fileName: PathLike): Promise<T | undefined> {
  try {
    const text = await fs.readFile(fileName.toString(), 'utf-8');
    return JSON.parse(text);
  } catch (err) {

  }
  return undefined;
}

export async function getPackageVersion() {
  const packageJson = await parseJson<Record<string, string>>(join(__dirname, '../../package.json')); 
  return packageJson ? packageJson.version : 'not found';
}