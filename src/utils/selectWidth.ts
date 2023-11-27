function selectWidth(resizeWidth: number, localStorageWidth: number): number {
  if (resizeWidth !== localStorageWidth) {
    return localStorageWidth;
  }

  // If the widths are the same, you can choose to return resizeWidth or handle it differently
  return resizeWidth;
}

export default selectWidth;
