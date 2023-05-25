import { MAX_COL_WIDTH, DEFAULT_COL_WIDTH } from '../config';

export const generateGrid = (columnsCount: number) =>
  `minmax(${MAX_COL_WIDTH}px, 1fr) ${[...Array(columnsCount)]
    .slice(1)
    .map(() => `minmax(${DEFAULT_COL_WIDTH}px, 1fr)`)
    .join(' ')}`;
