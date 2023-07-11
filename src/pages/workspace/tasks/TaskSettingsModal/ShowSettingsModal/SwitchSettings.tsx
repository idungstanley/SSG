import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  getCompactView,
  getSingleLineView,
  getTaskUpperCase,
  getVerticalGrid,
  getVerticalGridlinesTask
} from '../../../../../features/task/taskSlice';

export function useSwitchSettings() {
  const dispatch = useAppDispatch();
  const { singleLineView, CompactView, verticalGrid, taskUpperCase, verticalGridlinesTask } = useAppSelector(
    (state) => state.task
  );

  const switchSettings = (viewMode: string) => {
    if (viewMode === 'Single Line mode') {
      dispatch(getSingleLineView(!singleLineView));
    } else if (viewMode === 'Compact mode') {
      dispatch(getCompactView(!CompactView));
    } else if (viewMode === 'Vertical Gridlines') {
      dispatch(getVerticalGrid(!verticalGrid));
    } else if (viewMode === 'Upper Case') {
      dispatch(getTaskUpperCase(!taskUpperCase));
    } else if (viewMode === 'Task GridLines') {
      dispatch(getVerticalGridlinesTask(!verticalGridlinesTask));
    }
  };

  return switchSettings;
}
