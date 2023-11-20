/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: any[]) => void;

function debounce<T extends AnyFunction>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
}

export default debounce;
