import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../../features/auth/authSlice';
import { AvatarWithInitials, Dropdown } from '../../../../../components';
import { OutputDateTime } from '../../../../../app/helpers';

export default function Row({ teamMemberGroup }) {
  const user = useSelector(selectCurrentUser);

  return (
    <tr key={teamMemberGroup.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AvatarWithInitials
              initials={teamMemberGroup.initials}
              backgroundColour={teamMemberGroup.colour}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{teamMemberGroup.name}</div>
            <div className="text-gray-500">{`${teamMemberGroup.group_team_members.length} members`}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{OutputDateTime(teamMemberGroup.created_at, null, user.timezone)}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[]}
          />
        </div>
      </td>
    </tr>
  );
}

Row.propTypes = {
  teamMemberGroup: PropTypes.string.isRequired,
};
