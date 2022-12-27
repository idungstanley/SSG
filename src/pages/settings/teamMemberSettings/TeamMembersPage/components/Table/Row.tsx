import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BanIcon,
  UserRemoveIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';
import { selectCurrentUser } from '../../../../../../features/auth/authSlice';
import {
  useGetTeamMember,
  useDeactivateTeamMember,
  useReactivateTeamMember,
  useRemoveTeamMember,
} from '../../../../../../features/settings/teamMembers/teamMemberService';
import {
  displayPrompt,
  setVisibility,
} from '../../../../../../features/general/prompt/promptSlice';
import {
  AvatarWithInitials,
  StatusDot,
  Dropdown,
} from '../../../../../../components';
import { OutputDateTime } from '../../../../../../app/helpers';

interface RowProps {
  teamMemberId: string;
}

export default function Row({ teamMemberId }: RowProps) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const { data: teamMember } = useGetTeamMember(teamMemberId);
  const { mutate: deactivateTeamMember } =
    useDeactivateTeamMember(teamMemberId);
  const { mutate: reactivateTeamMember } =
    useReactivateTeamMember(teamMemberId);
  const { mutate: removeTeamMember } = useRemoveTeamMember(teamMemberId);

  const removeTeamMemberConfirmation = () => {
    dispatch(
      displayPrompt(
        'Remove team member',
        'Would you like to remove this team member from the workspace?',
        [
          {
            label: 'Remove team member',
            style: 'danger',
            callback: async () => {
              removeTeamMember();
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

  const deactivateTeamMemberConfirmation = () => {
    dispatch(
      displayPrompt(
        'Deactivate team member',
        'Would you like to deactivate this team member? They will no longer be able to access this workspace. You can reactivate the team member in the future.',
        [
          {
            label: 'Deactivate team member',
            style: 'danger',
            callback: async () => {
              deactivateTeamMember();
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

  const reactivateTeamMemberConfirmation = () => {
    dispatch(
      displayPrompt(
        'Reactivate team member',
        'Would you like to reactivate this team member?',
        [
          {
            label: 'Reactivate team member',
            style: 'danger',
            callback: async () => {
              reactivateTeamMember();
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

  return teamMember ? (
    <tr key={teamMember.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <StatusDot
              on={
                <AvatarWithInitials
                  initials={teamMember.initials}
                  backgroundColour={teamMember.colour}
                />
              }
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {teamMember.user.name}
            </div>
            <div className="text-gray-500">{teamMember.user.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span
          className={`inline-flex rounded-full ${
            teamMember.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }  px-2 text-xs font-semibold leading-5`}
        >
          {teamMember.is_active ? 'Active' : 'Deactivated'}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMember.role.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {teamMember.last_activity_at
          ? OutputDateTime(teamMember.last_activity_at, null, user.timezone)
          : '-'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {OutputDateTime(teamMember.accepted_invite_at, null, user.timezone)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {OutputDateTime(teamMember.invited_at, null, user.timezone)}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[
              {
                label: teamMember.is_active ? 'Deactivate' : 'Reactivate',
                onClick: () =>
                  teamMember.is_active
                    ? deactivateTeamMemberConfirmation()
                    : reactivateTeamMemberConfirmation(),
                icon: teamMember.is_active ? (
                  <BanIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                ) : (
                  <CheckCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                ),
              },
              {
                label: 'Remove access',
                onClick: removeTeamMemberConfirmation,
                icon: (
                  <UserRemoveIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                ),
              },
            ]}
          />
        </div>
      </td>
    </tr>
  ) : null;
}
