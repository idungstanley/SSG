export const calculateSlides = (items: unknown[], itemWidth: number, fullWidth: number): unknown[][] => {
  const slidesList: unknown[][] = [];
  let filledWidth = 0;
  let slideList: unknown[] = [];
  items.forEach((item, index) => {
    if (filledWidth + itemWidth < fullWidth) {
      filledWidth += itemWidth;
      slideList.push(item);
      if (index === items.length - 1) {
        slidesList.push(slideList);
      }
    } else {
      slidesList.push(slideList);
      filledWidth = 0;
      slideList = [item];
    }
  });
  return slidesList;
};
