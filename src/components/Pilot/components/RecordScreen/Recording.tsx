import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import axios from 'axios';
import { getUploadAttatchment } from '../../../../features/workspace/workspaceService';
import { useQueryClient } from '@tanstack/react-query';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { taskId } = useParams();

  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);

  const { data } = getUploadAttatchment({ id: taskId as string, type: 'task' });
  const queryClient = useQueryClient();

  const uploadRecording = async (blob: Blob) => {
    try {
      const formData: IFormData = new FormData();
      formData.append('files[0]', blob, 'recording.webm');
      formData.append('title', 'My Recording Title');
      formData.append('type', 'task');
      formData.append('id', `${taskId}`);

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/attachments`, formData, {
        headers: currentWorkspaceId
          ? {
              Authorization: `Bearer ${accessToken}`,
              current_workspace_id: currentWorkspaceId
            }
          : undefined
      });
      queryClient.invalidateQueries(['attachments']);
    } catch (error) {
      return error;
    }
  };

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    screen: true,
    audio: true,
    mediaRecorderOptions: { mimeType: 'video/webm;codecs=vp9' }, // Specify the MIME type as "video/webm" with the "vp9" codec
    onStop: (blobUrl, blob) => {
      uploadRecording(blob);
    }
  });

  return (
    <div>
      <div className="my-2">
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
      </div>
      {data?.data.attachments.map((video) => (
        <p key={video.id}>
          <video src={video.path && data?.data.attachments[0].path} controls></video>
        </p>
      ))}
    </div>
  );
}
