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
import { ActiveTimeStrip } from './ActiveTimeStrip';
import { TabsDropDown } from './TabsDropDown';
import { TotalTime } from './TotalTime';

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
      <div className="absolute w-full -top-0" style={{ whiteSpace: 'nowrap' }}>
        <div className="flex items-center space-x-6 w-full">
          <div className="flex items-center space-x-1.5">
            <label
              htmlFor="timeClockTrackers"
              className="relative flex items-center justify-between px-1 cursor-pointer rounded-top w-32 h-7 bg-alsoit-gray-100"
              onClick={() => setDropDown((prev) => ({ ...prev, tabDrop: !prev.tabDrop }))}
            >
              <div className="cursor-pointer bg-alsoit-gray-100 rounded-xl">
                <CollapseIcon
                  active={!timerStatus}
                  onToggle={() => setDropDown((prev) => ({ ...prev, activeTimeDrop: !prev.activeTimeDrop }))}
                  iconColor="rgb(145 145 145)"
                  color="rgb(145 145 145)"
                />
              </div>
              {/* Active Tracker Name */}
              <span className="text-alsoit-text-md text-alsoit-gray-50">{activeClockTab}</span>
              {dropDown.tabDrop ? <ArrowUp /> : <ArrowDown className="w-3 h-3" />}
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
            <div className="flex items-center relative border bg-white rounded px-1.5 border-alsoit-success w-20 h-6">
              <TotalTime totalDuration={getTimeEntries?.data.total_duration} />
              <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">Total Time</span>
            </div>
          </div>
          {/* Counter and Icons */}
          <div className="w-3/6">
            {activeClockTab === TIME_TABS.realTime && (
              <div className="flex items-center space-x-0.5">
                <div className="relative flex items-center px-2 py-1 bg-white border rounded border-alsoit-success w-20 h-6">
                  <RealTime />
                  <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">My Time</span>
                </div>
                <div className="bg-white p-0.5 rounded cursor-pointer">
                  <HourGlassIcon className="w-4 h-4 " />
                </div>
                <HeaderIcons timeData={getTimeEntries} />
              </div>
            )}
          </div>
        </div>
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
