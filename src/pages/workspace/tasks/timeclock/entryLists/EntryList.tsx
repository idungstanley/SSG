import moment from 'moment';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { DeleteTimeEntriesService } from '../../../../../features/task/taskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../../../../../components/Pilot/components/TimeClock/ClockInOut';
import { AvatarWithInitials } from '../../../../../components';
import { Header } from '../../../../../components/Pilot/components/TimeClock/ClockLog';

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
  switchHeader: Header[];
}

export default function EntryList({ entries, switchHeader }: EntryListProps) {
  const dispatch = useDispatch();
  const { openUpdateEntryId } = useAppSelector((state) => state.task);
  const queryClient = useQueryClient();

  // refactor when back is ready with user data on the time entries
  const { initials } = JSON.parse(localStorage.getItem('user') as string) as User;
  const headers = switchHeader;

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
    <tr key={entries.id} id="getTimeEntries" className="flex items-center justify-between px-3 h-10 border-b py-2">
      <div id="left" className="flex items-center justify-evenly space-x-4 text-xs">
        {headers.map((col) => {
          if (col.title === 'assignee' && !col.hidden) {
            return (
              <td key={col.id} className="flex w-10 items-center justify-start cursor-pointer -space-x-4">
                <AvatarWithInitials height="h-4" width="w-4" initials={initials} />
              </td>
            );
          }

          if (col.title === 'duration' && !col.hidden) {
            return (
              <td key={col.id} className="w-14" style={{ cursor: 'default' }}>
                {moment.utc(entries.duration * 1000).format('HH:mm:ss')}
              </td>
            );
          }

          if (col.title === 'start date' && !col.hidden) {
            return (
              <td key={col.id} className="w-14" style={{ cursor: 'default' }}>
                {moment(entries.start_date).format('MMM D HH:mm')}
              </td>
            );
          }

          if (col.title === 'end date' && !col.hidden) {
            return (
              <td key={col.id} className="w-14" style={{ cursor: 'default' }}>
                {moment(entries.end_date).format('MMM D HH:mm')}
              </td>
            );
          }

          if (col.title === 'description' && !col.hidden) {
            return <td key={col.id}>{entries.description}</td>;
          }
        })}
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
    </tr>
  );
}
