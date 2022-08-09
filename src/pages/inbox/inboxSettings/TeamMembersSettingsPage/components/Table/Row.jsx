import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRemoveIcon } from '@heroicons/react/outline';
import { AvatarWithInitials, StatusDot, Dropdown } from '../../../../../../components';
import { removeTeamMemberInboxAccessService } from '../../../../../../features/inbox/inboxSettingsService';

export default function Row({ inboxMember }) {
  const { inboxId } = useParams();
  const queryClient = useQueryClient();

  const removeTeamMemberInboxAccessMutation = useMutation(removeTeamMemberInboxAccessService, {
    onSuccess: () => {
      queryClient.invalidateQueries('inbox_access', inboxId);
    },
  });

  const removeAccess = () => {
    removeTeamMemberInboxAccessMutation.mutate({
      teamMemberId: inboxMember.team_member_id,
      inboxId,
    });
  };

  return (
    <tr key={inboxMember.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <StatusDot
              on={(
                <AvatarWithInitials
                  initials={inboxMember.team_member.initials}
                  backgroundColour={inboxMember.team_member.colour}
                />
              )}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{inboxMember.team_member.user.name}</div>
            <div className="text-gray-500">{inboxMember.team_member.user.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{inboxMember.access_level.name}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[
              {
                label: 'Remove access',
                onClick: removeAccess,
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
  inboxMember: PropTypes.object.isRequired,
};
