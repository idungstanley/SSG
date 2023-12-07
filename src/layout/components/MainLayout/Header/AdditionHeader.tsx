import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useEffect, useState } from 'react';
import BlinkerModal from './RecordBlinkerOptions';
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
import { runTimer } from '../../../../utils/TimerCounter';
import { pilotTabs } from '../../../../app/constants/pilotTabs';
import InsightsIcon from '../../../../assets/icons/InsightsIcon';
import { StopIcon } from '../../../../assets/icons/StopIcon';
import ToolTip from '../../../../components/Tooltip/Tooltip';
import { pages } from '../../../../app/constants/pages';
import AlsoHrIcon from '../../../../assets/icons/AlsoHrIcon';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { findCurrentHub } from '../../../../managers/Hub';
import { findCurrentWallet } from '../../../../managers/Wallet';
import { findCurrentList } from '../../../../managers/List';
import { ListColourProps } from '../../../../components/tasks/ListItem';
import { Hub, List } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { AvatarWithInitials } from '../../../../components';
import { getInitials } from '../../../../app/helpers';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import { FaFolderOpen } from 'react-icons/fa';
import ListIconComponent from '../../../../components/ItemsListInSidebar/components/ListIconComponent';
import NewWindowIcon from '../../../../assets/icons/NewWindowIcon';
import UploadHeaderIcon from '../../../../assets/icons/UploadHeaderIcon';
import FourSquareIcon from '../../../../assets/icons/FourSquareIcon';
import QuestionIcon from '../../../../assets/icons/QuestionIcon';

const hoursToMilliseconds = 60 * 60 * 1000;
const minutesToMilliseconds = 60 * 1000;

interface IAdditionalHeaderProps {
  isInsights?: boolean;
}

