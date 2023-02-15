import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { SelectMenuSimple } from '../../../..';
import { useChangeAccessForData } from '../../../../../features/permissions/permissionsService';

interface ChangeAccessProps {
  actualAccess: string;
  itemType: 'member' | 'member-group';
  accessToId: string;
}

export default function ChangeAccess({
  actualAccess,
  itemType,
  accessToId,
}: ChangeAccessProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const id = pilotSideOver.id;
  const type = pilotSideOver.type as 'file' | 'folder';

  const { mutate: onChange } = useChangeAccessForData(type, id);

  const onChangeAccess = (key: string) => {
    if (id && type) {
      onChange({
        dataId: id,
        key,
        accessToId,
        type,
        itemType,
      });
    }
  };

  return (
    <SelectMenuSimple
      options={[
        { id: 'read', name: 'Read-only' },
        { id: 'modify', name: 'Manage' },
        { id: 'full-control', name: 'Full control' },
        { id: 'owner', name: 'Owner' },
      ]}
      onChange={onChangeAccess}
      selectedId={actualAccess}
    />
  );
}
