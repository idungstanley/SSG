import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useRemoveAccessForData } from '../../../../../features/permissions/permissionsService';

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
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const id = pilotSideOver.id;
  const type = pilotSideOver.type as 'file' | 'folder';

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
      className="border p-2 rounded-md text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
      type="button"
    >
      {isActiveUser ? `Leave ${type}` : 'Remove access'}
    </button>
  );
}