export default function AdditionalHeader({ isInsights }: IAdditionalHeaderProps) {
  const { workSpaceId: workspaceId, hubId, subhubId, walletId, listId } = useParams();
  const dispatch = useAppDispatch();
  const userTimeZoneFromLS: string | null = localStorage.getItem('userTimeZone');

  const { activeTabId: tabsId, timerLastMemory, activeItemId } = useAppSelector((state) => state.workspace);
  const { screenRecording, duration, recorderDuration, timerStatus, period, timerDetails, activeTimeOut } =
    useAppSelector((state) => state.task);
  const { timezone: zone, date_format, time_format, is_clock_time } = useAppSelector((state) => state.userSetting);
  const { activeItemName, activePlaceId } = useAppSelector((state) => state.workspace);
  const { hub } = useAppSelector((state) => state.hub);
  const { listColour } = useAppSelector((state) => state.list);

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
  const [timerefetched, setTimeRefetch] = useState<boolean>(false);

  const { refetch, data } = useCurrentTime({ workspaceId });
  const { mutate } = EndTimeEntriesService();

  const activeEntityId = hubId || subhubId || walletId || listId;

  const generateHeaderImage = (activeEntityId: string) => {
    let currentItem = null;
    if (hubId || subhubId) {
      currentItem = findCurrentHub(activeEntityId as string, hub);
      return generateHubImage(currentItem, hubId ? EntityType.hub : EntityType.subHub);
    } else if (walletId) {
      currentItem = findCurrentWallet(activeEntityId as string, hub);
      return (
        <>
          <FaFolderOpen className="h-5 w-7" color={currentItem.color || 'black'} />
          {generateEntityName(currentItem.name)}
        </>
      );
    } else if (listId) {
      currentItem = findCurrentList(activeEntityId as string, hub);
      return generateListIcon(currentItem);
    } else {
      return <div className="w-7 h-7" />;
    }
  };

  const generateEntityName = (name: string) => {
    return (
      <ToolTip title={activeItemName}>
        <span className="font-bold text-left truncate w-72 text-alsoit-text-lg">
          {activeItemName || name ? Capitalize(activeItemName ? activeItemName : name) : ''}
        </span>
      </ToolTip>
    );
  };

  const generateHubImage = (item: Hub, type: string) => {
    return (
      <>
        <div className="flex items-center justify-center w-7 h-7">
          {item.path !== null ? (
            <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
          ) : (
            <AvatarWithInitials
              initials={getInitials(item.name)}
              height="h-7"
              width="w-7"
              textSize="14px"
              roundedStyle="rounded"
              backgroundColour={item.color ? item.color : type === EntityType.hub ? 'orange' : 'blue'}
            />
          )}
        </div>
        {generateEntityName(item.name)}
      </>
    );
  };

  const generateListIcon = (item: List) => {
    if (item.color) {
      const color: ListColourProps = JSON.parse(item.color as string) as ListColourProps;
      const innerColour = item?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
      const outerColour = item?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
      return (
        <>
          <ListIconComponent
            shape={item.shape ? item.shape : 'solid-circle'}
            innerColour={innerColour}
            outterColour={outerColour}
            isHeader={true}
          />
          {generateEntityName(item.name)}
        </>
      );
    }
  };

  const RunTimer = runTimer({ isRunning: timerefetched });

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

  const timeBlinkerCheck = () =>
    (timerStatus && sameEntity() && tabsId !== pilotTabs.UTILITIES) || (!sameEntity() && timerStatus);

  useEffect(() => {
    const userZone = dayjs.tz.guess();
    localStorage.setItem('userTimeZone', userZone);
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
    if (data?.data.time_entry) {
      setTimeRefetch(!timerefetched);
    }
  }, [data]);

  useEffect(() => {
    const autoZone = dayjs.tz.guess();
    if (autoZone !== zone && (userTimeZoneFromLS !== autoZone || !userTimeZoneFromLS)) {
      toast.custom(
        (t) => (
          <SaveFilterToast
            title="You are in a different timezone"
            body="Would you want to use the current timezone for this location?"
            toastId={t.id}
            extended="timeZone"
            extendedState={autoZone}
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

  useEffect(() => {
    RunTimer;
  }, [timerefetched]);

  const renderPageTitle = () => {
    if (isInsights) {
      return (
        <>
          <InsightsIcon />
          <span className="font-bold truncate text-alsoit-text-lg">INSIGHTS</span>
        </>
      );
    } else if (activePlaceId === pages.ALSO_HR) {
      return (
        <>
          <AlsoHrIcon />
          <span className="font-bold truncate text-alsoit-text-lg">ALSO HR</span>
        </>
      );
    } else {
      return generateHeaderImage(activeEntityId as string);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 border-b" style={{ height: '50px' }}>
      <h1
        style={{ height: '50px' }}
        className={`flex items-center ml-0 ${activePlaceId === pages.ALSO_HR ? '' : 'space-x-3'}`}
      >
        {renderPageTitle()}
      </h1>
      <div className="relative flex items-center justify-center space-x-2.5">
        {timeBlinkerCheck() && (
          <div
            className="flex items-center px-2 py-1 space-x-1 border rounded-lg cursor-pointer border-alsoit-purple-300"
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
            <div className="flex space-x-0.5 items-center">
              <StopIcon className="w-4 h-4 cursor-pointer" onClick={stop} />
              <span className="tracking-wide">
                {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(
                  duration.s
                ).padStart(2, '0')}`}
              </span>
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
        <NewWindowIcon color="orange" />
        {screenRecording === 'recording' && tabsId !== pilotTabs.TIME_CLOCK && (
          <div className="relative w-16 flex space-x-0.5" onMouseEnter={() => setRecordBlinker(!recordBlinker)}>
            <div className="flex items-center justify-start w-5 h-5 rounded-full border-alsoit-danger">
              <div className="w-3 h-3 rounded-full bg-alsoit-danger pulsate"></div>
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
        <UploadHeaderIcon color="orange" />
        <FourSquareIcon color="orange" />
        <QuestionIcon color="orange" />
        {is_clock_time === 1 && (
          <div
            className="relative font-semibold text-alsoit-text-lg text-alsoit-text p-0.5 flex justify-center cursor-pointer"
            onClick={() => setClockModal(!clockModal)}
            onMouseEnter={() => setShowClock((prev) => ({ ...prev, showMinimal: true }))}
            onMouseLeave={() => setShowClock((prev) => ({ ...prev, showMinimal: false }))}
          >
            <span className="mr-1 text-center text-alsoit-text-lg">
              {moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm`).format(
                date_format?.toUpperCase() ?? 'MM-DD-YYYY'
              )}
            </span>
            <span className="text-center text-alsoit-text-lg">
              {time_format === '0'
                ? moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm a`).format('h:mm a')
                : moment(HeaderClock, `${date_format?.toLocaleUpperCase()} HH:mm a`).format('HH:mm')}
            </span>
            {clockModal && (
              <HeaderModal clickAway={false} toggleFn={setClockModal} styles="top-10 right-36 w-44">
                <HeaderTimeModal />
              </HeaderModal>
            )}
            {showClock.showMinimal && !clockModal && (
              <HeaderModal toggleFn={setClockModal} styles="top-10 -right-1 w-36">
                <span className="font-semibold text-center text-alsoit-text-lg border-alsoit-border-base">
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
