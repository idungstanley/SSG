import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  useGetTeamMembers,
  useDeactivateTeamMember,
  useRemoveTeamMember
} from '../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../components';
import { NoSymbolIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import { displayPrompt, setVisibility } from '../../../features/general/prompt/promptSlice';
import ToolTip from '../../../components/Tooltip';

export default function PeopleTableCol() {
  const { teamMembersPaginationPage, teamMembersSearchQuery } = useAppSelector((state) => state.teamMember);
  const [teamMemberId, setTeamMemberId] = useState('');
  const dispatch = useDispatch();
  const { mutate: deactivateTeamMember } = useDeactivateTeamMember(teamMemberId);
  const { mutate: removeTeamMember } = useRemoveTeamMember(teamMemberId);

  const { data } = useGetTeamMembers({
    page: teamMembersPaginationPage,
    query: teamMembersSearchQuery
  });

  const removeTeamMemberConfirmation = () => {
    dispatch(
      displayPrompt('Remove team member', 'Would you like to remove this team member from the workspace?', [
        {
          label: 'Remove team member',
          style: 'danger',
          callback: async () => {
            removeTeamMember();
            dispatch(setVisibility(false));
          }
        },
        {
          label: 'Cancel',
          style: 'plain',
          callback: () => {
            dispatch(setVisibility(false));
          }
        }
      ])
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
            }
          },
          {
            label: 'Cancel',
            style: 'plain',
            callback: () => {
              dispatch(setVisibility(false));
            }
          }
        ]
      )
    );
  };
  return (
    <tbody className="divide-y divide-gray-50">
      {data?.data.team_members?.map((member) => {
        return (
          <tr key={member.id} className=" bg-gray-50 hover:bg-gray-200 group">
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300">
              <div className="flex items-center gap-2">
                <p>
                  <AvatarWithInitials initials={member.user.initials} backgroundColour={member.colour} />
                </p>
                <p className="group-hover:opacity-100">{member.user.name}</p>
              </div>
            </td>
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300">
              <p className="group-hover:opacity-100">{member.user.email}</p>
            </td>
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300">
              <span className="group-hover:opacity-100">{member.role.name}</span>
            </td>
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300">
              <span className="group-hover:opacity-100 text-green-700 bg-green-400 bottom-2 rounded-xl text-sm px-1">
                {member.is_active ? 'Active' : 'Deactivated'}
              </span>
            </td>
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300">
              <span className="group-hover:opacity-100">{member.invited_at}</span>
            </td>
            <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-b border-gray-300 ">
              <div className=" flex group-hover:opacity-100 ">
                <p
                  onClick={() => {
                    setTeamMemberId(member.id);
                    deactivateTeamMemberConfirmation();
                  }}
                >
                  <ToolTip tooltip="Deactivate">
                    <NoSymbolIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </ToolTip>
                </p>
                <p onClick={() => removeTeamMemberConfirmation()}>
                  <ToolTip tooltip="Remove">
                    <UserMinusIcon
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </ToolTip>
                </p>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
