import React from 'react';
import { ISelectedData } from '..';
import { useAppSelector } from '../../../app/hooks';
import { useChangeAccessForData } from '../../../features/permissions/permissionsService';
import SelectMenuSimple from '../../selectMenu/SelectMenuSimple';

interface ChangeAccessProps {
  actualAccess: string;
  itemType: 'member' | 'member-group';
  accessToId: string;
  setSelectedData: (i: null | ISelectedData) => void;
}

export default function ChangeAccess({
  actualAccess,
  itemType,
  accessToId,
  setSelectedData,
}: ChangeAccessProps) {
  const { selectedItemType: type, selectedItemId } = useAppSelector(
    (state) => state.explorer
  );

  const { mutate: onChange } = useChangeAccessForData(type, selectedItemId);

  const isOwner = actualAccess === 'owner';

  const onChangeAccess = (key: string) => {
    onChange({
      dataId: selectedItemId,
      key,
      accessToId,
      type,
      itemType,
    });
    setSelectedData(null);
  };

  if (isOwner) {
    return null;
  }

  return (
    <SelectMenuSimple
      label="Change role"
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
