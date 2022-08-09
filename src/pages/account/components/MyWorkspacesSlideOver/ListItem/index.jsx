import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import { useSwitchWorkspaceMutation } from '../../../../../features/account/accountApi';
import { selectCurrentWorkspaceId } from '../../../../../features/auth/authSlice';
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
  const navigate = useNavigate();

  const currentWorkspaceId = useSelector(selectCurrentWorkspaceId);
  const [switchWorkspaceMutation, { isLoading }] = useSwitchWorkspaceMutation();

  const switchWorkspace = async () => {
    try {
      await switchWorkspaceMutation({
        workspaceId: userWorkspace.id,
        showSuccess: true,
      }).unwrap();

      // Clear all cache

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      navigate('/explorer');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StackListItemNarrow
      key={userWorkspace.id}
      title={userWorkspace.name}
      description="Last accessed 27 minutes ago"
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
          loading={isLoading}
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
