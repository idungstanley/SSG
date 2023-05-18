import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setRecording } from '../../../../features/workspace/workspaceSlice';
import '../../../../pages/workspace/tasks/component/views/view.css';
import { useMediaStream } from '../../../../features/task/taskService';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { recorder, stream } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const {
    handleStartStream,
    handleStopStream
    // isStarting,
    // isStopping,
  } = useMediaStream();
  const { screenRecording } = useAppSelector((state) => state.task);
  const startRecording = async () => {
    await handleStartStream();
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
      {screenRecording == 'recording' ? (
        <>
          <div className="screenRecording flex flex-col">
            <button onClick={stopRecording}>Stop Recording</button>
          </div>
        </>
      ) : (
        <>
          <div className="screenRecording flex flex-col">
            <button onClick={startRecording}>Start Recording</button>
          </div>
        </>
      )}
    </div>
  );
}
