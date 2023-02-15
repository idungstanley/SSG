export const cl = (...classes: (string | undefined | boolean | null)[]) => {
  return classes.filter(Boolean).join(' ');
};
