import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUploadedAttachment } from '../../../../features/workspace/workspaceService';
import { useEffect, useState } from 'react';
import { IoPlaySharp, IoStopSharp } from 'react-icons/io5';
import { MdFullscreen } from 'react-icons/md';
import { RiPictureInPicture2Line } from 'react-icons/ri';
import { BiTrash } from 'react-icons/bi';

export type toggleType = { index: number; showControls: boolean; videoElement: HTMLVideoElement | null };
interface VideoControlModalProps {
  index: number;
  videoElement: HTMLVideoElement | null;
  videoId: string;
  toggleFn: ({ index, showControls, videoElement }: toggleType) => void;
  playToggleFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VideoControlModal({ index, videoElement, videoId, toggleFn, playToggleFn }: VideoControlModalProps) {
  const query = useQueryClient();

  const { mutate } = useMutation(deleteUploadedAttachment, {
    onSuccess: () => query.invalidateQueries(['attachments'])
  });
  const [playState, setPlay] = useState<boolean>(false);
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  const handlePlay = () => {
    videoElement?.paused && videoElement && videoElement.play();
    setPlay(!playState);
    playToggleFn(true);
  };

  const handleStop = () => {
    videoElement?.played && videoElement && videoElement.pause();
    setPlay(!playState);
    playToggleFn(false);
  };

  const toggleFullScreen = () => {
    if (videoElement) {
      if (!isFullScreen) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setFullScreen(!isFullScreen);
    }
  };

  const togglePictureInPicture = async () => {
    if (videoElement && document.pictureInPictureEnabled) {
      if (!document.pictureInPictureElement) {
        await videoElement.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    }
  };

  const closeModal = () => {
    toggleFn({ index, showControls: false, videoElement });
  };

  useEffect(() => {
    if (videoElement) {
      const handleEndPlay = () => {
        setPlay(!playState);
      };

      videoElement.addEventListener('ended', handleEndPlay);

      return () => videoElement.removeEventListener('ended', handleEndPlay);
    }
  }, [playState]);

  return (
    <div
      className="w-56 rounded-md shadow-2xl bg-white flex flex-col py-1 absolute z-40"
      onBlur={closeModal}
      tabIndex={0}
    >
      {playState ? (
        <span
          className="text-xs flex gap-2 items-center capitalize cursor-pointer hover:bg-gray-300 py-3 px-2"
          onClick={handleStop}
        >
          <IoStopSharp />
          stop
        </span>
      ) : (
        <span
          className="text-xs flex gap-2 items-center capitalize cursor-pointer hover:bg-gray-300 py-3 px-2"
          onClick={handlePlay}
        >
          <IoPlaySharp />
          play
        </span>
      )}
      <span
        className="text-xs flex gap-2 items-center capitalize cursor-pointer hover:bg-gray-300 py-3 px-2"
        onClick={toggleFullScreen}
      >
        <MdFullscreen />
        view in fullscreen
      </span>
      <span
        className="text-xs flex gap-2 items-center capitalize cursor-pointer hover:bg-gray-300 py-3 px-2"
        onClick={togglePictureInPicture}
      >
        <RiPictureInPicture2Line />
        picture in picture
      </span>
      <span
        className="text-xs flex gap-2 items-center capitalize cursor-pointer hover:bg-gray-300 py-3 px-2"
        onClick={() => {
          mutate({
            id: videoId
          });
        }}
      >
        <BiTrash />
        delete
      </span>
    </div>
  );
}
