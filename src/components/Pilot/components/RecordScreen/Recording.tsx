import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUploadAttatchment, uploadRecording } from '../../../../features/workspace/workspaceService';
import { setRecording } from '../../../../features/workspace/workspaceSlice';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { getRecording } = useAppSelector((state) => state.workspace);

  console.log(getRecording);

  const { data } = getUploadAttatchment({ id: activeItemId as string, type: activeItemType });
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    screen: true,
    audio: true,
    mediaRecorderOptions: { mimeType: 'video/webm;codecs=vp9' },
    onStop: (blobUrl, blob) => {
      uploadRecording(blob, currentWorkspaceId, accessToken, getRecording.id, queryClient, getRecording.type);
      dispatch(
        setRecording({
          id: null,
          type: null
        })
      );
    }
  });

  useEffect(() => {
    if (status !== 'recording') {
      dispatch(
        setRecording({
          id: activeItemId as string,
          type: activeItemType as string
        })
      );
    }
  }, []);

  return (
    <div>
      {status == 'recording' ? (
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

      {data?.data.attachments.map((video) => (
        <p key={video.id}>
          <video src={video.path && data?.data.attachments[0].path} controls></video>
        </p>
      ))}
    </div>
  );
}
