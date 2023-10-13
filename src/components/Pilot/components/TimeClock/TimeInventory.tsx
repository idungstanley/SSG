import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { HorizontalScroll } from '../../../ScrollableContainer/HorizontalScroll';
import { InventoryHeader } from './InventoryHeader';
import { TimeLogEntries } from './LogEntries';
import { LogHeaders } from './LogHeaders';

interface Props {
  getTimeEntries?: ITimeEntriesRes;
}

export function TimeInventory({ getTimeEntries }: Props) {
  const Entries = () =>
    getTimeEntries?.data.time_entries.map((timeEntry, index) => <TimeLogEntries key={index} timeEntry={timeEntry} />);

  return (
    <div className="relative bg-alsoit-gray-50 w-full rounded-md flex flex-col pt-10">
      <InventoryHeader timeData={getTimeEntries} />
      <div className="w-full">
        <HorizontalScroll>
          <LogHeaders />
          <div className="flex flex-col w-full">{Entries()}</div>
        </HorizontalScroll>
      </div>
    </div>
  );
}
