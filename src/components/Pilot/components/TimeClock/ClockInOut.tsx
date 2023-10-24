import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { CombinedTime } from './CombinedTimeUI';
import { useTimeEntriesQuery } from '../../../../features/task/taskService';
import { TimeInventory } from './TimeInventory';
import { setTimeAssignee, setTimeAssigneeFilter } from '../../../../features/task/taskSlice';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const dispatch = useAppDispatch();
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { timeAssigneeFilter: getTaskTimeEntries, timerStatus } = useAppSelector((state) => state.task);

  const [page, setPage] = useState<number>(1);

  const { data, isSuccess } = useTimeEntriesQuery({
    id: activeItemId,
    type: activeItemType,
    include_filters: false,
    page
  });

  const firstPage = () => setPage(1);
  const lastPage = () => setPage((page * 100) / 100);
  const pageLinks = Array(getTaskTimeEntries?.data.pagination.page)
    .fill(0)
    .map((_, index) => index + 1);

  // useEffect(() => {
  //   mutateAsync({
  //     itemId: activeItemId,
  //     trigger: activeItemType,
  //     include_filters: false,
  //     page
  //   });
  // }, [activeItemId, timerStatus]);

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
      <div className="bg-alsoit-gray-50 rounded-t-lg py-0.5 flex flex-col space-y-2 relative">
        {/* Timer section */}
        <CombinedTime />
      </div>
      {/* Clock Log */}
      <div className="w-full p-1 my-2 flex flex-col space-y-2 bg-alsoit-gray-50 rounded-lg">
        {data?.data?.time_entries && data?.data?.time_entries.length > 0 ? (
          <>
            <div className="h-min">
              <TimeInventory getTimeEntries={getTaskTimeEntries} />
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
