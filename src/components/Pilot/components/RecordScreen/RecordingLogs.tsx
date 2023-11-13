import { MouseEvent, useRef, useState } from 'react';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { RiPlayFill, RiStopFill } from 'react-icons/ri';
import { VideoControlModal } from './VideoControlModal';
import AdaptiveModal from '../../../Dropdown/AdaptiveModal/AdaptiveModal';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import PopAssignModal from '../../../../pages/workspace/tasks/assignTask/popAssignModal';
import { IAttachments } from '../../../../features/workspace/workspace.interfaces';
import dayjs from 'dayjs';

interface Props {
  timeData?: IAttachments;
}

export default function VideoEntries({ timeData: data }: Props) {
  const [playToggle, setPlayToggle] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();
  const [controlModal, setModal] = useState<boolean>(false);
  const [showUserModals, setShowUserModals] = useState<boolean[]>(new Array(data?.data.attachments.length).fill(false));
  const [anchorEls, setAnchorEls] = useState<(HTMLTableCellElement | null)[]>(
    new Array(data?.data.attachments.length).fill(null)
  );

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const targetElementRef = useRef<HTMLTableCellElement>(null);

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

  const handleClose = (index: number) => {
    const updatedAnchorEls = [...anchorEls];
    updatedAnchorEls[index] = null;
    setAnchorEls(updatedAnchorEls);
  };

  const handleHover = (e: MouseEvent<HTMLTableCellElement>, index: number) => {
    const updatedShowUserModals = [...showUserModals];
    updatedShowUserModals[index] = !updatedShowUserModals[index];
    setShowUserModals(updatedShowUserModals);

    const updatedAnchorEls = [...anchorEls];
    updatedAnchorEls[index] = e.currentTarget;
    setAnchorEls(updatedAnchorEls);
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
    <table className="w-full p-1 mx-auto">
      <thead>
        <tr className="flex py-2 mx-2 border-b-2 space-x-9">
          <th className="font-bold capitalize">user</th>
          <th className="font-bold capitalize">recording</th>
          <th className="font-bold capitalize">format</th>
          <th className="font-bold capitalize">duration</th>
        </tr>
      </thead>
      <tbody>
        <div className="relative overflow-y-auto max-h-40">
          {data?.data.attachments.map((videoFile, index) => {
            const { created_at, updated_at, file_format } = videoFile.physical_file;
            const { color, initials, avatar_path } = videoFile.team_member.user;
            const duration = dayjs(updated_at).diff(created_at);
            const videoDuration = dayjs.duration(duration).format('HH:mm:ss');
            return (
              <tr key={videoFile.id} className="relative flex items-center p-2 space-x-8 border-b">
                <td
                  onMouseEnter={(e) => handleHover(e, index)}
                  onMouseLeave={(e) => handleHover(e, index)}
                  className="relative"
                >
                  {avatar_path ? (
                    <AvatarWithImage image_path={avatar_path} height="h-10" width="w-10" roundedStyle="circular" />
                  ) : (
                    <AvatarWithInitials initials={initials} width="w-10" height="h-10" backgroundColour={color} />
                  )}
                  {showUserModals[index] && (
                    <PopAssignModal
                      anchorEl={anchorEls[index]}
                      currHoveredOnUser={videoFile.team_member.id}
                      handleClose={() => handleClose(index)}
                      modalLoader={false}
                      spinnerSize={6}
                    />
                  )}
                </td>
                <td className="relative" ref={targetElementRef}>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={videoFile.path}
                    height={60}
                    width={60}
                    tabIndex={0}
                    className="recording-tag"
                    onMouseEnter={() =>
                      toggleControls({ index, showControls: true, videoElement: videoRefs.current[index] })
                    }
                    onEnded={() => setPlayToggle(false)}
                  />
                  {controlModal && hoverIndex === index && (
                    <AdaptiveModal styles="" targetElementRef={targetElementRef} toggleFn={setModal}>
                      <VideoControlModal
                        index={index}
                        videoElement={videoRefs.current[index]}
                        videoId={videoFile.id}
                        toggleFn={toggleControls}
                        playToggleFn={setPlayToggle}
                      />
                    </AdaptiveModal>
                  )}
                  {playToggle && hoverIndex === index ? (
                    <RiStopFill
                      className="absolute w-4 h-4 text-gray-200 cursor-pointer top-5 left-1 hover:text-gray-200"
                      onClick={() => handlePlayBack(index)}
                    />
                  ) : (
                    <RiPlayFill
                      className="absolute w-4 h-4 text-gray-200 cursor-pointer top-5 left-1 hover:text-gray-200"
                      onClick={() => handlePlayBack(index)}
                    />
                  )}
                </td>
                <td>{file_format.extension}</td>
                <td>{videoDuration}</td>
              </tr>
            );
          })}
        </div>
      </tbody>
    </table>
  );
}
