import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import { switchWorkspaceService } from '../../../../../features/account/accountService';
import { selectCurrentWorkspaceId, setCurrentWorkspace } from '../../../../../features/auth/authSlice';
import {
  setMyWorkspacesSlideOverVisibility,
} from '../../../../../features/general/slideOver/slideOverSlice';
import {
  Button,
  StackListItemNarrow,
  AvatarWithInitials,
} from '../../../../../components';

function ListItem({ userWorkspace }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const currentWorkspaceId = useSelector(selectCurrentWorkspaceId);

  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: async (data) => {
      // Clear react-query and redux cache

      localStorage.setItem('currentWorkspaceId', JSON.stringify(data.data.workspace.id));
      await dispatch(setCurrentWorkspace({
        workspaceId: data.data.workspace.id,
      }));

      await queryClient.invalidateQueries();

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      // window.location.reload(false);
    },
  });

  const switchWorkspace = async () => {
    await switchWorkspaceMutation.mutate({
      workspaceId: userWorkspace.id,
    });
    await queryClient.invalidateQueries();
  };

  return (
    <StackListItemNarrow
      key={userWorkspace.id}
      title={userWorkspace.name}
      description="Add last activity timestamp"
      icon={(
        <AvatarWithInitials
          backgroundColour={userWorkspace.colour}
          initials={userWorkspace.initials}
        />
      )}
      button={(
        <Button
          buttonStyle="white"
          onClick={switchWorkspace}
          loading={switchWorkspaceMutation.status === 'loading'}
          disabled={currentWorkspaceId === userWorkspace.id}
          label={currentWorkspaceId === userWorkspace.id ? 'Current' : 'Switch'}
          icon={currentWorkspaceId === userWorkspace.id ? <CheckCircleIcon className="mr-1 -ml-2 h-5 w-5 text-green-500" aria-hidden="true" /> : <LogoutIcon className="mr-1 -ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
          width="w-36"
        />
      )}
    />
  );
}

ListItem.propTypes = {
  userWorkspace: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ListItem;
