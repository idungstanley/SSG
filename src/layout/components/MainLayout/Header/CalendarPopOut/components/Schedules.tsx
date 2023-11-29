import React from 'react';
import CollapseItems from '../../../../../../components/CollapseItems';
import ViewsIcon from '../../../../../../assets/icons/ViewsIcon';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import ArrowCaretDown from '../../../../../../assets/icons/ArrowCaretDown';
import ArrowLeft from '../../../../../../assets/icons/ArrowLeft';
import ScheduleCard from './ScheduleCard';
import { VerticalScroll } from '../../../../../../components/ScrollableContainer/VerticalScroll';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import FilterIcon from '../../../../../../assets/icons/FilterIcon';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';

const scheduleData = [
  {
    day: 'Mon',
    date: '4',
    schedules: [
      { type: 'task', title: 'This is a task' },
      { type: 'meeting', title: 'This is a meeting' },
      { type: 'event', title: 'This is a calendar event' }
    ]
  },
  {
    day: 'Tue',
    date: '5',
    schedules: [
      { type: 'task', title: 'This is a task' },
      { type: 'meeting', title: 'This is a meeting' },
      { type: 'event', title: 'This is a calendar event' }
    ]
  },
  {
    day: 'Wed',
    date: '6',
    schedules: [
      { type: 'task', title: 'This is a task' },
      { type: 'meeting', title: 'This is a meeting' },
      { type: 'event', title: 'This is a calendar event' }
    ]
  },
  {
    day: 'Thu',
    date: '6',
    schedules: [
      { type: 'task', title: 'This is a task' },
      { type: 'meeting', title: 'This is a meeting' },
      { type: 'event', title: 'This is a calendar event' }
    ]
  }
];

function Schedules() {
  return (
    <div>
      <CollapseItems
        header="Schedule"
        headerTrailing={
          <div className="w-full flex items-center justify-end gap-1 mr-2">
            <ToolTip title="Search schedule" placement="left">
              <button className="h-6 w-6 bg-white rounded flex justify-center items-center">
                <SearchIcon className="w-4 h-4 hover:text-alsoit-purple-300" />
              </button>
            </ToolTip>
            <ToolTip title="Filter schedule" placement="left">
              <button className="h-6 w-6 bg-white rounded flex justify-center items-center">
                <FilterIcon />
              </button>
            </ToolTip>
          </div>
        }
      >
        <div className="mx-auto" style={{ width: '95%' }}>
          <div className="flex items-center justify-between my-1">
            <button className="h-6 rounded px-1 bg-alsoit-purple-100 text-white text-alsoit-text-md">Today</button>
            <div className="bg-alsoit-purple-50 text-alsoit-purple-300 rounded h-6 flex items-center">
              <button className="flex items-center px-1 gap-2 text-alsoit-text-md">
                <ViewsIcon />
                Views
                <span className="-rotate-90 transform">
                  <ArrowCaretDown active={false} />
                </span>
              </button>
              <button className="flex items-center px-1 gap-2 text-alsoit-text-md">
                Week
                <span className="rotate-90 transform">
                  <ArrowRight dimensions={{ width: 8, height: 8 }} />
                </span>
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <h2 className="text-alsoit-text-md">November</h2>
              <div className="flex items-center gap-2 mr-2">
                <button>
                  <ArrowLeft />
                </button>
                <button>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <VerticalScroll>
            <div className="m-auto" style={{ maxWidth: '100%', maxHeight: '43vh' }}>
              {scheduleData.map((schedule) => {
                return (
                  <div key={schedule.day} className="my-2 w-full">
                    <ScheduleCard />
                  </div>
                );
              })}
            </div>
          </VerticalScroll>
        </div>
      </CollapseItems>
    </div>
  );
}

export default Schedules;
