import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoAlarmSharp } from 'react-icons/io5';
import BlinkerModal from './HeaderModal';
import headerIcon from '../../../../assets/icons/headerIcon.png';

export const handleEntity = ({
  workSpaceId,
  hubId,
  listId
}: {
  workSpaceId: string | undefined;
  hubId: string | undefined;
  listId: string | undefined;
}): string => {
  return hubId !== '' ? `/${workSpaceId}/tasks/h/${hubId}` : `/${workSpaceId}/tasks/l/${listId}`;
};

export default function AdditionalHeader() {
  const { screenRecording, duration, timerStatus } = useAppSelector((state) => state.task);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { activeTabId: tabsId, timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const navigate = useNavigate();
  const { activeEntityName } = useAppSelector((state) => state.workspace);

  const sameEntity = () => activeItemId === (timerLastMemory.hubId || timerLastMemory.listId);

  const timeBlinkerCheck = () => (timerStatus && sameEntity() && tabsId !== 6) || (!sameEntity() && timerStatus);

  const { activeTabId, workSpaceId, hubId, listId } = timerLastMemory;

  const handleResetTimer = () => {
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId }));
    navigate(handleEntity({ workSpaceId, hubId, listId }), { replace: true });
  };

  return (
    <div className="flex items-center justify-between w-full px-4 border-b" style={{ height: '50px' }}>
      <h1 style={{ height: '50px' }} className="flex items-center ml-4 space-x-3 text-center">
        <p className="p-1 bg-gray-300 rounded-md ">
          <img src={headerIcon} alt="" className="w-6 h-6" />
        </p>
        <span className="text-lg font-bold">{activeEntityName}</span>
      </h1>
      <div className="flex items-center justify-center space-x-2">
        {timeBlinkerCheck() && (
          <div
            className="flex items-center px-2 py-1 space-x-1 border border-purple-500 rounded-lg cursor-pointer"
            onClick={() => handleResetTimer()}
          >
            <IoAlarmSharp className="text-purple-500" />
            <div className="items-center">
              {duration.h < 10 ? `0${duration.h}` : duration.h}
              {':'}
              {duration.m < 10 ? `0${duration.m}` : duration.m}
              {':'}
              {duration.s < 10 ? `0${duration.s}` : duration.s}
            </div>
          </div>
        )}
        <MdTab className="w-5 h-5" />
        {screenRecording === 'recording' && (
          <div className="relative w-2" onMouseEnter={() => setShow(!show)}>
            <div className="flex items-center justify-start w-5 h-5 border-red-600 rounded-full">
              <div className="w-3 h-3 bg-red-600 rounded-full pulsate"></div>
            </div>
            {show && <BlinkerModal toggleFn={setShow} />}
          </div>
        )}
        <HiOutlineUpload className="w-5 h-5" />
        <BsFillGrid3X3GapFill className="w-5 h-5" />
        <MdHelpOutline className="w-5 h-5" />
      </div>
    </div>
  );
}
