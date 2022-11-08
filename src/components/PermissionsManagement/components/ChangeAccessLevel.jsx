/* eslint array-bracket-spacing: 0 */
/* eslint react/jsx-closing-bracket-location: 0 */
import React from 'react';
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import SelectMenuSimple from '../../selectMenu/SelectMenuSimple';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';

function ChangeAccessLevel({
  type,
  selectedDataId,
  refetch,
  selectedUserId,
  setSelectedUser,
  actualAccess,
}) {
  const { currentUserId } = useSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers();
  const userId = users.find((i) => i.user.id === selectedUserId).id;

  const onChangeAccessLevel = async (e) => {
    const url = `${type}s/${selectedDataId}/access/change-access-level`;

    try {
      const request = await requestNew({
        method: 'post',
        url,
        data: {
          access_type: 'member',
          access_to_id: userId,
          access_level_key: e.id,
        },
      });
      toast.custom((t) => (
        <Toast
          type="success"
          title={request.message.title}
          body={null}
          toastId={t.id}
        />
      ));
      refetch();
      setSelectedUser(null);
    } catch (error) {
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

  if (selectedUserId === currentUserId) {
    return null;
  }

  return (
    <div>
      <SelectMenuSimple
        label="Change role"
        options={[
          { id: 'read', name: 'Read-only' },
          { id: 'modify', name: 'Manage' },
          { id: 'full-control', name: 'Full control' },
          { id: 'owner', name: 'Owner' },
        ]}
        onChange={onChangeAccessLevel}
        selectedId={actualAccess}
      />
    </div>
  );
}

ChangeAccessLevel.propTypes = {
  type: PropTypes.string.isRequired,
  selectedDataId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  actualAccess: PropTypes.string.isRequired,
};

export default ChangeAccessLevel;
