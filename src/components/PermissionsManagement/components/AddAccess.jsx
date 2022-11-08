import React from 'react';
import toast from 'react-hot-toast';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import ComboBoxForTeamMembers from '../../comboBox/ComboBoxForTeamMembers';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';

function AddAccess({
  type,
  setShowPopup,
  selectedDataId,
  refetch,
  activeMembers,
}) {
  const { currentUserId } = useSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers(currentUserId, activeMembers);

  const onClickUser = async (id) => {
    if (id) {
      const url = `${type}s/${selectedDataId}/access/add-access`;
      try {
        const request = await requestNew({
          method: 'post',
          url,
          data: {
            access_type: 'member',
            access_to_id: id,
            access_level_key: 'read',
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
      } catch (e) {
        toast.custom((t) => (
          <Toast
            type="error"
            title={e.data.message.title}
            body={null}
            toastId={t.id}
          />
        ));
      }
    }
  };

  if (users && !users.length) {
    return null;
  }

  return (
    <>
      <h2>{`2. Add access to ${type}`}</h2>
      {users ? (
        <ComboBoxForTeamMembers
          setShowPopup={setShowPopup}
          onClickArrow={onClickUser}
          absolute={false}
          users={users}
        />
      ) : null}
    </>
  );
}

AddAccess.propTypes = {
  setShowPopup: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selectedDataId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  activeMembers: PropTypes.array.isRequired,
};

export default AddAccess;
