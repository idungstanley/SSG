import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { useEffect, useState } from 'react';
import BlinkerModal from './RecordBlinkerOptions';
import headerIcon from '../../../../assets/icons/headerIcon.png';
import { EndTimeEntriesService, useCurrentTime } from '../../../../features/task/taskService';
import dayjs from 'dayjs';
import HeaderModal from '../../../../components/Header/HeaderModal';
import TimerModal from './TimerOptions';
import { useParams } from 'react-router-dom';
import HeaderTimeModal from './HeaderTimeModal';
import ArrowCaretUp from '../../../../assets/icons/ArrowCaretUp';
import AlarmClockIcon from '../../../../assets/icons/AlarmClockicon';
import ArrowCaretDown from '../../../../assets/icons/ArrowCaretDown';
import moment from 'moment-timezone';
import { toast } from 'react-hot-toast';
import SaveFilterToast from '../../../../components/TasksHeader/ui/Filter/ui/Toast';
import { setTimerInterval, setTimerStatus, setUpdateTimerDuration } from '../../../../features/task/taskSlice';

const hoursToMilliseconds = 60 * 60 * 1000;
const minutesToMilliseconds = 60 * 1000;

export default function AdditionalHeader() {
  const { workSpaceId: workspaceId } = useParams();
  const dispatch = useAppDispatch();
  const userTimeZoneFromLS: string | null = localStorage.getItem('userTimeZone');

  const { activeTabId: tabsId, timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const { screenRecording, duration, recorderDuration, timerStatus, period, timerDetails, activeTimeOut } =
    useAppSelector((state) => state.task);
  const { timezone: zone, date_format, time_format, is_clock_time } = useAppSelector((state) => state.userSetting);
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const [recordBlinker, setRecordBlinker] = useState<boolean>(false);
  const [timerModal, setTimerModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [clockModal, setClockModal] = useState<boolean>(false);
  const [HeaderClock, setClock] = useState<string>(
    zone
      ? moment.tz(userTimeZoneFromLS ?? zone).format(time_format === '1' ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY h:mm a')
      : moment().format(time_format === '1' ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY h:mm a')
  );
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

  const { refetch } = useCurrentTime({ workspaceId });
  const { mutate } = EndTimeEntriesService();

  const stop = () => {
    mutate({
      id: activeItemId,
      is_Billable: timerDetails.isBillable,
      description: timerDetails.description
    });
    dispatch(setTimerStatus(false));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ h: 0, s: 0, m: 0 }));
    dispatch(setTimerInterval());
  };

  const notificationhandler = ({
    period,
    type,
    message,
    title
  }: {
    period: number;
    type: string;
    message: string;
    title: string;
  }) => {
    setTimeout(() => {
      toast.custom((t) => <SaveFilterToast title={title} body={message} toastId={t.id} extended="clockReminder" />, {
        position: 'bottom-right',
        duration: Infinity
      });
    }, period * (type === 'hours' ? hoursToMilliseconds : minutesToMilliseconds));

    setTimeout(
      () => stop(),
      activeTimeOut.clockLimit * (type === 'hours' ? hoursToMilliseconds : minutesToMilliseconds)
    );
  };

  const sameEntity = () =>
    activeItemId === timerLastMemory.hubId ||
    activeItemId === timerLastMemory.listId ||
    activeItemId === timerLastMemory.taskId;

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
    activeTimeOut.clockLimit !== 0 &&
      notificationhandler({
        period: activeTimeOut.timeoutReminder,
        type: 'hours',
        title: 'Timer about to Expire!',
        message: `Your active timer is about to expire in ${
          activeTimeOut.clockLimit - activeTimeOut.timeoutReminder
        } hours. Would you want to stop it now?`
      });
  }, [isVisible, refetch, timerStatus]);

  useEffect(() => {
    if (dayjs.tz.guess() !== zone && (!userTimeZoneFromLS || userTimeZoneFromLS !== dayjs.tz.guess())) {
      toast.custom(
        (t) => (
          <SaveFilterToast
            title="You are in a different timezone"
            body="Would you want to use the current timezone for this location?"
            toastId={t.id}
            extended="timeZone"
            extendedState={dayjs.tz.guess()}
          />
        ),
        {
          position: 'bottom-right',
          duration: Infinity
        }
      );
    }
    const headerClockFn = () =>
      window.setInterval(() => {
        setClock(
          zone
            ? moment()
                .tz(userTimeZoneFromLS ?? zone)
                .format(time_format === '1' ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY h:mm a')
            : moment().format(time_format === '1' ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY h:mm a')
        );
      }, 6000);

    return () => document.addEventListener('visibilitychange', headerClockFn);
  }, [zone]);

  return (
    <div className="flex items-center justify-between w-full px-4 border-b" style={{ height: '50px' }}>
      <h1 style={{ height: '50px' }} className="flex items-center ml-4 space-x-3 text-center">
        <p className="p-1 bg-gray-300 rounded-md ">
          <img src={headerIcon} alt="" className="w-6 h-6" />
        </p>
        <span className="text-alsoit-text-lg font-bold">{activeItemName}</span>
      </h1>
      <div className="relative flex items-center justify-center space-x-2.5">
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
        <MdTab className="w-5 h-5" style={{ color: 'orange' }} />
        {screenRecording === 'recording' && tabsId !== 6 && (
          <div className="relative w-16 flex space-x-0.5" onMouseEnter={() => setRecordBlinker(!recordBlinker)}>
            <div className="flex items-center justify-start w-5 h-5 border-alsoit-danger rounded-full">
              <div className="w-3 h-3 bg-alsoit-danger rounded-full pulsate"></div>
            </div>
            <div className="w-2/3">
              {`${String(recorderDuration.h).padStart(2, '0')}:${String(recorderDuration.m).padStart(2, '0')}:${String(
                recorderDuration.s
              ).padStart(2, '0')}`}
            </div>
            {recordBlinker && (
              <HeaderModal toggleFn={setRecordBlinker}>
                <BlinkerModal />
              </HeaderModal>
            )}
          </div>
        )}
        <HiOutlineUpload className="w-5 h-5" style={{ color: 'orange' }} />
        <BsFillGrid3X3GapFill className="w-5 h-5" style={{ color: 'orange' }} />
        <MdHelpOutline className="w-5 h-5" style={{ color: 'orange' }} />
        {is_clock_time === 1 && (
          <div
            className="relative w-16 font-semibold text-alsoit-text-lg text-alsoit-text border-alsoit-border-base border-alsoit-text rounded-md p-0.5 flex justify-center flex-col space-y-0 cursor-pointer"
            onClick={() => setClockModal(!clockModal)}
            onMouseEnter={() => setShowClock((prev) => ({ ...prev, showMinimal: true }))}
            onMouseLeave={() => setShowClock((prev) => ({ ...prev, showMinimal: false }))}
          >
            <span className="text-center text-alsoit-text-md">
              {time_format === '0'
                ? moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm a`).format('h:mm a')
                : moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm a`).format('HH:mm')}
            </span>
            <span className="text-center text-alsoit-text-md">
              {moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm`).format(
                date_format?.toUpperCase() ?? 'MM-DD-YYYY'
              )}
            </span>
            {clockModal && (
              <HeaderModal clickAway={true} toggleFn={setClockModal} styles="top-10 right-32 w-44">
                <HeaderTimeModal />
              </HeaderModal>
            )}
            {showClock.showMinimal && !clockModal && (
              <HeaderModal toggleFn={setClockModal} styles="top-10 -right-5 h-12 w-28">
                <span className="bg-alsoit-gray-50 font-semibold text-alsoit-text-lg shadow-lg rounded border-alsoit-border-base border-alsoit-gray-75 text-center">
                  <p>{dayjs().format('DD MMMM, YYYY')}</p>
                  <p>{dayjs().format('dddd')}</p>
                </span>
              </HeaderModal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
