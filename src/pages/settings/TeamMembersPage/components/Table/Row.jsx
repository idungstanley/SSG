import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  BanIcon,
  UserRemoveIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';
import { selectCurrentUser } from '../../../../../features/auth/authSlice';
import {
  useDeactivateTeamMemberMutation,
  useReactivateTeamMemberMutation,
} from '../../../../../features/settings/teamMembers/teamMemberApi';
import { AvatarWithInitials, StatusDot, Dropdown } from '../../../../../components';
import { OutputDateTime } from '../../../../../app/helpers';

export default function Row({ teamMember }) {
  const user = useSelector(selectCurrentUser);

  const [deactivateTeamMember] = useDeactivateTeamMemberMutation();
  const [reactivateTeamMember] = useReactivateTeamMemberMutation();

  return (
    <tr key={teamMember.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <StatusDot
              on={(
                <AvatarWithInitials
                  initials={teamMember.initials}
                  backgroundColour={teamMember.colour}
                />
              )}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{teamMember.user.name}</div>
            <div className="text-gray-500">{teamMember.user.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full ${teamMember.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}  px-2 text-xs font-semibold leading-5`}>
          {teamMember.is_active ? 'Active' : 'Deactivated'}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teamMember.role.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teamMember.last_activity_at ? OutputDateTime(teamMember.last_activity_at, null, user.timezone) : '-'}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{OutputDateTime(teamMember.accepted_invite_at, null, user.timezone)}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{OutputDateTime(teamMember.invited_at, null, user.timezone)}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[
              {
                label: teamMember.is_active ? 'Deactivate' : 'Reactivate',
                onClick: () => (teamMember.is_active ? deactivateTeamMember({ teamMemberId: teamMember.id, showSuccess: true }) : reactivateTeamMember({ teamMemberId: teamMember.id, showSuccess: true })),
                icon: teamMember.is_active ? <BanIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" /> : <CheckCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
              },
              {
                label: 'Remove access',
                onClick: () => {
                  alert('test');
                },
                icon: <UserRemoveIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
              },
            ]}
          />
        </div>
      </td>
    </tr>
  );
}

Row.propTypes = {
  teamMember: PropTypes.string.isRequired,
};
