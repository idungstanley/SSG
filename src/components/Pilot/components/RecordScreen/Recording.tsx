import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useParams } from 'react-router-dom';
import { getUploadAttatchment, uploadRecording } from '../../../../features/workspace/workspaceService';
import { useMutation } from '@tanstack/react-query';

export interface IFormData {
  append(name: string, value: Blob, fileName?: string): void;
  append(name: string, value: string): void;
}

export default function Recording() {
  const { taskId } = useParams();

  // const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);

  const { data } = getUploadAttatchment({ id: taskId as string, type: 'task' });

  const createUpload = useMutation(uploadRecording, {
    onSuccess: () => {
      console.log('uploaded');
    }
  });

  const handleSubmit = async (blob: Blob) => {
    await createUpload.mutateAsync(blob);
  };

  // const queryClient = useQueryClient();

  // const uploadRecording = async (blob: Blob) => {
  //   try {
  //     const formData: IFormData = new FormData();
  //     formData.append('files[0]', blob, 'recording.webm');
  //     formData.append('title', 'My Recording Title');
  //     formData.append('type', 'task');
  //     formData.append('id', `${taskId}`);

  //     const options: RequestInit = {
  //       method: 'POST',
  //       body: formData as BodyInit,
  //       headers: currentWorkspaceId
  //         ? {
  //             Authorization: `Bearer ${accessToken}`,
  //             current_workspace_id: currentWorkspaceId
  //           }
  //         : undefined
  //     };

  //     await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/attachments`, options);
  //     queryClient.invalidateQueries(['attachments']);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    screen: true,
    audio: true,
    mediaRecorderOptions: { mimeType: 'video/webm;codecs=vp9' },
    onStop: (blobUrl, blob) => {
      handleSubmit(blob);
      // uploadRecording(blob);
    }
  });

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
