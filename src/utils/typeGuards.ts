export const isString = (i: unknown): i is string => typeof i === 'string';

export function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

// if (Array.isArray(value)) {
//   return value.every((item) => typeof item === 'string');
// }
// return false;

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
