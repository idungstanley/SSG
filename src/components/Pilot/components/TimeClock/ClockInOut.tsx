import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { CombinedTime } from './CombinedTimeUI';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import { TimeInventory } from './TimeInventory';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [page, setPage] = useState<number>(1);

  const { data: getTaskTimeEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
    page,
    include_filters: true
  });

  const firstPage = () => setPage(1);
  const lastPage = () => setPage((page * 100) / 100);
  const pageLinks = Array(getTaskTimeEntries?.data.pagination.page)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <div className="p-2 mt-6 bg-white">
      {/* Clock Counter */}
      <div className="bg-alsoit-gray-50 rounded-lg py-2 px-0.5 flex flex-col space-y-2 relative">
        {/* Timer section */}
        <CombinedTime />
      </div>
      {/* Clock Log */}
      <div className="w-full p-1 my-4 flex flex-col space-y-2 bg-alsoit-gray-50 rounded-lg">
        <div className="h-96">
          <TimeInventory getTimeEntries={getTaskTimeEntries} />
        </div>
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
