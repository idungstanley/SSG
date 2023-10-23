export const generateSortField = (isDefault: boolean, id?: string) => {
  if (isDefault) {
    return id as string;
  } else {
    return `cus_${id}`;
  }
};
