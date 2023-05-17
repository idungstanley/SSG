import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useUploadRecording } from '../../../../features/workspace/workspaceService';
import { setRecording } from '../../../../features/workspace/workspaceSlice';
import '../../../../pages/workspace/tasks/component/views/view.css';
import RecordRTC from 'recordrtc';
import { setScreenRecording } from '../../../../features/task/taskSlice';

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
  const { screenRecording } = useAppSelector((state) => state.task);
  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const audioConstraints: MediaTrackConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    };
    const videoStream: MediaStream = await mediaDevices.getDisplayMedia({
      audio: audioConstraints,
      video: true
    });
    const audioStream: MediaStream = await mediaDevices.getUserMedia({ audio: true });
    const [videoTrack] = videoStream.getVideoTracks();
    const [audioTrack] = audioStream.getAudioTracks();
    const stream = new MediaStream([videoTrack, audioTrack]);
    const recorder = new RecordRTC(stream, { type: 'video', mimeType: 'video/webm;codecs=vp9' });
    await recorder.startRecording();
    dispatch(setScreenRecording('recording'));
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
      dispatch(setScreenRecording('idle'));
    }
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
