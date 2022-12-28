import React from 'react';
import toast from 'react-hot-toast';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import ComboBoxForTeamMembers from '../../comboBox/ComboBoxForTeamMembers';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import { useAppSelector } from '../../../app/hooks';

interface AddAccessProps {
  type: 'folder' | 'file';
  setShowPopup: (i: boolean) => void;
  selectedDataId: string;
  refetch: () => void;
  activeMembers: string[];
}

function AddAccess({
  type,
  setShowPopup,
  selectedDataId,
  refetch,
  activeMembers,
}: AddAccessProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers(currentUserId, activeMembers);

  const onClickUser = async (id: string) => {
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

export default AddAccess;
