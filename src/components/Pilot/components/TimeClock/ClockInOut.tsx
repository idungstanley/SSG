import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import ClockLog from './ClockLog';
import PaginationLinks from '../NavLinks/PaginationLinks';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { CombinedTime } from './CombinedTimeUI';
import { GetTimeEntriesService } from '../../../../features/task/taskService';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [page, setPage] = useState<number>(1);
  const { data: getTaskEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType,
    page,
    include_filters: true
  });

  // Get currently active timers
  // const { data: getCurrent } = GetTimeEntriesService({
  //   itemId: activeItemId,
  //   trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
  //   is_active: 1
  // });

  // const activeTimerCheck = () => {
  //   if (timerStatus && !prompt) {
  //     setPrompt(true);
  //   } else {
  //     setPrompt(false);
  //   }
  // };

  // const handleTimeSwitch = () => {
  //   stop();
  //   setPrompt(false);
  //   setNewtimer(!newTimer);
  // };

  // const sameEntity = () => activeItemId === (timerLastMemory.taskId || timerLastMemory.hubId || timerLastMemory.listId);
  // const handleEndTimeChange = (value: string) => {
  //   dispatch(setTimerDetails({ ...timerDetails, isBillable: timerDetails.isBillable, description: value }));
  // };

  const firstPage = () => setPage(1);
  const lastPage = () => setPage((page * 100) / 100);
  const pageLinks = Array(getTaskEntries?.data.pagination.page)
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
