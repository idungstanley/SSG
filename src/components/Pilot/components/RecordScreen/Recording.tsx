import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useUploadRecording } from '../../../../features/workspace/workspaceService';
import { setRecording } from '../../../../features/workspace/workspaceSlice';
import '../../../../pages/workspace/tasks/component/views/view.css';
import RecordRTC from 'recordrtc';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [recorderState, setRecorderState] = useState<'idle' | 'recording'>('idle');

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const audioConstraints: MediaTrackConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    };

    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000
    };

    const stream: MediaStream = await mediaDevices.getDisplayMedia({
      audio: audioConstraints,
      video: true
    });
    const recorder = new RecordRTC(stream, options);
    await recorder.startRecording();
    setRecorderState('recording');
    setRecorder(recorder as RecordRTC);
    setStream(stream);
  };

  const { mutate } = useUploadRecording();

  const stopRecording = async () => {
    recorder?.stopRecording();
    const blob = recorder?.getBlob();
    if (blob && currentWorkspaceId && accessToken && activeItemId && activeItemType) {
      await mutate({
        blob,
        currentWorkspaceId,
        accessToken,
        activeItemId,
        activeItemType
      });
      stream?.getTracks().map((track) => track.stop());
      setRecorderState('idle');
    }
  };

  useEffect(() => {
    if (recorderState !== 'recording') {
      dispatch(
        setRecording({
          id: activeItemId as string,
          type: activeItemType as string
        })
      );
    }
  }, [recorderState]);

  return (
    <div>
      {recorderState == 'recording' ? (
        <>
          <button onClick={stopRecording} className="screenRecording">
            Stop Recording
          </button>
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
