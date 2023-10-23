export const generateSortField = (title: string, isDefault: boolean, id?: string) => {
  if (isDefault) {
    return id as string;
  } else {
    return `cus_${id}`;
  }
};
