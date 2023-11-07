import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ArrowDown from '../../../../assets/icons/ArrowDown';
import { useTimeEntriesQuery } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import ArrowUp from '../../../../assets/icons/ArrowUp';
import { TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';
import { RealTimeIcon } from '../../../../assets/icons/RealTimeIcon';
import { ManualTimeIcon } from '../../../../assets/icons/ManualTimeIcon';
import { setActiveClockTab } from '../../../../features/workspace/workspaceSlice';
import { HeaderIcons } from './TimeHeaderIcons';
import { RealTime } from './RealTime';
import { ManualTime } from './ManualTime';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { ActiveTimeStrip } from './ActiveTimeStrip';
import { TabsDropDown } from './TabsDropDown';
import { TotalTime } from './TotalTime';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';

dayjs.extend(duration);

interface Props {
  timeData: ITimeEntriesRes | undefined;
}

export function CombinedTime({ timeData }: Props) {
  const dispatch = useAppDispatch();

  const { activeItemId, activeItemType, activeClockTab } = useAppSelector((state) => state.workspace);
  const { timerStatus } = useAppSelector((state) => state.task);

  const [dropDown, setDropDown] = useState<{ tabDrop: boolean; activeTimeDrop: boolean }>({
    tabDrop: false,
    activeTimeDrop: false
  });

  // Get currently active timers
  const { data: getCurrent } = useTimeEntriesQuery({
    id: activeItemId,
    type: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
    is_active: 1
  });

  return (
    <div className={'flex flex-col w-full rounded-md'}>
      {/* Time Trackers */}
      <div className="absolute w-full -top-0" style={{ whiteSpace: 'nowrap' }}>
        <div className="flex items-center space-x-6 w-full">
          <div className="absolute w-full -top-0 overflow-x-visible" style={{ whiteSpace: 'nowrap' }}>
            <div className="flex items-center justify-between space-x-6 w-full">
              <div className="flex items-center space-x-1.5">
                <label
                  htmlFor="timeClockTrackers"
                  className="relative flex items-center justify-between px-1 cursor-pointer rounded-tl-lg rounded-br-lg w-32 py-2 bg-alsoit-gray-75"
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
                  <span className="text-alsoit-text-md text-alsoit-gray-50 uppercase truncate">{activeClockTab}</span>
                  {dropDown.tabDrop ? <ArrowUp className="w-3 h-3" /> : <ArrowDown color="#FFF" className="w-2 h-2" />}
                  {dropDown.tabDrop && (
                    <TabsDropDown
                      header="time category"
                      subHeader="select category"
                      styles="w-44 top-7 left-7"
                      closeModal={() => setDropDown((prev) => ({ ...prev, tabDrop: !prev.tabDrop }))}
                    >
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
                <div className="flex items-center relative border bg-white rounded px-1.5 border-alsoit-gray-300 w-20 h-6 mt-1.5">
                  <TotalTime totalDuration={timeData?.data.total_duration} />
                  <span className="absolute -top-2 py-0.5 bg-none text-outline px-0.5 text-alsoit-text-sm">
                    Total Time
                  </span>
                </div>
              </div>
              {/* Counter and Icons */}
              <div className="w-3/6 flex justify-end pr-1.5">
                {activeClockTab === TIME_TABS.realTime && (
                  <div className="flex items-center space-x-0.5">
                    <div className="relative flex items-center px-0.5 py-1.5 w-24 bg-white border rounded border-alsoit-gray-300 h-6 mt-1">
                      <RealTime />
                      <span className="absolute -top-1.5 left-1.5 bg-none text-outline px-0.5 text-alsoit-text-sm">
                        My Time
                      </span>
                    </div>
                    <HeaderIcons />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Manual Time */}
      {activeClockTab === TIME_TABS.manual && <ManualTime />}
      {/* Active Time Log entries */}
      {timerStatus && (
        <div className="pt-7 px-1.5 w-full h-max">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 w-full">
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
        </div>
      )}
    </div>
  );
}
