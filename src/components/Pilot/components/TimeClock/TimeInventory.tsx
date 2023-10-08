import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { InventoryHeader } from './InventoryHeader';

interface Props {
  getTimeEntries?: ITimeEntriesRes;
}

export function TimeInventory({ getTimeEntries }: Props) {
  return (
    <div className="relative bg-alsoit-gray-50 w-full rounded-md flex flex-col">
      <InventoryHeader totalDuration={getTimeEntries?.data.total_duration} />
    </div>
  );
}
