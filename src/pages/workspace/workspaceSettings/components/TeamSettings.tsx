import React from 'react';
import MenuWithTransition from '../../../../components/MenuLists/MenuWithTransition';
import { CiSettings } from 'react-icons/ci';

const leftMenuItems = [
  {
    id: 1,
    type: 'link',
    onClick: 'settings/team-members',
    title: 'Team members'
  },
  {
    id: 2,
    type: 'link',
    onClick: 'settings/team-members/invites',
    title: 'Team member invites'
  },
  {
    id: 3,
    type: 'link',
    onClick: 'settings/team-members/groups',
    title: 'Team member groups'
  },
  {
    id: 4,
    type: 'link',
    onClick: 'settings/permissions',
    title: 'Permissions'
  }
];

export default function TeamSettings() {
  return (
    <MenuWithTransition
      icon={<CiSettings className="w-6 h-6 cursor-pointer" aria-hidden="true" />}
      menuItems={leftMenuItems}
      tooltip="Team Settings"
    />
  );
}
