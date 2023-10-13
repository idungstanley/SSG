import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  getCompactView,
  getSingleLineView,
  getSplitSubTask,
  getSplitSubTaskLevels,
  getTaskUpperCase,
  getVerticalGrid,
  getVerticalGridlinesTask,
  setAutoSave
} from '../../../../../features/task/taskSlice';

export function useSwitchSettings() {
  const dispatch = useAppDispatch();
  const {
    singleLineView,
    CompactView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask,
    splitSubTaskLevels,
    autoSave
  } = useAppSelector((state) => state.task);

  const splitSubtasks = (levelId: string) => {
    if (!splitSubTaskLevels.length) {
      dispatch(getSplitSubTask(true));
      dispatch(getSplitSubTaskLevels([levelId]));
    } else {
      let levelOptions: string[] = [];
      if (splitSubTaskLevels.includes(levelId)) {
        levelOptions = splitSubTaskLevels.filter((id) => id !== levelId);
      } else {
        levelOptions = [...splitSubTaskLevels, levelId];
      }
      dispatch(getSplitSubTaskLevels(levelOptions));
      if (!levelOptions.length) {
        dispatch(getSplitSubTask(false));
      } else {
        dispatch(getSplitSubTask(true));
      }
    }
  };

  const switchSettings = (viewMode: string) => {
    switch (viewMode) {
      case 'Single Line mode':
        dispatch(getSingleLineView(!singleLineView));
        break;
      case 'Compact mode':
        dispatch(getCompactView(!CompactView));
        break;
      case 'Property Vertical Grid Line':
        dispatch(getVerticalGrid(!verticalGrid));
        break;
      case 'Upper Case':
        dispatch(getTaskUpperCase(!taskUpperCase));
        break;
      case 'Title Vertical Grid Line':
        dispatch(getVerticalGridlinesTask(!verticalGridlinesTask));
        break;
      case 'Split 2 level of subtasks':
        splitSubtasks(TWO_SUBTASKS_LEVELS);
        break;
      case 'Split 3 level of subtasks':
        splitSubtasks(THREE_SUBTASKS_LEVELS);
        break;
      case 'AutoSave View':
        dispatch(setAutoSave(!autoSave));
        break;
      default:
        // If none of the cases match, do something else or nothing.
        break;
    }
  };

  return switchSettings;
}
