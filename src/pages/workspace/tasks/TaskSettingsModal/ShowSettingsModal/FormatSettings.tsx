import { useAppDispatch } from '../../../../../app/hooks';
import {
  getCompactView,
  getSingleLineView,
  getSplitSubTask,
  getTaskUpperCase,
  getVerticalGrid,
  getVerticalGridlinesTask,
  setAutoSave
} from '../../../../../features/task/taskSlice';

export function useformatSettings() {
  const dispatch = useAppDispatch();

  const formatSettings = (settingsOng: { [key: string]: boolean }) => {
    dispatch(getSingleLineView(settingsOng.singleLineView));
    dispatch(getCompactView(settingsOng.CompactView));
    dispatch(getVerticalGrid(settingsOng.verticalGrid));
    dispatch(getTaskUpperCase(settingsOng.taskUpperCase));
    dispatch(getVerticalGridlinesTask(settingsOng.verticalGridlinesTask));
    dispatch(getSplitSubTask(settingsOng.splitSubTaskState));
    dispatch(setAutoSave(settingsOng.autoSave));
  };

  return formatSettings;
}
