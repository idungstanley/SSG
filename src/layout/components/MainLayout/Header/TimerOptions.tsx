import { useNavigate } from 'react-router-dom';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EndTimeEntriesService } from '../../../../features/task/taskService';
import { setTimerInterval, setTimerStatus, setUpdateTimerDuration } from '../../../../features/task/taskSlice';
import { handleEntity } from '../../../../utils/EntityTypes/EntitySwitch';

export default function TimerModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const { timerDetails, period } = useAppSelector((state) => state.task);

  const { activeTabId, workSpaceId, hubId, listId, taskId, viewId } = timerLastMemory;
  const { mutate } = EndTimeEntriesService();

  const handleResetTimer = () => {
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId, taskId, viewId }));
    navigate(handleEntity({ workSpaceId, hubId, listId, taskId, viewId }), { replace: true });
  };

  const stop = () => {
    mutate({
      id: activeItemId,
      is_Billable: timerDetails.isBillable,
      description: timerDetails.description
    });
    dispatch(setTimerStatus(false));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ h: 0, s: 0, m: 0 }));
    dispatch(setTimerInterval());
  };
  return (
    <div className="flex flex-col w-full bg-alsoit-gray-50">
      <span
        className="px-2 py-3 cursor-pointer border-b-alsoit-border-base hover:text-white hover:bg-alsoit-gray-75"
        onClick={() => stop()}
      >
        Stop Timer
      </span>
      <span
        className="px-2 py-3 cursor-pointer hover:text-white hover:bg-alsoit-gray-75"
        onClick={() => handleResetTimer()}
      >
        Return to Active Timer tab
      </span>
    </div>
  );
}
