import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setLastMemory, setRecording } from '../../../../features/workspace/workspaceSlice';
import '../../../../pages/workspace/tasks/component/views/view.css';
import { useMediaStream } from '../../../../features/task/taskService';
import { BsFillRecord2Fill } from 'react-icons/bs';
import { IoStopCircleSharp, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeTabId, activeItemId, activeItemType, isMuted } = useAppSelector((state) => state.workspace);
  const { recorder, stream } = useAppSelector((state) => state.task);
  const { hubId, listId, workSpaceId } = useParams();

  const dispatch = useAppDispatch();
  const {
    handleStartStream,
    handleStopStream,
    handleToggleMute
    // isStarting,
    // isStopping,
  } = useMediaStream();
  const { screenRecording } = useAppSelector((state) => state.task);
  const startRecording = async () => {
    await handleStartStream();
    dispatch(setLastMemory({ activeTabId, workSpaceId, listId, hubId }));
  };

  const stopRecording = () => {
    handleStopStream({ stream, recorder });
  };
  useEffect(() => {
    if (screenRecording !== 'recording') {
      dispatch(
        setRecording({
          id: activeItemId as string,
          type: activeItemType as string
        })
      );
    }
  }, [screenRecording]);
  return (
    <div>
      {screenRecording === 'recording' ? (
        <>
          <div className="screenRecording flex space-x-2">
            <button onClick={() => handleToggleMute()} className="flex space-x-2 items-center justify-center">
              {!isMuted ? <IoVolumeMute className="w-7 h-7" /> : <IoVolumeHigh className="w-7 h-7" />}
              {/* {isMuted ? <span>Mute</span> : <span>UnMute</span>} */}
            </button>
            <button onClick={stopRecording} className="flex space-x-2 items-center justify-center">
              <IoStopCircleSharp className="w-7 h-7" />
              Stop Recording
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="screenRecording flex flex-col">
            <button onClick={startRecording} className="flex space-x-2 items-center justify-center">
              <BsFillRecord2Fill className="w-7 h-7" />
              Start Recording
            </button>
          </div>
        </>
      )}
    </div>
  );
}
