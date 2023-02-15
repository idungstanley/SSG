import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useDispatch } from 'react-redux';
import { UserMinusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  useGetTeamMemberInvite,
  useDeleteTeamMemberInvite,
  useResendTeamMemberInvite,
} from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import {
  displayPrompt,
  setVisibility,
} from '../../../../../../features/general/prompt/promptSlice';
import { Dropdown, Badge } from '../../../../../../components';
import { OutputDateTime } from '../../../../../../app/helpers';

interface RowProps {
  teamMemberInviteId: string;
}

interface DropDownItem {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

export default function Row({ teamMemberInviteId }: RowProps) {
  const dispatch = useDispatch();

  const { data: teamMemberInvite, status } =
    useGetTeamMemberInvite(teamMemberInviteId);

  const { mutate: resendTeamMemberInvite } =
    useResendTeamMemberInvite(teamMemberInviteId);
  const { mutate: deleteTeamMemberInvite } =
    useDeleteTeamMemberInvite(teamMemberInviteId);

  const [dropdownItems, setDropdownItems] = useState<DropDownItem[]>([]);

  const resendInvite = () => {
    resendTeamMemberInvite();
  };

  const deleteTeamMemberInviteConfirmation = () => {
    dispatch(
      displayPrompt(
        'Delete invite',
        'Would you like to delete this team member invite?',
        [
          {
            label: 'Delete invite',
            style: 'danger',
            callback: async () => {
              deleteTeamMemberInvite();
              dispatch(setVisibility(false));
            },
          },
          {
            label: 'Cancel',
            style: 'plain',
            callback: () => {
              dispatch(setVisibility(false));
            },
          },
        ]
      )
    );
  };

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const tempDropdownItems: DropDownItem[] = [];

    const tempPropdownItemsForPendingInvite = [
      {
        label: 'Resend email',
        onClick: resendInvite,
        icon: (
          <ArrowPathIcon
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
      },
      {
        label: 'Delete',
        onClick: deleteTeamMemberInviteConfirmation,
        icon: (
          <UserMinusIcon
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
      },
    ];

    // If invite is pending
    if (
      teamMemberInvite.accepted_at === null &&
      moment(teamMemberInvite.expires_at).isAfter(moment())
    ) {
      setDropdownItems(tempPropdownItemsForPendingInvite);
    } else {
      setDropdownItems(tempDropdownItems);
    }
  }, [teamMemberInvite]);

  return teamMemberInvite ? (
    <tr key={teamMemberInvite.id}>
      <td className="whitespace-nowrap pl-4 sm:pl-6 px-3 py-4 text-sm">
        <div className="font-medium text-gray-900 capitalize">
          {teamMemberInvite.name ? teamMemberInvite.name : '-'}
        </div>
      </td>
      <td className="whitespace-nowrap pl-4 sm:pl-6 px-3 py-4 text-sm">
        <div className="font-medium text-gray-900">
          {teamMemberInvite.email}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMemberInvite.role.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMemberInvite.accepted_at === null &&
          moment(teamMemberInvite.expires_at).isBefore(moment()) && (
            <Badge
              value="Expired"
              textColour="text-gray-800"
              backgroundColour="bg-gray-100"
            />
          )}
        {teamMemberInvite.accepted_at === null &&
          moment(teamMemberInvite.expires_at).isAfter(moment()) && (
            <Badge
              value="Pending"
              textColour="text-blue-800"
              backgroundColour="bg-blue-100"
            />
          )}
        {teamMemberInvite.accepted_at !== null ? (
          <Badge
            value="Accepted"
            textColour="text-green-800"
            backgroundColour="bg-green-100"
          />
        ) : null}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMemberInvite.created_at
          ? OutputDateTime(teamMemberInvite.created_at, null)
          : '-'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMemberInvite.expires_at
          ? OutputDateTime(teamMemberInvite.expires_at, null)
          : '-'}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        {dropdownItems.length !== 0 && (
          <div className="mt-1.5">
            <Dropdown items={dropdownItems} />
          </div>
        )}
      </td>
    </tr>
  ) : null;
}
