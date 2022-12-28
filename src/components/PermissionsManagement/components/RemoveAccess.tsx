import React from 'react';
import toast from 'react-hot-toast';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import { useGetExplorerFilesAndFolders } from '../../../features/explorer/explorerService';
import { useGetSharedFilesAndFolders } from '../../../features/shared/sharedService';
import { useAppSelector } from '../../../app/hooks';
import { ISelectedUser } from '..';

interface RemoveAccessProps {
  type: 'folder' | 'file';
  refetch: () => void;
  selectedUser: ISelectedUser | null;
  setSelectedUser: (i: ISelectedUser | null) => void;
}

function RemoveAccess({
  type,
  refetch,
  selectedUser,
  setSelectedUser,
}: RemoveAccessProps) {
  const { refetch: refetchShared } = useGetSharedFilesAndFolders();
  const { refetch: refetchExplorer } = useGetExplorerFilesAndFolders();
  const { users } = useGetFilteredTeamMembers();

  const explorerId = useAppSelector((state) => state.explorer.selectedItemId);
  const sharedId = useAppSelector((state) => state.shared.selectedItemId);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const selectedUserId = selectedUser?.id;
  const userId = users?.find((i) => i.user.id === selectedUserId)?.id;
  const selectedDataId = explorerId !== null ? explorerId : sharedId;
  const isActiveUser = selectedUserId === currentUserId;
  const isOwner = selectedUser?.accessLevel === 'owner';

  const removeAccess = async () => {
    const url = `${type}s/${selectedDataId}/access/${
      isActiveUser ? 'leave' : 'remove-access'
    }`;
    const data = isActiveUser
      ? null
      : { access_type: 'member', access_to_id: userId };

    try {
      const request = await requestNew({
        method: 'post',
        url,
        data,
      });
      toast.custom((t) => (
        <Toast
          type="success"
          title={request.message.title}
          body={null}
          toastId={t.id}
        />
      ));

      // refetch table and permissions popup
      refetch();
      if (explorerId) {
        refetchExplorer();
      } else {
        refetchShared();
      }
      setSelectedUser(null);
    } catch (e: unknown) {
      const error = e as { data: { message: { title: string } } };

      toast.custom((t) => (
        <Toast
          type="error"
          title={error.data.message.title}
          body={null}
          toastId={t.id}
        />
      ));
    }
  };

  if (isOwner) {
    return null;
  }

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

export default RemoveAccess;
