import { useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IoAlarmSharp } from 'react-icons/io5';
import BlinkerModal from './RecordBlinkerOptions';
import headerIcon from '../../../../assets/icons/headerIcon.png';
import { useCurrentTime } from '../../../../features/task/taskService';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import HeaderModal from '../../../../components/Header/HeaderModal';
import TimerModal from './TimerOptions';
import { useParams } from 'react-router-dom';
import DatePicker from '../../../../components/DatePicker/DatePicker';

export const handleEntity = ({
  workSpaceId,
  hubId,
  listId
}: {
  workSpaceId: string | undefined;
  hubId: string | undefined | null;
  listId: string | undefined | null;
}): string => {
  return hubId !== '' ? `/${workSpaceId}/tasks/h/${hubId}` : `/${workSpaceId}/tasks/l/${listId}`;
};

export default function AdditionalHeader() {
  const { screenRecording, duration, timerStatus } = useAppSelector((state) => state.task);
  const [recordBlinker, setRecordBlinker] = useState<boolean>(false);
  const [timerModal, setTimerModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { activeTabId: tabsId, timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const { timezone: zone } = useAppSelector((state) => state.userSetting);
  const [clockModal, setClockModal] = useState<boolean>(false);
  const [HeaderClock, setClock] = useState<string>(dayjs().format('DD-MM-YYYY hh:mm'));
  const { workSpaceId: workspaceId } = useParams();
  const { activeEntityName } = useAppSelector((state) => state.workspace);
  const { refetch } = useCurrentTime({ workspaceId });

  const headerClockFn = () =>
    window.setInterval(() => {
      setClock(dayjs().format('DD-MM-YYYY hh:mm'));
    }, 6000);
  const sameEntity = () => activeItemId === (timerLastMemory.hubId || timerLastMemory.listId);

  const timeBlinkerCheck = () => (timerStatus && sameEntity() && tabsId !== 6) || (!sameEntity() && timerStatus);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  useEffect(() => {
    headerClockFn();

    return () => document.addEventListener('visibilitychange', headerClockFn);
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-4 border-b" style={{ height: '50px' }}>
      <h1 style={{ height: '50px' }} className="flex items-center ml-4 space-x-3 text-center">
        <p className="p-1 bg-gray-300 rounded-md ">
          <img src={headerIcon} alt="" className="w-6 h-6" />
        </p>
        <span className="text-lg font-bold">{activeEntityName}</span>
      </h1>
      <div className="relative flex items-center justify-center space-x-2">
        {timeBlinkerCheck() && (
          <div
            className="flex items-center px-2 py-1 space-x-1 border border-purple-500 rounded-lg cursor-pointer"
            onMouseEnter={() => setTimerModal(!timerModal)}
          >
            <IoAlarmSharp className="text-purple-500" />
            <div className="items-center">
              {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(
                duration.s
              ).padStart(2, '0')}`}
            </div>
            {timerModal && (
              <HeaderModal toggleFn={setTimerModal} styles="top-8 -right-4">
                <TimerModal />
              </HeaderModal>
            )}
          </div>
        )}
        <MdTab className="w-5 h-5" />
        {screenRecording === 'recording' && (
          <div className="relative w-2" onMouseEnter={() => setRecordBlinker(!recordBlinker)}>
            <div className="flex items-center justify-start w-5 h-5 border-red-600 rounded-full">
              <div className="w-3 h-3 bg-red-600 rounded-full pulsate"></div>
            </div>
            {recordBlinker && (
              <HeaderModal toggleFn={setRecordBlinker}>
                <BlinkerModal />
              </HeaderModal>
            )}
          </div>
        )}
        <HiOutlineUpload className="w-5 h-5" />
        <BsFillGrid3X3GapFill className="w-5 h-5" />
        <div
          className="relative w-16 font-semibold text-alsoit-text-lg text-alsoit-text border-alsoit-border-base border-alsoit-text rounded-md p-0.5 flex justify-center flex-col space-y-0 cursor-pointer"
          onMouseEnter={() => setClockModal(!clockModal)}
        >
          <span className="text-center text-alsoit-text-md">
            {dayjs(HeaderClock, 'DD-MM-YYYY hh:mm').format('DD-MM-YYYY')}
          </span>
          <span className="text-center text-alsoit-text-md">
            {dayjs(HeaderClock, 'DD-MM-YYYY hh:mm').format('hh:mm')}
          </span>
          {clockModal && (
            <HeaderModal toggleFn={setClockModal} styles="top-7 right-28">
              <HeaderTimeModal />
            </HeaderModal>
          )}
        </div>
        <MdHelpOutline className="w-5 h-5" />
      </div>
    </div>
  );
}

function HeaderTimeModal() {
  const [time, setTime] = useState<string>(dayjs().format('hh:mm:ss'));

  const timeUpdateFn = () => window.setInterval(() => setTime(dayjs().format('hh:mm:ss')), 1000);

  useEffect(() => {
    timeUpdateFn();

    return () => document.addEventListener('visibilitychange', timeUpdateFn);
  }, []);
  return (
    <div className="flex flex-col space-y-4 w-134 z-50 bg-alsoit-gray-50 h-screen">
      <div className="flex justify-start flex-col space-y-2 w-full border-b border-alsoit-gray-300 px-4 py-6">
        <span style={{ fontSize: '35px', padding: '0 0 8px 0' }}>{time}</span>
        {dayjs().format('dddd MMMM D, YYYY')}
      </div>
      <div className="border-b border-alsoit-gray-300 px-4 py-6">
        <p className="text-center">Calendar Goes here</p>
      </div>
      <div className="w-full flex flex-col space-y-2 px-4 py-6">
        <span className="font-semibold text-alsoit-text-lg">Schedule</span>
        <input
          type="text"
          className="w-72 h-6 text-alsoit-text-md rounded border-alsoit-border-base px-1"
          placeholder="search..."
        />
        <span className="italic text-alsoit-text-md font-semibold">No activity found for the selected time</span>
      </div>
    </div>
  );
}
