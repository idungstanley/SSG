import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import {
  UserRemoveIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { selectCurrentUser } from '../../../../../features/auth/authSlice';
import {
  useResendInviteMutation,
  useDeleteInviteMutation,
} from '../../../../../features/settings/teamMemberInvites/teamMemberInviteApi';
import { Dropdown, Badge } from '../../../../../components';
import { OutputDateTime } from '../../../../../app/helpers';

export default function Row({ teamMemberInvite }) {
  const user = useSelector(selectCurrentUser);

  const [resendInviteMutation] = useResendInviteMutation();
  const [deleteInviteMutation] = useDeleteInviteMutation();

  const [dropdownItems, setDropdownItems] = useState([]);

  const resendInvite = () => {
    resendInviteMutation({ id: teamMemberInvite.id });
  };

  const deleteInvite = () => {
    deleteInviteMutation({ id: teamMemberInvite.id });
  };

  useEffect(() => {
    const tempDropdownItems = [];

    const tempPropdownItemsForPendingInvite = [
      {
        label: 'Resend email',
        onClick: resendInvite,
        icon: <RefreshIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      },
      {
        label: 'Delete',
        onClick: deleteInvite,
        icon: <UserRemoveIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      },
    ];

    // If invite is pending
    if ((teamMemberInvite.accepted_at === null && moment(teamMemberInvite.expires_at).isAfter(moment()))) {
      setDropdownItems(tempPropdownItemsForPendingInvite);
    } else {
      setDropdownItems(tempDropdownItems);
    }
  }, [teamMemberInvite]);

  return (
    <tr key={teamMemberInvite.id}>
      <td className="whitespace-nowrap pl-4 sm:pl-6 px-3 py-4 text-sm">
        <div className="font-medium text-gray-900">{teamMemberInvite.email}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teamMemberInvite.role.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {(teamMemberInvite.accepted_at === null && moment(teamMemberInvite.expires_at).isBefore(moment())) && <Badge value="Expired" textColour="text-gray-800" backgroundColour="bg-gray-100" /> }
        {(teamMemberInvite.accepted_at === null && moment(teamMemberInvite.expires_at).isAfter(moment())) && <Badge value="Pending" textColour="text-blue-800" backgroundColour="bg-blue-100" /> }
        {teamMemberInvite.accepted_at !== null ? <Badge value="Accepted" textColour="text-green-800" backgroundColour="bg-green-100" /> : null }
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teamMemberInvite.created_at ? OutputDateTime(teamMemberInvite.created_at, null, user.timezone) : '-'}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teamMemberInvite.expires_at ? OutputDateTime(teamMemberInvite.expires_at, null, user.timezone) : '-'}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        {dropdownItems.length !== 0 && (
          <div className="mt-1.5">
            <Dropdown
              items={dropdownItems}
            />
          </div>
        )}
      </td>
    </tr>
  );
}

Row.propTypes = {
  teamMemberInvite: PropTypes.string.isRequired,
};
