import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import { useRemoveAccessForData } from '../../../../../../../features/permissions/permissionsService';

interface RemoveAccessProps {
  itemType: 'member' | 'member-group';
  accessToId: string;
  isActiveUser: boolean;
}

export default function RemoveAccess({
  accessToId,
  itemType,
  isActiveUser,
}: RemoveAccessProps) {
  const { activeEntity } = useAppSelector(
    (state) => state.workspace
  );
  const {id, type} = activeEntity;

  const { mutate: onRemoveAccess } = useRemoveAccessForData(type, id);

  const removeAccess = () => {
    if (type && id) {
      onRemoveAccess({
        type,
        itemType,
        dataId: id,
        accessToId,
        isActiveUser,
      });
    }
  };

  return (
    <button
      onClick={removeAccess}
      className="p-2 text-gray-600 transition-all duration-300 border rounded-md hover:border-indigo-600 hover:text-indigo-600"
      type="button"
    >
      {isActiveUser ? `Leave ${type}` : 'Remove access'}
    </button>
  );
}
