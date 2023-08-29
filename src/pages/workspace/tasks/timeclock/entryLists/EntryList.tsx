import { AvatarWithInitials } from '../../../../../components';
import { Header } from '../../../../../components/Pilot/components/TimeClock/ClockLog';
import DateFormat from '../../../../../components/DateFormat';
import ToolTip from '../../../../../components/Tooltip/Tooltip';
import moment from 'moment-timezone';
import { useState } from 'react';
import ThreeDotIcon from '../../../../../assets/icons/ThreeDotIcon';
import { EntryListActionBtns } from './EntryListActionBtns';
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
  const headers = switchHeader;
  const { initials, name } = entries.team_member.user;
  const [iconToggle, setIconToggle] = useState<{ editIcon: boolean; trashIcon: boolean; threeDots: boolean }>({
    editIcon: false,
    trashIcon: false,
    threeDots: false
  });

  return (
    <tr key={entries.id} id="getTimeEntries" className="flex justify-between border-b w-full py-0.5">
      <td id="left" className="w-10/12 flex items-center justify-between">
        {headers.map((col) => {
          if (col.title === 'user' && !col.hidden) {
            return (
              <td key={col.id} className="w-1/5 flex items-center justify-start cursor-pointer py-1">
                <ToolTip title={name}>
                  <AvatarWithInitials height="h-5" width="w-5" initials={initials} />
                </ToolTip>
              </td>
            );
          }

          if (col.title === 'duration' && !col.hidden) {
            return (
              <td key={col.id} className="w-1/5 text-center text-alsoit-text-md font-semibold cursor-default py-1">
                {moment.utc(entries.duration * 1000).format('HH:mm:ss')}
              </td>
            );
          }

          if (col.title === 'start date' && !col.hidden) {
            return (
              <td key={col.id} className="w-1/5 text-center font-semibold text-alsoit-gray-300 cursor-default py-1">
                <DateFormat date={entries.start_date} font="10px" />
              </td>
            );
          }

          if (col.title === 'end date' && !col.hidden) {
            return (
              <td
                key={col.id}
                className="w-1/5 text-center font-semibold text-alsoit-gray-300"
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
                className="w-1/5 text-alsoit-text-sm text-center font-semibold cursor-default py-1"
                title={entries.description}
              >
                {entries.description && entries.description.slice(0, 5) + '...'}
              </td>
            );
          }
        })}
      </td>
      {/* action buttons */}
      <td
        className="relative flex items-center"
        onMouseEnter={() => setIconToggle((prev) => ({ ...prev, threeDots: true }))}
        onMouseLeave={() => setIconToggle((prev) => ({ ...prev, threeDots: false }))}
      >
        <ThreeDotIcon active={iconToggle.threeDots} />
        {iconToggle.threeDots && (
          <EntryListActionBtns entries={entries} iconToggle={iconToggle} setIconToggle={setIconToggle} />
        )}
      </td>
    </tr>
  );
}
