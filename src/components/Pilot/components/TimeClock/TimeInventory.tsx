import { useEffect, useState } from 'react';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { HorizontalScroll } from '../../../ScrollableContainer/HorizontalScroll';
import { InventoryHeader } from './InventoryHeader';
import { TimeLogEntries } from './LogEntries';
import { LogHeaders } from './LogHeaders';
import { useAppSelector } from '../../../../app/hooks';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';

interface Props {
  getTimeEntries?: ITimeEntriesRes;
}

export function TimeInventory({ getTimeEntries }: Props) {
  const { timeAssigneeFilter } = useAppSelector((state) => state.task);

  const [timeEntries, setTimeEntries] = useState<IEntries[] | undefined>(getTimeEntries?.data.time_entries);

  const [showLog, setShowLogs] = useState<boolean>(false);

  const Entries = () =>
    timeEntries?.map((timeEntry, index) => <TimeLogEntries key={index} timeEntry={timeEntry} index={index} />);

  useEffect(() => {
    if (timeAssigneeFilter) setTimeEntries(timeAssigneeFilter.data.time_entries);
  }, [timeAssigneeFilter]);

  return (
    <div className="relative bg-alsoit-gray-50 w-full rounded-md flex flex-col pt-10">
      <InventoryHeader timeData={getTimeEntries} showLog={!showLog} dropView={() => setShowLogs(!showLog)} />
      <div className="w-full bg-white">
        <HorizontalScroll>
          {showLog && (
            <>
              <div className="flex flex-col h-72">
                <VerticalScroll>
                  <LogHeaders />
                  <div className="flex flex-col w-full">{Entries()}</div>
                </VerticalScroll>
              </div>
            </>
          )}
        </HorizontalScroll>
      </div>
    </div>
  );
}
