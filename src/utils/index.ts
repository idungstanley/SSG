export const cl = (...classes: (string | undefined | boolean | null)[]) => {
  return classes.filter((i) => !!i && typeof i === 'string').join(' ');
};
export const classNames = (...classes: (string | undefined | boolean | null)[]) => {
  return classes.filter((i) => !!i && typeof i === 'string').join(' ');
};
