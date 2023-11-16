import React, { useState } from 'react';
import UserAvatar from '../../../../../pages/workspace/tasks/assignTask/UserAvatar';
import Toggle from './Toggle';
import RoleDropdown from './RoleDropdown';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { ITeamMembersAndGroup } from '../../../../../features/settings/teamMembersAndGroups.interfaces';
import { useCreateOrEditPermission } from '../../../../../features/workspace/workspaceService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../../../../app/hooks';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';

function People({
  showToggle,
  teamMember,
  enabled,
  role
}: {
  showToggle: boolean;
  teamMember?: ITeamMembersAndGroup;
  enabled: boolean;
  role?: string;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const queryClient = useQueryClient();
  const [currentRole, setRole] = useState<string>(role ? role : 'full');
  const { entityForPermissions } = useAppSelector((state) => state.workspace);

  const changePermission = useMutation(useCreateOrEditPermission, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${entityForPermissions?.type ?? 'hub'}-permissions`, entityForPermissions?.id]);
    }
  });

  const handleAddPerson = async (enable: boolean) => {
    const model = entityForPermissions?.type ? entityForPermissions.type : 'hub';
    const model_id = entityForPermissions?.id;
    const teamsObj = {
      access_level: 'full',
      id: teamMember?.id as string
    };
    if (enable) {
      await changePermission.mutateAsync({
        model,
        model_id: model_id as string,
        teamMembersArr: [teamsObj]
      });
    }
  };

  const handleChangeRole = async (role: string) => {
    const model = entityForPermissions?.type ? entityForPermissions.type : 'hub';
    const model_id = entityForPermissions?.id;
    const teamsObj = {
      access_level: role.toLowerCase(),
      id: teamMember?.id as string
    };
    await changePermission.mutateAsync({
      model,
      model_id: model_id as string,
      teamMembersArr: [teamsObj]
    });
    setRole(role);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <UserAvatar user={teamMember as ITeamMembersAndGroup} />
          <h2>{teamMember?.name || teamMember?.user.name}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <span
            className="border border-alsoit-gray-100 text-alsoit-text-md rounded flex justify-center items-center gap-1 cursor-pointer px-1"
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            {Capitalize(currentRole)} <ArrowDown className="w-2 h-2" />
          </span>
          {showToggle && <Toggle handleToggle={handleAddPerson} isEnabled={enabled} />}
        </div>
      </div>
      <RoleDropdown anchor={anchor} setAnchor={setAnchor} handleSeletRole={handleChangeRole} />
    </div>
  );
}

export default People;
