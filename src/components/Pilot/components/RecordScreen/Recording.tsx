import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUploadAttatchment, uploadRecording } from '../../../../features/workspace/workspaceService';
import { setRecording } from '../../../../features/workspace/workspaceSlice';
import '../../../../pages/workspace/tasks/component/views/view.css';
import VideoEntries from './RecordingLogs';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { getRecording } = useAppSelector((state) => state.workspace);

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
      <table className="w-full mx-auto p-1">
        <thead>
          <tr className="flex mx-2 border-b-2 py-2 space-x-12">
            <th className="capitalize font-bold">user</th>
            <th className="capitalize font-bold">recording</th>
            <th className="capitalize font-bold">duration</th>
          </tr>
        </thead>
        {data?.data.attachments.map((video) => {
          //  Leave for reference purposes
          // console.log(data.data.attachments);
          return (
            <tbody key={video.id}>
              <VideoEntries videoFile={video} />
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
