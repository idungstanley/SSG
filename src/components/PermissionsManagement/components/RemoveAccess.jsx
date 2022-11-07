import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import { useGetExplorerFilesAndFolders } from '../../../features/explorer/explorerService';
import { useGetSharedFilesAndFolders } from '../../../features/shared/sharedService';

function RemoveAccess({
  type,
  refetch,
  selectedUserId,
  setSelectedUser,
}) {
  const { users } = useGetFilteredTeamMembers();
  const userId = users.find((i) => i.user.id === selectedUserId).id;
  const { currentUserId } = useSelector((state) => state.auth);
  const explorerId = useSelector((state) => state.explorer.selectedItemId);
  const sharedId = useSelector((state) => state.shared.selectedItemId);
  const selectedDataId = explorerId !== null ? explorerId : sharedId;
  const { refetch: refetchShared } = useGetSharedFilesAndFolders();
  const { refetch: refetchExplorer } = useGetExplorerFilesAndFolders();

  const isActiveUser = selectedUserId === currentUserId;

  const removeAccess = async () => {
    const url = `${type}s/${selectedDataId}/access/${isActiveUser ? 'leave' : 'remove-access'}`;
    const data = isActiveUser ? null : { access_type: 'member', access_to_id: userId };

    try {
      const request = await requestNew({
        method: 'post',
        url,
        data,
      });
      toast.custom((t) => (
        <Toast
          type='success'
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
    } catch (e) {
      toast.custom((t) => (
        <Toast
          type='error'
          title={e.data.message.title}
          body={null}
          toastId={t.id}
        />
      ));
    }
  };

  return (
    <button
      onClick={removeAccess}
      className='border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300'
      type='button'
    >
      {isActiveUser ? `Leave ${type}` : 'Remove access'}
    </button>
  );
}

RemoveAccess.propTypes = {
  type: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default RemoveAccess;
