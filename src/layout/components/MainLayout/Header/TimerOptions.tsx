import { useNavigate } from 'react-router-dom';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { handleEntity } from './AdditionHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export default function TimerModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { timerLastMemory } = useAppSelector((state) => state.workspace);

  const { activeTabId, workSpaceId, hubId, listId } = timerLastMemory;
  const handleResetTimer = () => {
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId }));
    navigate(handleEntity({ workSpaceId, hubId, listId }), { replace: true });
  };
  return (
    <div className="flex flex-col w-full">
      <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer">Stop Timer</span>
      <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer" onClick={() => handleResetTimer()}>
        Return to Active Timer tab
      </span>
      {/* <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer" onClick={() => handleResetTimer()}>
        Stop and Return to Active Timer tab
      </span> */}
    </div>
  );
}
