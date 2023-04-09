import { useAppSelector } from '../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';

export default function ClockLog() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { data: getTaskEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType
  });

  const renderItemEntries = () => {
    if (getTaskEntries?.data.time_entries)
      if (getTaskEntries?.data.time_entries.length == 0) {
        return <NoEntriesFound />;
      } else {
        return (
          <>
            <div className="flex items-center text-xs font-extralight border-b pb-2 border-gray-400">
              <span className="w-20">Duration</span>
              <span className="w-12">Start Date</span>
              <span className="w-12">End Date</span>
              <span className="w-12">Assignee</span>
            </div>
            {getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => (
              <EntryList entries={entries} key={entries.id} />
            ))}
          </>
        );
      }
    else {
      return <NoEntriesFound />;
    }
  };

  return <div className="p-2">{renderItemEntries()}</div>;
}
