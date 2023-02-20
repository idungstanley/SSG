export const cl = (...classes: (string | undefined | boolean | null)[]) => {
  return classes.filter((i) => !!i && typeof i === 'string').join(' ');
};
