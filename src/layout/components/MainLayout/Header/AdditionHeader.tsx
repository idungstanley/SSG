import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { GetTimeEntriesService, useMediaStream } from '../../../../features/task/taskService';
import { IRecorderLastMemory } from '../../../../features/workspace/workspace.interfaces';
import { resetWorkSpace } from '../../../../features/workspace/workspaceSlice';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { IoAlarmSharp } from 'react-icons/io5';
import moment from 'moment';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
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
  const { screenRecording } = useAppSelector((state) => state.task);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    activeItemId,
    activeItemType,
    activeTabId: tabsId,
    timerLastMemory
  } = useAppSelector((state) => state.workspace);
  const navigate = useNavigate();
  const { data: getEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === 'subhub' ? 'hub' : activeItemType
  });

  const { activeTabId, workSpaceId, hubId, listId } = timerLastMemory;

  const handleResetTimer = () => {
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId }));
    navigate(handleEntity({ workSpaceId, hubId, listId }), { replace: true });
  };

  return (
    <div className="w-full border-b flex justify-between items-center px-4" style={{ height: '50px' }}>
      <h1 style={{ height: '50px' }} className="text-center flex items-center">
        Header
      </h1>
      <div className="flex space-x-2 items-center justify-center">
        {tabsId !== 6 && (
          <div
            className="flex items-center space-x-1 border border-purple-500 py-1 px-2 rounded-lg cursor-pointer"
            onClick={() => handleResetTimer()}
          >
            <IoAlarmSharp className="text-purple-500" />
            <span>{moment.utc((getEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</span>
          </div>
        )}
        <MdTab className="w-5 h-5" />
        {screenRecording === 'recording' && (
          <div className="w-2 relative" onMouseEnter={() => setShow(!show)}>
            <div className="border-red-600 rounded-full h-5 w-5 flex items-center justify-start">
              <div className="pulsate w-3 rounded-full h-3 bg-red-600"></div>
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

interface BlinkerProps {
  toggleFn: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlinkerModal({ toggleFn }: BlinkerProps) {
  const { recorder, stream } = useAppSelector((state) => state.task);
  const { recorderLastMemory } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeTabId, workSpaceId, hubId, listId } = recorderLastMemory as IRecorderLastMemory;

  const { handleStopStream } = useMediaStream();

  const stopRecording = () => {
    handleStopStream({
      recorder,
      stream
    });
    dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId }));
    navigate(handleEntity({ workSpaceId, hubId, listId }), { replace: true });
  };
  return (
    <div
      className="flex flex-col w-64 rounded-lg shadow-2xl bg-warmGray-50 absolute right-1/2 z-50"
      tabIndex={0}
      onMouseLeave={() => toggleFn(false)}
    >
      <span className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer" onClick={() => stopRecording()}>
        Stop Recording
      </span>
      <span
        className="capitalize px-2 py-3 hover:bg-gray-300 cursor-pointer"
        onClick={() => dispatch(resetWorkSpace({ activeTabId, workSpaceId, hubId, listId }))}
      >
        Return to Recording tab
      </span>
    </div>
  );
}
