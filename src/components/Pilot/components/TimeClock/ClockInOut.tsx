import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { CombinedTime } from './CombinedTimeUI';
import { useGetTimeEntriesMutation } from '../../../../features/task/taskService';
import { TimeInventory } from './TimeInventory';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { timeAssigneeFilter: getTaskTimeEntries } = useAppSelector((state) => state.task);

  const [page, setPage] = useState<number>(1);

  const { mutateAsync } = useGetTimeEntriesMutation();

  const firstPage = () => setPage(1);
  const lastPage = () => setPage((page * 100) / 100);
  const pageLinks = Array(getTaskTimeEntries?.data.pagination.page)
    .fill(0)
    .map((_, index) => index + 1);

  useEffect(() => {
    if (!getTaskTimeEntries)
      mutateAsync({
        itemId: activeItemId,
        trigger: activeItemType,
        include_filters: false,
        page
      });
  }, [getTaskTimeEntries]);

  return (
    <div className="px-2 my-1.5 bg-white">
      {/* Clock Counter */}
      <div className="bg-alsoit-gray-50 rounded-lg py-2 px-0.5 flex flex-col space-y-2 relative">
        {/* Timer section */}
        <CombinedTime />
      </div>
      {/* Clock Log */}
      <div className="w-full p-1 my-2 flex flex-col space-y-2 bg-alsoit-gray-50 rounded-lg">
        {getTaskTimeEntries?.data?.time_entries && getTaskTimeEntries?.data?.time_entries.length > 0 ? (
          <>
            <div className="h-96">
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
