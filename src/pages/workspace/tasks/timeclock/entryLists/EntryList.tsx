import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { DeleteTimeEntriesService } from '../../../../../features/task/taskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AvatarWithInitials } from '../../../../../components';
import { Header } from '../../../../../components/Pilot/components/TimeClock/ClockLog';
import DateFormat from '../../../../../components/DateFormat';
import ToolTip from '../../../../../components/Tooltip/Tooltip';
import EditIcon from '../../../../../assets/icons/Edit';
import moment from 'moment-timezone';
import TrashIcon from '../../../../../assets/icons/delete';
import { useState } from 'react';
export interface teamMember {
  id: string;
  user: {
    id: string;
    initials: string;
    name: string;
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
  const { initials, name } = entries.team_member.user;
  const [iconToggle, setIconToggle] = useState<{ editIcon: boolean; trashIcon: boolean }>({
    editIcon: false,
    trashIcon: false
  });

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
      <div id="left" className="flex items-center space-x-2">
        {headers.map((col) => {
          if (col.title === 'user' && !col.hidden) {
            return (
              <td key={col.id} className="flex w-10 items-center justify-start cursor-pointer py-1">
                <ToolTip tooltip={name}>
                  <AvatarWithInitials height="h-5" width="w-5" initials={initials} />
                </ToolTip>
              </td>
            );
          }

          if (col.title === 'duration' && !col.hidden) {
            return (
              <td key={col.id} className="w-14 text-center text-alsoit-text-md font-semibold cursor-default py-1">
                {moment.utc(entries.duration * 1000).format('HH:mm:ss')}
              </td>
            );
          }

          if (col.title === 'start date' && !col.hidden) {
            return (
              <td key={col.id} className="w-14 text-center font-semibold text-alsoit-gray-300 cursor-default py-1">
                <DateFormat date={entries.start_date} font="10px" />
              </td>
            );
          }

          if (col.title === 'end date' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14 text-center font-semibold text-alsoit-gray-300"
                style={{ cursor: 'default', padding: '2px 0' }}
              >
                <DateFormat date={entries.end_date} font="10px" />
              </td>
            );
          }

          if (col.title === 'description' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-14 text-alsoit-text-md font-semibold cursor-default py-1"
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
          <div
            onMouseEnter={() =>
              setIconToggle((prev) => ({
                ...prev,
                editIcon: true
              }))
            }
            onMouseLeave={() =>
              setIconToggle((prev) => ({
                ...prev,
                editIcon: false
              }))
            }
          >
            <EditIcon active={iconToggle.editIcon} dimensions={{ width: 20, height: 12 }} aria-hidden="true" />
          </div>
        </button>
        {openUpdateEntryId == entries.id ? (
          <UpdateTimeEntryDropdown time_entry_id={entries.id} billable={entries.is_billable} />
        ) : null}
        <button type="button" onClick={() => handledelete.mutateAsync({ timeEntryDeleteTriggerId: entries.id })}>
          <div
            onMouseEnter={() =>
              setIconToggle((prev) => ({
                ...prev,
                trashIcon: true
              }))
            }
            onMouseLeave={() =>
              setIconToggle((prev) => ({
                ...prev,
                trashIcon: false
              }))
            }
          >
            <TrashIcon active={iconToggle.trashIcon} dimensions={{ width: 20, height: 12 }} aria-hidden="true" />
          </div>
        </button>
      </div>
    </tr>
  );
}
