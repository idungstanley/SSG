import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUploadAttatchment, uploadRecording } from '../../../../features/workspace/workspaceService';
import { setRecording } from '../../../../features/workspace/workspaceSlice';
import moment from 'moment';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';

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
            <div key={video.id}>
              <VideoEntries videoFile={video} />
            </div>
          );
        })}
      </table>
    </div>
  );
}

interface VideoEntriesProps {
  videoFile: {
    id: string;
    path: string;
    physical_file: {
      id: string;
      created_at: string;
      updated_at: string;
    };
  };
}

function VideoEntries({ videoFile }: VideoEntriesProps) {
  const { created_at, updated_at } = videoFile.physical_file;
  const duration = new Date(updated_at).getTime() - new Date(created_at).getTime();
  // const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  return (
    <div className="flex space-x-10 border-b items-center p-2">
      <AvatarWithInitials initials="MD" width="w-5" height="h-5" />
      <video src={videoFile.path} controls height={60} width={100} tabIndex={0}></video>
      <span>{moment(duration).format('HH:mm:ss')}</span>
    </div>
  );
}
