import { FiPlusCircle } from 'react-icons/fi';
import { useAppSelector } from '../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';

export const headArr = [
  { title: 'assignee', id: 1, hidden: false },
  { title: 'duration', id: 2, hidden: false },
  { title: 'start date', id: 3, hidden: false },
  { title: 'end date', id: 4, hidden: false },
  { title: 'description', id: 5, hidden: true }
];

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
            <div className="flex items-center text-xs font-extralight border-b pb-2 border-gray-400 space-x-6">
              {headArr.map((col) => {
                return (
                  !col.hidden && (
                    <span key={col.id} className="w-12 cursor-default">
                      {col.title}
                    </span>
                  )
                );
              })}
              <FiPlusCircle className="AddColumnDropdownButton cursor-pointer font-black h-4 w-4" />
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
