import { useEffect, useRef, useState } from 'react';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { RiPictureInPicture2Line, RiPlayFill, RiStopFill } from 'react-icons/ri';
import moment from 'moment';
import { deleteUploadedAttachment, getUploadAttatchment } from '../../../../features/workspace/workspaceService';
import { useAppSelector } from '../../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IoPlaySharp, IoStopSharp } from 'react-icons/io5';
import { MdFullscreen } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { VideoControlModal } from './VideoControlMedal';

export default function VideoEntries() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { data } = getUploadAttatchment({ id: activeItemId as string, type: activeItemType });
  const [playToggle, setPlayToggle] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();
  const [controlModal, setModal] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlayBack = (index: number) => {
    const videoRef = videoRefs.current[index];
    if (videoRef) {
      if (playToggle) {
        videoRef.pause();
        setPlayToggle(false);
      } else {
        videoRef.play();
        setPlayToggle(true);
      }
    }
  };

  const toggleControls = ({
    index,
    showControls,
    videoElement
  }: {
    index: number;
    showControls: boolean;
    videoElement: HTMLVideoElement | null;
  }) => {
    // const videoRef = videoRefs.current[index];
    if (videoElement) {
      if (showControls) {
        setModal(!controlModal);
        setHoverIndex(index);
      } else {
        setModal(!controlModal);
        setHoverIndex(undefined);
      }
    }
  };

  return (
    <table className="w-full mx-auto p-1">
      <thead>
        <tr className="flex mx-2 border-b-2 py-2 space-x-9">
          <th className="capitalize font-bold">user</th>
          <th className="capitalize font-bold">recording</th>
          <th className="capitalize font-bold">format</th>
          <th className="capitalize font-bold">duration</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.attachments.map((videoFile, index) => {
          const { created_at, updated_at, file_format } = videoFile.physical_file;
          const duration = new Date(updated_at).getTime() - new Date(created_at).getTime();
          return (
            <tr key={videoFile.id} className="flex space-x-8 border-b items-center p-2 relative">
              <td>
                <AvatarWithInitials initials="MD" width="w-5" height="h-5" />
              </td>
              <td className="relative">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={videoFile.path}
                  height={60}
                  width={100}
                  tabIndex={0}
                  className="recording-tag"
                  onMouseEnter={() =>
                    toggleControls({ index, showControls: true, videoElement: videoRefs.current[index] })
                  }
                  // onMouseLeave={() => toggleControls(index, false)}
                  onEnded={() => setPlayToggle(false)}
                />
                {controlModal && hoverIndex === index && (
                  <VideoControlModal
                    index={index}
                    videoElement={videoRefs.current[index]}
                    videoId={videoFile.id}
                    toggleFn={toggleControls}
                    playToggleFn={setPlayToggle}
                  />
                )}
                {playToggle && hoverIndex === index ? (
                  <RiStopFill
                    className="absolute top-10 left-1 h-4 w-4 text-gray-200 cursor-pointer hover:text-gray-200"
                    onClick={() => handlePlayBack(index)}
                  />
                ) : (
                  <RiPlayFill
                    className="absolute top-10 left-1 h-4 w-4 text-gray-200 cursor-pointer hover:text-gray-200"
                    onClick={() => handlePlayBack(index)}
                  />
                )}
              </td>
              <td>{file_format.extension}</td>
              <td>{moment(duration).format('HH:mm:ss')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
