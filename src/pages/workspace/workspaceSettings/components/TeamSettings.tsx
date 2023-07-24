import React, { useEffect } from 'react';
import MenuWithTransition from '../../../../components/MenuLists/MenuWithTransition';
import { CiSettings } from 'react-icons/ci';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTab } from '../../../../features/settings/user/userSettingsSlice';

export default function TeamSettings() {
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const leftMenuItems = [
    {
      id: 1,
      type: 'link',
      onClick: `/${currentWorkspaceId}/settings/team-members`,
      title: 'Team members'
    },
    {
      id: 2,
      type: 'link',
      onClick: `/${currentWorkspaceId}/settings/team-members/invites`,
      title: 'Team member invites'
    },
    {
      id: 3,
      type: 'link',
      onClick: `/${currentWorkspaceId}/settings/team-members/groups`,
      title: 'Team member groups'
    },
    {
      id: 4,
      type: 'link',
      onClick: `/${currentWorkspaceId}/settings/permissions`,
      title: 'Permissions'
    }
  ];

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveTab('Teams'));
  }, []);
  return (
    <MenuWithTransition
      icon={<CiSettings className="w-6 h-6 cursor-pointer" aria-hidden="true" />}
      menuItems={leftMenuItems}
      tooltip="Team Settings"
    />
  );
}
