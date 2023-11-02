import { useEffect, useState } from 'react';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { HorizontalScroll } from '../../../ScrollableContainer/HorizontalScroll';
import { InventoryHeader } from './InventoryHeader';
import { useAppSelector } from '../../../../app/hooks';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { LogHeaders } from './LogHeaders';
import { TimeLogEntries } from './LogEntries';

interface Props {
  getTimeEntries?: ITimeEntriesRes;
}

export function TimeInventory({ getTimeEntries }: Props) {
  useAppSelector((state) => state.task);

  const [timeEntries, setTimeEntries] = useState<IEntries[] | undefined>(getTimeEntries?.data.time_entries);

  const [showLog, setShowLogs] = useState<boolean>(true);

  const Entries = () =>
    timeEntries?.map((timeEntry, index) => {
      return <TimeLogEntries key={index} index={index} timeEntry={timeEntry} />;
    });

  useEffect(() => {
    if (getTimeEntries?.data.time_entries) setTimeEntries(getTimeEntries?.data.time_entries);
  }, [getTimeEntries]);

  return (
    <div className="relative bg-alsoit-gray-50 w-full rounded-md flex flex-col pt-10">
      <InventoryHeader timeData={getTimeEntries} showLog={!showLog} dropView={() => setShowLogs(!showLog)} />
      <div className="w-full max-h-72">
        <VerticalScroll>
          {showLog && (
            <>
              <div className="max-h-72 w-full">
                <HorizontalScroll>
                  <table className="w-full h-full border-separate">
                    <thead className="w-full">
                      <LogHeaders />
                    </thead>
                    <tbody className="w-full">{Entries()}</tbody>
                  </table>
                </HorizontalScroll>
              </div>
            </>
          )}
        </VerticalScroll>
      </div>
    </div>
  );
}
