import React from 'react';
import { ISelectedData } from '..';
import { useAppSelector } from '../../../app/hooks';
import { useRemoveAccessForData } from '../../../features/permissions/permissionsService';

interface RemoveAccess {
  itemType: 'member' | 'member-group';
  accessToId: string;
  accessLevel: string;
  setSelectedData: (i: null | ISelectedData) => void;
}

export default function RemoveAccess({
  accessToId,
  itemType,
  setSelectedData,
  accessLevel,
}: RemoveAccess) {
  const { selectedItemType: type, selectedItemId } = useAppSelector(
    (state) => state.explorer
  );

  const { mutate: onRemove } = useRemoveAccessForData(type, selectedItemId);

  const isActiveUser = accessLevel === 'owner';

  const removeAccess = () => {
    onRemove({
      type,
      itemType,
      dataId: selectedItemId,
      accessToId,
      isActiveUser,
    });
    setSelectedData(null);
  };

  return (
    <button
      onClick={removeAccess}
      className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
      type="button"
    >
      {isActiveUser ? `Leave ${type}` : 'Remove access'}
    </button>
  );
}
