import { useRef, useState } from 'react';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { RiPlayFill, RiStopFill } from 'react-icons/ri';
import moment from 'moment';
import { getUploadAttatchment } from '../../../../features/workspace/workspaceService';
import { useAppSelector } from '../../../../app/hooks';

// interface VideoEntriesProps {
//   videoFile: {
//     id: string;
//     path: string;
//     physical_file: {
//       id: string;
//       created_at: string;
//       updated_at: string;
//     };
//   };
// }

export default function VideoEntries() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { data } = getUploadAttatchment({ id: activeItemId as string, type: activeItemType });
  const [playToggle, setPlayToggle] = useState<boolean>(false);
  const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const handlePlayBack = () => {
    if (videoRef.current) {
      if (playToggle) {
        videoRef.current.pause();
        setPlayToggle(!playToggle);
      } else {
        videoRef.current.play();
        setPlayToggle(!playToggle);
      }
    }
  };
  const toggleControls = () =>
    videoRef.current?.hasAttribute('controls')
      ? videoRef.current.removeAttribute('controls')
      : videoRef.current?.setAttribute('controls', 'true');

  return (
    <table className="w-full mx-auto p-1">
      <thead>
        <tr className="flex mx-2 border-b-2 py-2 space-x-12">
          <th className="capitalize font-bold">user</th>
          <th className="capitalize font-bold">recording</th>
          <th className="capitalize font-bold">duration</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.attachments.map((videoFile) => {
          const { created_at, updated_at } = videoFile.physical_file;
          const duration = new Date(updated_at).getTime() - new Date(created_at).getTime();
          return (
            <tr key={videoFile.id} className="flex space-x-10 border-b items-center p-2 relative">
              <td>
                <AvatarWithInitials initials="MD" width="w-5" height="h-5" />
              </td>
              <td className="relative">
                <video
                  ref={videoRef}
                  src={videoFile.path}
                  height={60}
                  width={100}
                  tabIndex={0}
                  className="recording-tag"
                  onMouseEnter={toggleControls}
                  onMouseLeave={toggleControls}
                  onEnded={() => setPlayToggle(!playToggle)}
                />
                {playToggle ? (
                  <RiStopFill
                    className="absolute top-10 left-1 h-4 w-4 text-gray-200 cursor-pointer hover:text-gray-200"
                    onClick={() => handlePlayBack()}
                  />
                ) : (
                  <RiPlayFill
                    className="absolute top-10 left-1 h-4 w-4 text-gray-200 cursor-pointer hover:text-gray-200"
                    onClick={() => handlePlayBack()}
                  />
                )}
              </td>
              <td>{moment(duration).format('HH:mm:ss')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
