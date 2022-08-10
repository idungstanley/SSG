import React from 'react';
import { Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layout/components/MainLayout';
import UnauthenticatedLayout from './layout/components/UnauthenticatedLayout';

// Authentication
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Main
import ExplorerPage from './pages/explorer/ExplorerPage';
import SearchScreen from './Search/screens/SearchScreen';

// Inboxes
import InboxesPage from './pages/inbox/InboxesPage';
import InboxPage from './pages/inbox/InboxPage';
import GeneralSettingsPage from './pages/inbox/inboxSettings/GeneralSettingsPage';
import PermissionsSettingsPage from './pages/inbox/inboxSettings/PermissionsSettingsPage';
import TeamMembersSettingsPage from './pages/inbox/inboxSettings/TeamMembersSettingsPage';
import TeamMemberGroupsSettingsPage from './pages/inbox/inboxSettings/TeamMemberGroupsSettingsPage';

// Settings
import PermissionsPage from './pages/settings/PermissionsPage';
import TeamMembersPage from './pages/settings/TeamMembersPage';
import TeamMemberInvitesPage from './pages/settings/TeamMemberInvitesPage';

// Team member group settings
import TeamMemberGroupsPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupsPage';
import TeamMemberGroupGeneralSettingsPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupGeneralSettingsPage';
import TeamMemberGroupMembersPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupMembersPage';

const routes = (user) => [
  {
    path: '/',
    element: user != null ? <MainLayout /> : <Navigate to="/auth/login" />,
    children: [
      { path: '/', element: <Navigate to="/explorer" /> },
      { path: 'explorer', element: <ExplorerPage /> },
      { path: 'explorer/:folderId', element: <ExplorerPage /> },
      { path: 'search', element: <SearchScreen /> },
      { path: 'inbox', element: <InboxesPage /> },
      { path: 'inbox/:inboxId', element: <InboxPage /> },
      { path: 'inbox/:inboxId/settings', element: <GeneralSettingsPage /> },
      { path: 'inbox/:inboxId/settings/permissions', element: <PermissionsSettingsPage /> },
      { path: 'inbox/:inboxId/settings/members', element: <TeamMembersSettingsPage /> },
      { path: 'inbox/:inboxId/settings/groups', element: <TeamMemberGroupsSettingsPage /> },
      { path: 'settings/permissions', element: <PermissionsPage /> },
      { path: 'settings/team-members', element: <TeamMembersPage /> },
      { path: 'settings/team-members/invites', element: <TeamMemberInvitesPage /> },

      // Team member group settings
      { path: 'settings/team-members/groups', element: <TeamMemberGroupsPage /> },
      { path: 'settings/team-members/groups/:teamMemberGroupId', element: <TeamMemberGroupGeneralSettingsPage /> },
      { path: 'settings/team-members/groups/:teamMemberGroupId/members', element: <TeamMemberGroupMembersPage /> },
    ],
  },
  {
    path: '/auth',
    element: user == null ? <UnauthenticatedLayout /> : <Navigate to="/" />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'register/:inviteCode', element: <RegisterPage /> },
    ],
  },
];

export default routes;
