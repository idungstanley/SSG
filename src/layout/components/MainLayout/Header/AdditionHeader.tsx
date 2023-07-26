import { useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { useEffect, useState } from 'react';
import BlinkerModal from './RecordBlinkerOptions';
import headerIcon from '../../../../assets/icons/headerIcon.png';
import { useCurrentTime } from '../../../../features/task/taskService';
import dayjs from 'dayjs';
import HeaderModal from '../../../../components/Header/HeaderModal';
import TimerModal from './TimerOptions';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import HeaderTimeModal from './HeaderTimeModal';
import ArrowCaretUp from '../../../../assets/icons/ArrowCaretUp';
import AlarmClockIcon from '../../../../assets/icons/AlarmClockicon';
import ArrowCaretDown from '../../../../assets/icons/ArrowCaretDown';

export default function AdditionalHeader() {
  const { screenRecording, duration, timerStatus } = useAppSelector((state) => state.task);
  const [recordBlinker, setRecordBlinker] = useState<boolean>(false);
  const [timerModal, setTimerModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { activeTabId: tabsId, timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const { period } = useAppSelector((state) => state.task);
  const { timezone: zone } = useAppSelector((state) => state.userSetting);
  const [clockModal, setClockModal] = useState<boolean>(false);
  const [HeaderClock, setClock] = useState<string>(dayjs().format('DD-MM-YYYY hh:mm'));
  const [showClock, setShowClock] = useState<{ show: boolean; withDay: boolean; showMinimal: boolean }>({
    show: true,
    withDay: false,
    showMinimal: false
  });
  const [iconToggle, setIconToggle] = useState<{ alarmIcon: boolean; arrowUp: boolean; arrowDown: boolean }>({
    alarmIcon: false,
    arrowUp: false,
    arrowDown: false
  });
  const { workSpaceId: workspaceId } = useParams();
  const { activeEntityName } = useAppSelector((state) => state.workspace);
  const { refetch } = useCurrentTime({ workspaceId });

  const headerClockFn = () =>
    window.setInterval(() => {
      setClock(dayjs().format('DD-MM-YYYY hh:mm'));
    }, 6000);
  const sameEntity = () => activeItemId === (timerLastMemory.hubId || timerLastMemory.listId || timerLastMemory.taskId);

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
      if (period) clearInterval(period);
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
        <span className="text-alsoit-text-lg font-bold">{activeEntityName}</span>
      </h1>
      <div className="relative flex items-center justify-center space-x-2">
        {timeBlinkerCheck() && (
          <div
            className="flex items-center px-2 py-1 space-x-1 border border-alsoit-purple-300 rounded-lg cursor-pointer"
            onClick={() => setTimerModal(!timerModal)}
          >
            <div
              onMouseEnter={() =>
                setIconToggle((prev) => ({
                  ...prev,
                  alarmIcon: true
                }))
              }
              onMouseLeave={() =>
                setIconToggle((prev) => ({
                  ...prev,
                  alarmIcon: false
                }))
              }
            >
              <AlarmClockIcon active={iconToggle.alarmIcon} />
            </div>
            <div className="items-center">
              {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(
                duration.s
              ).padStart(2, '0')}`}
            </div>
            {timerModal ? (
              <div
                className="flex items-center"
                onMouseEnter={() =>
                  setIconToggle((prev) => ({
                    ...prev,
                    arrowUp: true
                  }))
                }
                onMouseLeave={() =>
                  setIconToggle((prev) => ({
                    ...prev,
                    arrowUp: false
                  }))
                }
              >
                <ArrowCaretUp active={iconToggle.arrowUp} />
              </div>
            ) : (
              <div
                className="flex items-center"
                onMouseEnter={() =>
                  setIconToggle((prev) => ({
                    ...prev,
                    arrowDown: true
                  }))
                }
                onMouseLeave={() =>
                  setIconToggle((prev) => ({
                    ...prev,
                    arrowUp: false
                  }))
                }
              >
                <ArrowCaretDown active={iconToggle.arrowDown} />
              </div>
            )}
            {timerModal && (
              <HeaderModal toggleFn={setTimerModal} styles="top-8 right-1">
                <TimerModal />
              </HeaderModal>
            )}
          </div>
        )}
        <MdTab className="w-5 h-5" />
        {screenRecording === 'recording' && (
          <div className="relative w-2" onMouseEnter={() => setRecordBlinker(!recordBlinker)}>
            <div className="flex items-center justify-start w-5 h-5 border-alsoit-danger rounded-full">
              <div className="w-3 h-3 bg-alsoit-danger rounded-full pulsate"></div>
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
        <MdHelpOutline className="w-5 h-5" />
        <div
          className="relative w-16 font-semibold text-alsoit-text-lg text-alsoit-text border-alsoit-border-base border-alsoit-text rounded-md p-0.5 flex justify-center flex-col space-y-0 cursor-pointer"
          onClick={() => setClockModal(!clockModal)}
          onMouseEnter={() => setShowClock((prev) => ({ ...prev, showMinimal: true }))}
          onMouseLeave={() => setShowClock((prev) => ({ ...prev, showMinimal: false }))}
        >
          <span className="text-center text-alsoit-text-md">
            {moment(HeaderClock, 'DD-MM-YYYY hh:mm').format('hh:mm')}
          </span>
          <span className="text-center text-alsoit-text-md">
            {moment(HeaderClock, 'DD-MM-YYYY hh:mm').format('DD-MM-YYYY')}
          </span>
          {clockModal && (
            <HeaderModal clickAway={true} toggleFn={setClockModal} styles="top-10 right-28">
              <HeaderTimeModal />
            </HeaderModal>
          )}
          {showClock.showMinimal && !clockModal && (
            <HeaderModal toggleFn={setClockModal} styles="top-10 -left-4">
              <span className="bg-alsoit-gray-50 font-semibold text-alsoit-text-lg shadow-lg p-1 rounded border-alsoit-border-base border-alsoit-gray-75">
                {dayjs().format('ddd MMMM DD, YYYY')}
              </span>
            </HeaderModal>
          )}
        </div>
      </div>
    </div>
  );
}
