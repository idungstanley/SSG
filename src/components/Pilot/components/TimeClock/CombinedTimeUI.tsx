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
import { TimerCheck } from './TimeCounter';
import { HourGlassIcon } from '../../../../assets/icons/HourGlass';
import { ManualTime } from './ManualTime';

export function CombinedTime() {
  const dispatch = useAppDispatch();

  const { activeItemId, activeItemType, activeClockTab } = useAppSelector((state) => state.workspace);
  const { currentUserId } = useAppSelector((state) => state.auth);

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

  const activeTrackers = getCurrent?.data.time_entries.filter(
    (tracker) => tracker.team_member.user.id !== currentUserId
  );

  const activeTrackerCheck = (): boolean => (activeTrackers && activeTrackers?.length > 0 ? true : false);

  function TabsDropDown() {
    return (
      <div className="flex flex-col p-2 rounded-md bg-white shadow-xl w-44 absolute top-7 left-7 z-40">
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
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col space-y-1.5 w-full bg-alsoit-gray-50 rounded-md ${
        activeTrackers?.length || activeClockTab === TIME_TABS.manual ? 'h-min' : 'h-4'
      }`}
    >
      {/* Time Trackers */}
      <div className="flex justify-between items-center w-full absolute -top-0">
        <label
          htmlFor="timeClockTrackers"
          className="flex items-center justify-between rounded-top w-32 px-2 h-7 relative"
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
          {dropDown.tabDrop && TabsDropDown()}
        </label>
        {/* Counter and Icons */}
        {activeClockTab === TIME_TABS.realTime && (
          <div className="flex items-center space-x-1">
            <div className="flex items-center relative border bg-white rounded px-2.5 py-1 border-alsoit-success">
              <TimerCheck />
              <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">My Time</span>
            </div>
            <div className="bg-white p-0.5 rounded cursor-pointer">
              <HourGlassIcon className=" w-4 h-4" />
            </div>
            <HeaderIcons />
          </div>
        )}
      </div>
      {/* Manual Time */}
      {activeClockTab === TIME_TABS.manual && <ManualTime />}
      {/* Other Active Time Log entries */}
      <div className="flex flex-col">
        {/* Log headers */}
        <div className="flex"></div>
        {/* Log entries */}
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
