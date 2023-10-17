import React from 'react';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import { Capitalize } from '../../../../../../utils/NoCapWords/Capitalize';
import { useChangeRole } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITeamMember } from '../../../../../../features/workspace/teamMembers.intrfaces';
import { TEAM_MEMBER_ROLES } from '../../../../../../utils/Constants/RoleConstants';

interface changeRoleProps {
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  presentRole: string;
  teamMember: ITeamMember;
}

function ChangeRole({ anchor, setAnchor, presentRole, teamMember }: changeRoleProps) {
  const queryClient = useQueryClient();
  const changeRole = useMutation(useChangeRole, {
    onSuccess: (successData) => {
      queryClient.setQueryData(['team_member', teamMember.id], () => {
        const updatedMember = {
          ...teamMember,
          role: successData.data.team_member_role
        };
        return updatedMember;
      });
    }
  });

  const handleChange = async (role: string) => {
    await changeRole.mutateAsync({
      teamMember: teamMember.id,
      role
    });
  };

  return (
    <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
      <div style={{ width: '100px' }}>
        {TEAM_MEMBER_ROLES.map((role) => {
          return (
            <div key={role} onClick={() => handleChange(role)}>
              {presentRole.toLowerCase() !== role.toLowerCase() && (
                <div className="p-2 hover:bg-alsoit-gray-50 flex items-center cursor-pointer">
                  <h2>{Capitalize(role)}</h2>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AlsoitMenuDropdown>
  );
}

export default ChangeRole;
