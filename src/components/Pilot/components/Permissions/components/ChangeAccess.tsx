import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { SelectMenuSimple } from '../../../..';
import { useChangeAccessForData } from '../../../../../features/permissions/permissionsService';

interface ChangeAccessProps {
  actualAccess: string;
  itemType: 'member' | 'member-group';
  accessToId: string;
}

export default function ChangeAccess({ actualAccess, itemType, accessToId }: ChangeAccessProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { mutate: onChange } = useChangeAccessForData(type as 'file' | 'folder', id);

  const onChangeAccess = (key: string) => {
    if (id && type) {
      onChange({
        dataId: id,
        key,
        accessToId,
        type: type as 'file' | 'folder',
        itemType
      });
    }
  };

  return (
    <SelectMenuSimple
      options={[
        { id: 'read', name: 'Read-only' },
        { id: 'modify', name: 'Manage' },
        { id: 'full-control', name: 'Full control' },
        { id: 'owner', name: 'Owner' }
      ]}
      onChange={onChangeAccess}
      selectedId={actualAccess}
    />
  );
}
