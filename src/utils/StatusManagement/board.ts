import { BOARD_SECTIONS } from './Constant';
import { BoardSections, Status, StatusType } from './Types';
import { getTasksByStatus } from './statusUtils';

export const initializeBoard = (tasks: StatusType[]) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey as Status);
  });

  return boardSections;
};

export const findBoardSectionContainer = (boardSections: BoardSections, id: string) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) => boardSections[key].find((item) => item.id === id));
  return container;
};
