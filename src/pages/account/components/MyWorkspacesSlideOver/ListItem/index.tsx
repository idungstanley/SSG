import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment-timezone';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import { switchWorkspaceService } from '../../../../../features/account/accountService';
import {
  selectCurrentWorkspaceId,
  setCurrentWorkspace,
  switchWorkspace,
} from '../../../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import {
  Button,
  StackListItemNarrow,
  AvatarWithInitials,
} from '../../../../../components';
import { IWorkspace } from '../../../../../features/account/account.interfaces';

interface ListItemProps {
  userWorkspace: IWorkspace;
}

function ListItem({ userWorkspace }: ListItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentWorkspaceId = useSelector(selectCurrentWorkspaceId);

  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: (data) => {
      // Clear react-query and redux cache

      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(data.data.workspace.id)
      );

      dispatch(
        setCurrentWorkspace({
          workspaceId: data.data.workspace.id,
        })
      );

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      navigate('/explorer');

      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
    },
  });

  const onSwitchWorkspace = () => {
    switchWorkspaceMutation.mutate({
      workspaceId: userWorkspace.id,
    });
    queryClient.invalidateQueries();
  };

  return (
    <StackListItemNarrow
      key={userWorkspace.id}
      title={userWorkspace.name}
      description={`Last activity ${moment(
        userWorkspace.last_activity_at
      ).fromNow()}`}
      icon={
        <AvatarWithInitials
          backgroundColour={userWorkspace.colour}
          initials={userWorkspace.initials}
        />
      }
      button={
        <Button
          buttonStyle="white"
          onClick={onSwitchWorkspace}
          loading={switchWorkspaceMutation.status === 'loading'}
          disabled={currentWorkspaceId === userWorkspace.id}
          label={currentWorkspaceId === userWorkspace.id ? 'Current' : 'Switch'}
          icon={
            currentWorkspaceId === userWorkspace.id ? (
              <CheckCircleIcon
                className="mr-1 -ml-2 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <LogoutIcon
                className="mr-1 -ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )
          }
          width="w-36"
        />
      }
    />
  );
}

export default ListItem;
