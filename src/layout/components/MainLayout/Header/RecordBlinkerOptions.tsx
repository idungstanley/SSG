import { IRecorderLastMemory } from '../../../../features/workspace/workspace.interfaces';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useScreenRecorder } from '../../../../components/Pilot/components/RecordScreen/ScreenRecordHandler';
import { handleEntity } from '../../../../utils/EntityTypes/EntitySwitch';
import { useNavigate } from 'react-router-dom';

export default function BlinkerModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { recorderLastMemory } = useAppSelector((state) => state.workspace);
  const { activeTabId, workSpaceId, hubId, subhubId, listId, taskId } = recorderLastMemory as IRecorderLastMemory;

  const { stopRecording: Stop } = useScreenRecorder();

  const stopRecording = () => {
    Stop();
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, subhubId, listId, taskId }));
    navigate(handleEntity({ workSpaceId, hubId, subhubId, listId, taskId }), { replace: true });
  };

  return (
    <div className="flex flex-col w-full">
      <span
        className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer"
        onClick={() => dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, subhubId, listId, taskId }))}
      >
        Return to Recording tab
      </span>
      <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer" onClick={() => stopRecording()}>
        Stop Recording
      </span>
    </div>
  );
}
