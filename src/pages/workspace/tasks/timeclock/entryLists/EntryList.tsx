import moment from 'moment';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { DeleteTimeEntriesService } from '../../../../../features/task/taskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { User } from '../../../../../components/Pilot/components/TimeClock/ClockInOut';
import { AvatarWithInitials } from '../../../../../components';
import { Header } from '../../../../../components/Pilot/components/TimeClock/ClockLog';
export interface teamMember {
  user: {
    initials: string;
  };
}
export interface entriesProps {
  id: string;
  duration: number;
  start_date: string;
  end_date: string;
  description: string;
  is_billable: number;
  team_member: teamMember;
}
export interface EntryListProps {
  entries: entriesProps;
  switchHeader: Header[];
}

export default function EntryList({ entries, switchHeader }: EntryListProps) {
  const dispatch = useDispatch();
  const { openUpdateEntryId } = useAppSelector((state) => state.task);
  const queryClient = useQueryClient();
  const headers = switchHeader;
  const { initials } = entries.team_member.user;

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
    <tr key={entries.id} id="getTimeEntries" className="flex items-center justify-between px-3 border-b">
      <div id="left" className="flex items-center space-x-2 text-xs">
        {headers.map((col) => {
          if (col.title === 'user' && !col.hidden) {
            return (
              <td key={col.id} className="flex w-10 items-center justify-start cursor-pointer -space-x-4 py-1">
                <AvatarWithInitials height="h-4" width="w-4" initials={initials} />
              </td>
            );
          }

          if (col.title === 'duration' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14 text-center"
                style={{ cursor: 'default', fontSize: '10px', padding: '2px 0' }}
              >
                {moment.utc(entries.duration * 1000).format('HH:mm:ss')}
              </td>
            );
          }

          if (col.title === 'start date' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14 text-center"
                style={{ cursor: 'default', fontSize: '9px', padding: '2px 0' }}
              >
                {moment(entries.start_date).format('MMM D HH:mm')}
              </td>
            );
          }

          if (col.title === 'end date' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14 text-center"
                style={{ cursor: 'default', fontSize: '9px', padding: '2px 0' }}
              >
                {moment(entries.end_date).format('MMM D HH:mm')}
              </td>
            );
          }

          if (col.title === 'description' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14"
                style={{ cursor: 'default', fontSize: '9px', padding: '2px 0' }}
                title={entries.description}
              >
                {entries.description && entries.description.slice(0, 5) + '...'}
              </td>
            );
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
