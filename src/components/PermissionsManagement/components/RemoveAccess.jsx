import React from 'react';
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';

function RemoveAccess({
  type,
  dataId,
  refetch,
  selectedUserId,
  setSelectedUser,
}) {
  const { users } = useGetFilteredTeamMembers();
  const userId = users.find((i) => i.user.id === selectedUserId).id;

  const removeAccess = async () => {
    const url = `${type}s/${dataId}/access/remove-access`;
    try {
      const request = await requestNew({ method: 'post', url, data: { access_type: 'member', access_to_id: userId } });
      toast.custom((t) => (<Toast type='success' title={request.message.title} body={null} toastId={t.id} />));
      refetch();
      setSelectedUser(null);
    } catch (e) {
      toast.custom((t) => (<Toast type='error' title={e.data.message.title} body={null} toastId={t.id} />));
    }
  };

  return (
    <button onClick={removeAccess} className='border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300' type='button'>Remove access</button>
  );
}

RemoveAccess.propTypes = {
  type: PropTypes.string.isRequired,
  dataId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default RemoveAccess;
