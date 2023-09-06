import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setRecorderLastMemory, setRecording } from '../../../../features/workspace/workspaceSlice';
import { useMediaStream } from '../../../../features/task/taskService';
import { BsFillRecord2Fill } from 'react-icons/bs';
import { IoStopCircleSharp, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import '../../../../pages/workspace/tasks/component/views/view.css';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeTabId, activeItemId, activeItemType, isMuted } = useAppSelector((state) => state.workspace);
  const { recorder, stream } = useAppSelector((state) => state.task);
  const { hubId, subhubId, listId, workSpaceId, taskId } = useParams();

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
    dispatch(setRecorderLastMemory({ activeTabId, workSpaceId, listId, hubId, subhubId, taskId }));
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
            <button onClick={() => handleToggleMute()} className="flex items-center justify-center">
              {!isMuted ? (
                <IoVolumeMute className="w-7 h-7 text-alsoit-purple-300" />
              ) : (
                <IoVolumeHigh className="w-7 h-7 text-alsoit-purple-300" />
              )}
            </button>
            <button onClick={stopRecording} className="flex space-x-2 items-center justify-center">
              <IoStopCircleSharp className="w-7 h-7" />
              Stop Recording
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <button onClick={() => handleToggleMute()} className="flex items-center justify-center">
            {!isMuted ? (
              <IoVolumeMute className="w-7 h-7 mt-2 text-alsoit-purple-300" />
            ) : (
              <IoVolumeHigh className="w-7 h-7 mt-2 text-alsoit-purple-300" />
            )}
          </button>
          <div className="screenRecording flex flex-col">
            <button onClick={startRecording} className="flex">
              <BsFillRecord2Fill className="w-7 h-7" />
              Start Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
