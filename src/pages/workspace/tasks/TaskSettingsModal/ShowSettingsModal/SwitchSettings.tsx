import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  getCompactView,
  getSingleLineView,
  getSplitSubTask,
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
    splitSubTaskState,
    autoSave
  } = useAppSelector((state) => state.task);

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
      case 'Split Sub Task':
        dispatch(getSplitSubTask(!splitSubTaskState));
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
