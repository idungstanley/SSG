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
import SearchPage from './pages/search/SearchPage';

// Inboxes
import InboxesPage from './pages/inbox/InboxesPage';
import InboxPage from './pages/inbox/InboxPage';
import GeneralSettingsPage from './pages/inbox/inboxSettings/GeneralSettingsPage';
import PermissionsSettingsPage from './pages/inbox/inboxSettings/PermissionsSettingsPage';
import TeamMembersSettingsPage from './pages/inbox/inboxSettings/TeamMembersSettingsPage';
import TeamMemberGroupsSettingsPage from './pages/inbox/inboxSettings/TeamMemberGroupsSettingsPage';

// Settings
import PermissionsPage from './pages/settings/PermissionsPage';
import TeamMembersPage from './pages/settings/teamMemberSettings/TeamMembersPage';
import TeamMemberInvitesPage from './pages/settings/teamMemberInviteSettings/TeamMemberInvitesPage';

// Team member group settings
import TeamMemberGroupsPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupsPage';
import TeamMemberGroupGeneralSettingsPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupGeneralSettingsPage';
import TeamMemberGroupMembersPage from './pages/settings/teamMemberGroupSettings/TeamMemberGroupMembersPage';
import SharedPage from './pages/shared';

// At workspace
import Index from './pages/workspace/Index';
import Home from './pages/workspace/Home/Home';
import CreateWorkspace from './pages/workspace/createWorkspace';

const routes = (user) => [
  {
    path: '/',
    element: user != null ? <MainLayout /> : <Navigate to="/auth/login" />,
    children: [
      { path: '/', element: <Navigate to="/explorer" /> },
      { path: 'explorer', element: <ExplorerPage /> },
      { path: 'explorer/:folderId', element: <ExplorerPage /> },
      { path: 'shared', element: <SharedPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'inbox', element: <InboxesPage /> },
      { path: 'inbox/:inboxId', element: <InboxPage /> },
      { path: 'inbox/:inboxId/settings', element: <GeneralSettingsPage /> },
      {
        path: 'inbox/:inboxId/settings/permissions',
        element: <PermissionsSettingsPage />,
      },
      {
        path: 'inbox/:inboxId/settings/members',
        element: <TeamMembersSettingsPage />,
      },
      {
        path: 'inbox/:inboxId/settings/groups',
        element: <TeamMemberGroupsSettingsPage />,
      },
      { path: 'settings/permissions', element: <PermissionsPage /> },
      { path: 'settings/team-members', element: <TeamMembersPage /> },
      {
        path: 'settings/team-members/invites',
        element: <TeamMemberInvitesPage />,
      },

      // Team member group settings
      {
        path: 'settings/team-members/groups',
        element: <TeamMemberGroupsPage />,
      },
      {
        path: 'settings/team-members/groups/:teamMemberGroupId',
        element: <TeamMemberGroupGeneralSettingsPage />,
      },
      {
        path: 'settings/team-members/groups/:teamMemberGroupId/members',
        element: <TeamMemberGroupMembersPage />,
      },
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
  {
    path: '/workspace',
    element:
      user != null ? <UnauthenticatedLayout /> : <Navigate to="/auth/login" />,
    children: [
      { path: 'id', element: <Index /> },
      { path: 'onboarding', element: <CreateWorkspace /> },
      { path: 'home', element: <Home /> },
    ],
  },
];

export default routes;
