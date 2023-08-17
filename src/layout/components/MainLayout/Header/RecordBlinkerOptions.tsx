import { useNavigate } from 'react-router-dom';
import { useMediaStream } from '../../../../features/task/taskService';
import { IRecorderLastMemory } from '../../../../features/workspace/workspace.interfaces';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { handleEntity } from '../../../../utils/EntityTypes/EntitySwitch';

export default function BlinkerModal() {
  const { recorder, stream } = useAppSelector((state) => state.task);
  const { recorderLastMemory } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeTabId, workSpaceId, hubId, subhubId, listId, taskId } = recorderLastMemory as IRecorderLastMemory;

  const { handleStopStream } = useMediaStream();

  const stopRecording = () => {
    handleStopStream({
      recorder,
      stream
    });
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, subhubId, listId, taskId }));
    navigate(handleEntity({ workSpaceId, hubId, subhubId, listId, taskId }), { replace: true });
  };
  return (
    <div className="flex flex-col w-full">
      <span
        className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer"
        onClick={() =>
          handleStopStream({
            recorder,
            stream
          })
        }
      >
        Stop Recording
      </span>
      <span
        className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer"
        onClick={() => dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, subhubId, listId, taskId }))}
      >
        Return to Recording tab
      </span>
      <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer" onClick={() => stopRecording()}>
        Stop and Return to Recording tab
      </span>
    </div>
  );
}
