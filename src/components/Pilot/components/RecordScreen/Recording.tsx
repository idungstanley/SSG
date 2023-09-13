import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setRecorderLastMemory, setRecording } from '../../../../features/workspace/workspaceSlice';
import { useMediaStream } from '../../../../features/task/taskService';
import { BsFillRecord2Fill } from 'react-icons/bs';
import { IoStopCircleSharp, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import '../../../../pages/workspace/tasks/component/views/view.css';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { IDuration } from '../../../../features/task/interface.tasks';
import { runTimer } from '../../../../utils/RecordTimer';
import {
  setRecordBlob,
  setRecorderInterval,
  setScreenRecordingMedia,
  setUpdateRecoderDuration
} from '../../../../features/task/taskSlice';
import { useScreenRecorder } from './ScreenRecordHandler';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeTabId, activeItemId, activeItemType, isMuted } = useAppSelector((state) => state.workspace);
  const { recorderDuration } = useAppSelector((state) => state.task);
  const { hubId, subhubId, listId, workSpaceId, taskId } = useParams();

  const [time, setTime] = useState<IDuration>(recorderDuration);

  const [recordState, setRecordState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    handleToggleMute
    // isStarting,
    // isStopping,
  } = useMediaStream();
  const {
    startRecording: Record,
    stopRecording: StopRecord,
    isRecording,
    recordedBlob,
    recordedData
  } = useScreenRecorder();
  const { screenRecording } = useAppSelector((state) => state.task);

  const startRecording = async () => {
    Record();
    dispatch(setRecorderLastMemory({ activeTabId, workSpaceId, listId, hubId, subhubId, taskId }));
    setRecordState(true);
  };

  const stopRecording = () => {
    StopRecord();
    recordedData.recorder?.stop();
    dispatch(setScreenRecordingMedia(recordedData));
    dispatch(setRecordBlob(recordedBlob));
    setRecordState(false);
    dispatch(setRecorderInterval());
    dispatch(setUpdateRecoderDuration({ h: 0, m: 0, s: 0 }));
  };

  function timerCheck() {
    if (activeItemType === EntityType.hub || activeItemType === EntityType.list || activeItemType === EntityType.task) {
      return (
        <div className="items-center text-alsoit-text-md">
          {`${String(recorderDuration.h).padStart(2, '0')}:${String(recorderDuration.m).padStart(2, '0')}:${String(
            recorderDuration.s
          ).padStart(2, '0')}`}
        </div>
      );
    }
    return (
      <div className="items-center text-alsoit-text-md">
        {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`}
      </div>
    );
  }

  const run = runTimer({
    isRunning: false,
    setTime: setTime
  });

  useEffect(() => {
    if (screenRecording !== 'recording') {
      dispatch(
        setRecording({
          id: activeItemId as string,
          type: activeItemType as string
        })
      );
    }
    run;
  }, [screenRecording]);

  useEffect(() => {
    if (recordedBlob) {
      dispatch(setScreenRecordingMedia(recordedData));
      dispatch(setRecordBlob(recordedBlob));
    }
  }, [recordedBlob]);

  useEffect(() => {
    setTime(recorderDuration);
  }, [recorderDuration]);

  return (
    <div>
      {isRecording ? (
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
          <div className="flex justify-center items-center my-4 bg-alsoit-gray-50 text-alsoit-gray-200 font-semibold p-1.5">
            {timerCheck()}
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
