import { MAX_COL_WIDTH, DEFAULT_COL_WIDTH } from '../config';

export const generateGrid = (columnsCount: number, isSplitSubtask?: boolean) => {
  if (isSplitSubtask) {
    return `minmax(calc(${MAX_COL_WIDTH}% - 22px), calc(90% - 22px)) ${[...Array(columnsCount)]
      .slice(1)
      .map(() => `minmax(${DEFAULT_COL_WIDTH}px, 1fr)`)
      .join(' ')}`;
  }
  return `minmax(${MAX_COL_WIDTH}%, 90%) ${[...Array(columnsCount)]
    .slice(1)
    .map(() => `minmax(${DEFAULT_COL_WIDTH}px, 1fr)`)
    .join(' ')}`;
};
