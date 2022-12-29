import React from 'react';
import { ISelectedData } from '..';
import { useAppSelector } from '../../../app/hooks';
import { useGetTeamMembersOrGroups } from '../../../features/inbox/inboxSettingsService';
import { useAddAccessForData } from '../../../features/permissions/permissionsService';
import SelectMenuTeamMembers from '../../selectMenu';

interface AddAccessProps {
  itemType: 'member' | 'member-group';
  actualDataIds: string[];
}

export default function AddAccess({ itemType, actualDataIds }: AddAccessProps) {
  const { selectedItemType: type, selectedItemId } = useAppSelector(
    (state) => state.explorer
  );
  const { data: dt } = useGetTeamMembersOrGroups({
    query: '',
    isGroups: itemType === 'member-group',
  });

  const data = dt?.pages.flatMap(
    (page) => page.data.team_members || page.data.team_member_groups
  );
  const dataList: ISelectedData[] | undefined = data?.map((i) => ({
    id: i.id,
    name: i.name || i.user.name,
    email: i.user?.email,
    accessLevel: i.id,
    type: itemType,
  }));

  const { mutate: onAdd } = useAddAccessForData(type, selectedItemId);

  const dataListWithoutActual = dataList?.filter(
    (i) => !actualDataIds.includes(i.id)
  );

  const onAddAccess = (value: ISelectedData | null) => {
    if (value) {
      onAdd({
        dataId: selectedItemId,
        accessToId: value.id,
        type,
        itemType,
      });
    }
  };

  return dataListWithoutActual?.length ? (
    <>
      <h2>{`Add ${itemType.replace('-', ' ')} access to ${type}`}</h2>

      <SelectMenuTeamMembers
        teamMembers={dataListWithoutActual}
        setSelectedData={onAddAccess}
        selectedData={null}
        title={`Select team ${itemType.replace('-', ' ')}:`}
      />
    </>
  ) : null;
}
