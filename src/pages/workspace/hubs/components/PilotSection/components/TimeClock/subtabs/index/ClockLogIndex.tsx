import React from 'react';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../../../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../../../../tasks/timeclock/entryLists/EntryList';
// import EntryList, { entriesProps } from '../../../../../tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntriesFound';

export default function ClockLogIndex() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { data: getTaskEntries } = GetTimeEntriesService({
    taskId: activeItemId,
    trigger: activeItemType
  });

  const renderItemEntries = () => {
    if (getTaskEntries?.data.time_entries)
      if (getTaskEntries?.data.time_entries.length == 0) {
        return <NoEntriesFound />;
      } else {
        return getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => (
          <EntryList entries={entries} key={entries.id} />
        ));
      }
    else {
      return <NoEntriesFound />;
    }
  };

  return <div className="p-2">{renderItemEntries()}</div>;
}
