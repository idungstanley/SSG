import React from 'react';
import toast from 'react-hot-toast';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';
import SelectMenuSimple from '../../selectMenu/SelectMenuSimple';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import { useAppSelector } from '../../../app/hooks';
import { IInboxMember } from '../../../features/inbox/inbox.interfaces';

interface ChangeAccessLevelProps {
  type: 'folder' | 'file';
  refetch: () => void;
  selectedDataId: string;
  selectedUserId: string;
  setSelectedUser: (i: IInboxMember | null) => void;
  actualAccess: string;
}

function ChangeAccessLevel({
  type,
  selectedDataId,
  refetch,
  selectedUserId,
  setSelectedUser,
  actualAccess,
}: ChangeAccessLevelProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers();
  const userId = users?.find((i) => i.user.id === selectedUserId)?.id;

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

export default ChangeAccessLevel;
