import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  EndTimeEntriesService,
  GetTimeEntriesService,
  StartTimeEntryService
} from '../../../../features/task/taskService';
import {
  setActiveTimeout,
  setTimerDetails,
  setTimerInterval,
  setTimerStatus,
  setUpdateTimerDuration
} from '../../../../features/task/taskSlice';
import { useParams } from 'react-router-dom';
import { setTimerLastMemory } from '../../../../features/workspace/workspaceSlice';
import ClockLog from './ClockLog';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import AutomaticTimeElement from './AutomaticTimeElement';
import { ClockIcon } from '../../../../assets/icons/ClockIcon';
import { ManualTimeElement } from './ManualTimeElement';
import { runTimer } from '../../../../utils/timeCounter';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const dispatch = useAppDispatch();
  const { workSpaceId, hubId, subhubId, listId, taskId } = useParams();

  const { activeItemId, activeItemType, activeTabId, timerLastMemory, activeSubTimeClockTabId } = useAppSelector(
    (state) => state.workspace
  );
  const { timerStatus, duration, period, timerDetails } = useAppSelector((state) => state.task);
  const { clock_limit, clock_stop_reminder } = useAppSelector((state) => state.userSetting);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [, setBtnClicked] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [newTimer, setNewtimer] = useState(false);
  const [activeClockTab, setActiveClockTab] = useState<string>('Real Time');

  const [page, setPage] = useState<number>(1);
  const { data: getTaskEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType,
    page,
    include_filters: true
  });

  // Get currently active timers
  const { data: getCurrent } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
    is_active: 1
  });
  const mutation = EndTimeEntriesService();
  const { mutate } = StartTimeEntryService();

  const start = () => {
    mutate({
      taskId: activeItemId,
      type: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType
    });
    if (timerStatus) {
      return dispatch(setTimerStatus(false));
    }
    dispatch(setTimerStatus(!timerStatus));
    dispatch(setActiveTimeout({ clockLimit: clock_limit, timeoutReminder: clock_stop_reminder }));
    setRunning(true);
    dispatch(setTimerLastMemory({ workSpaceId, hubId, subhubId, listId, taskId, activeTabId }));
  };

  const stop = () => {
    mutation.mutate({
      id: activeItemId,
      description: timerDetails.description,
      is_Billable: timerDetails.isBillable
    });
    reset();
    setTime({ s: 0, m: 0, h: 0 });
    setRunning(false);
    dispatch(setTimerStatus(false));
    dispatch(setActiveTimeout({ clockLimit: 0, timeoutReminder: 0 }));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
    dispatch(setTimerInterval());
  };

  function timerCheck() {
    if (
      (activeItemType === EntityType.hub || activeItemType === EntityType.list || activeItemType === EntityType.task) &&
      (activeItemId === timerLastMemory.hubId ||
        activeItemId === timerLastMemory.listId ||
        activeItemId === timerLastMemory.taskId)
    ) {
      return (
        <div className="items-center text-alsoit-text-md">
          {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(duration.s).padStart(
            2,
            '0'
          )}`}
        </div>
      );
    }
    return (
      <div className="items-center text-alsoit-text-md">
        {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`}
      </div>
    );
  }

  const activeTimerCheck = () => {
    if (timerStatus) {
      setPrompt(true);
    } else {
      start();
      setPrompt(false);
    }
  };

  const handleTimeSwitch = () => {
    stop();
    setPrompt(false);
    setNewtimer(!newTimer);
  };

  const sameEntity = () => activeItemId === (timerLastMemory.taskId || timerLastMemory.hubId || timerLastMemory.listId);
  const handleEndTimeChange = (value: string) => {
    dispatch(setTimerDetails({ ...timerDetails, isBillable: timerDetails.isBillable, description: value }));
  };

  const reset = () => {
    clearInterval(period);
    setBtnClicked(false);
    setTime({ s: 0, m: 0, h: 0 });
  };

  const activeTrackers = getCurrent?.data.time_entries.filter(
    (tracker) => tracker.team_member.user.id !== currentUserId
  );

  const RunTimer = runTimer({ isRunning: isRunning, setTime: setTime, timerType: 'time-clock' });

  const timeTabs = [
    {
      id: 0,
      element: (
        <AutomaticTimeElement
          activeTimerCheck={activeTimerCheck}
          activeTrackers={activeTrackers}
          getTaskEntries={getTaskEntries}
          handleTimeSwitch={handleTimeSwitch}
          prompt={prompt}
          sameEntity={sameEntity}
          setPrompt={setPrompt}
          stop={stop}
          timerCheck={timerCheck}
        />
      ),
      title: 'Real Time'
    },
    {
      id: 1,
      element: <ManualTimeElement activeTrackers={activeTrackers} />,
      title: 'Manual'
    }
  ];

  const firstPage = () => setPage(1);
  const lastPage = () => setPage((page * 100) / 100);
  const pageLinks = Array(getTaskEntries?.data.pagination.page)
    .fill(0)
    .map((_, index) => index + 1);

  useEffect(() => {
    RunTimer;
  }, [isRunning]);

  useEffect(() => {
    newTimer && start();
  }, [newTimer]);

  return (
    <div className="p-2 mt-6 bg-white">
      {/* Clock Counter */}
      <div className="bg-alsoit-gray-50 rounded-lg py-2 px-0.5 flex flex-col space-y-2">
        {/* Timer section */}
        <div className="flex w-1/2 justify-between items-center">
          {timeTabs.map((entry) => (
            <div
              key={entry.id}
              className={`text-alsoit-text-xi ${
                entry.title.toUpperCase() === activeClockTab.toUpperCase() &&
                'text-alsoit-purple-300 border-b-2 border-alsoit-purple-300'
              } py-0.5 w-1/2 text-center cursor-pointer`}
              onClick={() => setActiveClockTab(entry.title)}
            >
              {entry.title}
            </div>
          ))}
        </div>
        {/* Automatic Timers */}
        {activeClockTab === 'Real Time' && (
          <>
            <section
              id="body"
              className="px-2 text-white bg-alsoit-gray-50 rounded-md border-t-2 border-l-2 border-alsoit-gray-100 relative"
            >
              <label
                htmlFor=""
                className="absolute -top-0 -left-0 bg-alsoit-gray-75 text-alsoit-gray-50 rounded-t-sm p-0.5 flex space-x-1 items-center font-semibold pr-1"
              >
                <ClockIcon fixed />
                <span className="text-alsoit-text-md">REAL TIME</span>
              </label>
              {/* Interface Tabs */}
              {activeSubTimeClockTabId === 0 && (
                <AutomaticTimeElement
                  activeTimerCheck={activeTimerCheck}
                  activeTrackers={activeTrackers}
                  getTaskEntries={getTaskEntries}
                  handleTimeSwitch={handleTimeSwitch}
                  prompt={prompt}
                  sameEntity={sameEntity}
                  setPrompt={setPrompt}
                  stop={stop}
                  timerCheck={timerCheck}
                />
              )}
            </section>
            {/* Memo and tags */}
            <div id="descNote" className="w-full mt-1 text-white">
              <input
                type="text"
                name="description"
                onChange={(e) => handleEndTimeChange(e.target.value)}
                placeholder="Enter memo"
                className="w-full border rounded-md shadow-sm py-0.5 text-alsoit-gray-200 text-alsoit-text-xi"
              />
            </div>
          </>
        )}
        {activeClockTab === 'Manual' && <ManualTimeElement activeTrackers={activeTrackers} />}
      </div>
      {/* Clock Log */}
      <div className="w-full p-2 my-4 flex flex-col space-y-2 bg-alsoit-gray-50 rounded-lg">
        <VerticalScroll>
          <div className="h-96">
            <ClockLog getTaskEntries={getTaskEntries} />
          </div>
        </VerticalScroll>
        <div className="flex space-x-1">
          <div className="cursor-pointer">
            <ArrowLeft />
          </div>
          <PaginationLinks arr={pageLinks} />
        </div>
      </div>
    </div>
  );
}
