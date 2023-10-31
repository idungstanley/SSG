import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { CombinedTime } from './CombinedTimeUI';
import { useTimeEntriesQuery } from '../../../../features/task/taskService';
import { TimeInventory } from './TimeInventory';
import { setTimeAssignee, setTimeAssigneeFilter } from '../../../../features/task/taskSlice';
import { TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const dispatch = useAppDispatch();
  const { activeItemId, activeItemType, activeClockTab } = useAppSelector((state) => state.workspace);
  const { timerStatus } = useAppSelector((state) => state.task);

  const [page] = useState<number>(1);

  const { data, isSuccess } = useTimeEntriesQuery({
    id: activeItemId,
    type: activeItemType,
    include_filters: false,
    page
  });

  const pageLinks = Array(data?.data.pagination.page)
    .fill(0)
    .map((_, index) => index + 1);

  useEffect(() => {
    if (isSuccess) {
      const teamMembers = data?.data.time_entries.map((member) => member.team_member);
      dispatch(setTimeAssignee(teamMembers));
      dispatch(setTimeAssigneeFilter(data));
    }
  }, [isSuccess, timerStatus]);

  return (
    <div className="px-2 my-1.5 bg-white">
      {/* Clock Counter */}
      <div
        className={`bg-alsoit-gray-50 rounded-t-lg py-0.5 flex flex-col space-y-2 relative ${
          activeClockTab === TIME_TABS.realTime && !timerStatus ? 'h-8' : timerStatus ? 'h-min' : 'h-min'
        }`}
      >
        {/* Timer section */}
        <CombinedTime timeData={data} />
      </div>
      {/* Clock Log */}
      <div className="w-full p-1 my-2 flex flex-col space-y-2 bg-alsoit-gray-50 rounded-lg">
        {data?.data?.time_entries && data?.data?.time_entries.length > 0 ? (
          <>
            <div className="h-min">
              <TimeInventory getTimeEntries={data} />
            </div>
            <div className="flex space-x-1">
              <div className="cursor-pointer">
                <ArrowLeft />
              </div>
              <PaginationLinks arr={pageLinks} />
            </div>
          </>
        ) : (
          <div className="w-full text-center">
            <span className="text-center text-alsoit-text-lg capitalize text-blue-600 underline">No entries yet</span>
          </div>
        )}
      </div>
    </div>
  );
}
