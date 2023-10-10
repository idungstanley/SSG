import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ArrowDown from '../../../../assets/icons/ArrowDown';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import ArrowUp from '../../../../assets/icons/ArrowUp';
import { TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';
import { RealTimeIcon } from '../../../../assets/icons/RealTimeIcon';
import { ManualTimeIcon } from '../../../../assets/icons/ManualTimeIcon';
import { setActiveClockTab } from '../../../../features/workspace/workspaceSlice';
import { HeaderIcons } from './TimeHeaderIcons';
import { RealTime } from './RealTime';
import { HourGlassIcon } from '../../../../assets/icons/HourGlass';
import { ManualTime } from './ManualTime';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TotalTimeIcon } from '../../../../assets/icons/TotalTimeIcon';
import { ActiveTimeStrip } from './ActiveTimeStrip';
import { TabsDropDown } from './TabsDropDown';

dayjs.extend(duration);

export function CombinedTime() {
  const dispatch = useAppDispatch();

  const { activeItemId, activeItemType, activeClockTab } = useAppSelector((state) => state.workspace);
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { timerStatus } = useAppSelector((state) => state.task);

  const [dropDown, setDropDown] = useState<{ tabDrop: boolean; activeTimeDrop: boolean }>({
    tabDrop: false,
    activeTimeDrop: false
  });

  // Get currently active timers
  const { data: getCurrent } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
    is_active: 1
  });
  const { data: getTimeEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType
  });

  const totalTime = () => {
    if (getTimeEntries?.data.total_duration) {
      const duration = dayjs.duration(getTimeEntries?.data.total_duration * 1000);
      return (
        <span className="flex items-center justify-center w-12 tracking-wide text-alsoit-text-md">
          <TotalTimeIcon className="w-4 h-4" />
          {`${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(
            duration.seconds()
          ).padStart(2, '0')}`}
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center w-12 tracking-wide text-alsoit-text-md">{`${String(0).padStart(
        2,
        '0'
      )}:${String(0).padStart(2, '0')}:${String(0).padStart(2, '0')}`}</span>
    );
  };

  const activeTrackers = getCurrent?.data.time_entries.filter(
    (tracker) => tracker.team_member.user.id !== currentUserId
  );

  const activeTrackerCheck = (): boolean => (activeTrackers && activeTrackers?.length > 0 ? true : false);

  return (
    <div
      className={`flex flex-col space-y-3.5 w-full bg-alsoit-gray-50 rounded-md ${
        activeTrackers?.length || timerStatus || activeClockTab === TIME_TABS.manual ? 'h-min' : 'h-4'
      }`}
    >
      {/* Time Trackers */}
      <div className="absolute flex items-center justify-between w-full -top-0">
        <label
          htmlFor="timeClockTrackers"
          className="relative flex items-center justify-between px-1 cursor-pointer rounded-top w-28 h-7"
          onClick={() => setDropDown((prev) => ({ ...prev, tabDrop: !prev.tabDrop }))}
        >
          <div className="cursor-pointer">
            <CollapseIcon
              active={activeTrackerCheck()}
              onToggle={() => setDropDown((prev) => ({ ...prev, activeTimeDrop: !prev.activeTimeDrop }))}
              iconColor="#dedede"
              color="#A854F7"
            />
          </div>
          {/* Active Tracker Name */}
          <span className="text-alsoit-text-md text-alsoit-gray-200">{activeClockTab}</span>
          {dropDown.tabDrop ? <ArrowUp /> : <ArrowDown />}
          {dropDown.tabDrop && (
            <TabsDropDown header="time category" subHeader="select category" styles="w-44 top-7 left-7">
              {[
                { entry: TIME_TABS.realTime, icon: <RealTimeIcon /> },
                { entry: TIME_TABS.manual, icon: <ManualTimeIcon /> }
              ].map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2.5 hover:bg-alsoit-gray-50"
                  onClick={() => dispatch(setActiveClockTab(item.entry))}
                >
                  <div className="flex space-x-1.5 w-full">
                    {item.icon}
                    <span>{item.entry}</span>
                  </div>
                </div>
              ))}
            </TabsDropDown>
          )}
        </label>
        {/* Counter and Icons */}
        {activeClockTab === TIME_TABS.realTime && (
          <div className="flex items-center space-x-0.5">
            <div className="flex items-center relative border bg-white rounded px-0.5 py-1 border-alsoit-success">
              {totalTime()}
              <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">Total Time</span>
            </div>
            <div className="relative flex items-center px-2 py-1 bg-white border rounded border-alsoit-success">
              <RealTime />
              <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">My Time</span>
            </div>
            <div className="bg-white p-0.5 rounded cursor-pointer">
              <HourGlassIcon className="w-4 h-4 " />
            </div>
            <HeaderIcons />
          </div>
        )}
      </div>
      {/* Manual Time */}
      {activeClockTab === TIME_TABS.manual && <ManualTime />}
      {/* Active Time Log entries */}
      <div className="py-3.5 px-1.5 w-full">
        {timerStatus && (
          <div className="flex flex-col">
            <div className="flex items-center w-full">
              <span className="flex items-center justify-center w-20 font-semibold uppercase text-alsoit-text-xi">
                user
              </span>
              <span className="flex items-center justify-center w-20 font-semibold uppercase text-alsoit-text-xi">
                timer
              </span>
              <span className="flex items-center justify-center w-20 font-semibold uppercase text-alsoit-text-xi">
                start date
              </span>
            </div>
            <ActiveTimeStrip timeData={getCurrent?.data.time_entries} />
          </div>
        )}
      </div>
    </div>
  );
}
