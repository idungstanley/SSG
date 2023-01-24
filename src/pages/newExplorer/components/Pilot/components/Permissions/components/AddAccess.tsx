import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import { ISelectedData } from '../../../../../../../components/PermissionManagement';
import SelectMenuTeamMembers from '../../../../../../../components/selectMenu';
import { useGetTeamMembersOrGroups } from '../../../../../../../features/inbox/inboxSettingsService';
import { useAddAccessForData } from '../../../../../../../features/permissions/permissionsService';

interface AddAccessProps {
  type: 'member' | 'member-group';
  actualMemberIds: string[];
}

export default function AddAccess({ type, actualMemberIds }: AddAccessProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const selectedId = pilotSideOver.id;
  const selectedType = pilotSideOver.type;

  const { data: dt } = useGetTeamMembersOrGroups({
    query: '',
    isGroups: type === 'member-group',
  });

  const data = dt?.pages.flatMap(
    (page) => page.data.team_members || page.data.team_member_groups
  );

  const { mutate: onAddAccess } = useAddAccessForData(selectedId, selectedType);

  const membersWithoutActive = data?.filter(
    (member) => !actualMemberIds?.includes(member.id)
  );

  const handleAddAccess = (value: ISelectedData | null) => {
    if (value && selectedType && selectedId) {
      onAddAccess({
        dataId: selectedId,
        accessToId: value.id,
        type: selectedType,
        itemType: type,
      });
    }
  };

  return membersWithoutActive ? (
    membersWithoutActive.length ? (
      <SelectMenuTeamMembers
        teamMembers={membersWithoutActive.map((i) => ({
          id: i.id,
          name: i.name || i.user.name,
          email: i.user?.email,
          accessLevel: i.id,
          type: 'member',
        }))}
        selectedData={null}
        setSelectedData={handleAddAccess}
        title={`Add ${type.replace('-', ' ')} access to ${selectedType}`}
        showEmail
      />
    ) : null
  ) : null;
}
