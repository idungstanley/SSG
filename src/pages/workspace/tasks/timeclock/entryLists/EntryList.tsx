import moment from 'moment';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { DeleteTimeEntriesService } from '../../../../../features/task/taskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface entriesProps {
  id: string;
  duration: number;
  start_date: string;
  end_date: string;
  description: string;
  is_billable: number;
}
export interface EntryListProps {
  entries: entriesProps;
}

export default function EntryList({ entries }: EntryListProps) {
  const dispatch = useDispatch();
  const { openUpdateEntryId } = useAppSelector((state) => state.task);
  const queryClient = useQueryClient();

  const handledelete = useMutation(DeleteTimeEntriesService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['timeclock']);
    }
  });

  const handleUpdateEntry = (id: string) => {
    if (openUpdateEntryId == id) {
      dispatch(
        setUpdateEntries({
          openUpdateEntryId: id
        })
      );
    } else {
      dispatch(
        setUpdateEntries({
          openUpdateEntryId: id,
          initial_description: entries.description,
          initial_start_date: entries.start_date,
          initial_end_date: entries.end_date
        })
      );
    }
  };

  return (
    <section key={entries.id} id="getTimeEntries" className="flex items-center justify-between px-3 h-10">
      <div id="left" className="flex items-center space-x-3 text-xs">
        <p>{moment.utc(entries.duration * 1000).format('HH:mm:ss')}</p>
        <p>{moment(entries.start_date).format('MMM D')}</p>
      </div>
      <div id="right" className="flex items-center space-x-2 relative">
        <button type="button" onClick={() => handleUpdateEntry(entries.id)}>
          <PencilIcon className="flex-shrink-0 h-3 w-5 text-gray-400" aria-hidden="true" />
        </button>
        {openUpdateEntryId == entries.id ? (
          <UpdateTimeEntryDropdown time_entry_id={entries.id} billable={entries.is_billable} />
        ) : null}
        <button type="button" onClick={() => handledelete.mutateAsync({ timeEntryDeleteTriggerId: entries.id })}>
          <TrashIcon className="flex-shrink-0 h-3 w-5 text-red-400" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
