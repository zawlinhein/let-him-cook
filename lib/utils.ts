import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertBlockArray(s: string) {
  const blocks = s
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => ({
      _type: "block",
      _key: uuidv4(), // ensure unique keys
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: uuidv4(),
          text: line.trim(),
          marks: [],
        },
      ],
    }));
  return blocks;
}

export function parseServerActionRes<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
