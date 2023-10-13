import { useAppDispatch } from '../../../../../app/hooks';
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
    const splitLevels: string[] = [];
    if (settingsOng.splitSubtaskTwoState) {
      splitLevels.push(TWO_SUBTASKS_LEVELS);
    }
    if (settingsOng.splitSubtaskThreeState) {
      splitLevels.push(THREE_SUBTASKS_LEVELS);
    }
    dispatch(getSplitSubTaskLevels(splitLevels));
  };

  return formatSettings;
}
