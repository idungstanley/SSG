import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layout/components/MainLayout';
import UnauthenticatedLayout from './layout/components/UnauthenticatedLayout';

// Authentication
import LoginPage from './pages/workspace/createWorkspace/auth/LoginPage';
import RegisterPage from './pages/workspace/createWorkspace/auth/RegisterPage';

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
import TeamMemberAcceptInvite from './pages/settings/teamMemberGroupSettings/TeamMemberAcceptInvitePage';
import SharedPage from './pages/shared';

// At workspace
import Index from './pages/workspace/Index';
import CreateWorkspace from './pages/workspace/createWorkspace';
import Notification from './pages/workspace/notification/Notification';
import Community from './pages/workspace/community';
import Dashboard from './pages/workspace/dashboard';
import Active from './pages/inbox/InboxesPage/components/Active';
import Hidden from './pages/inbox/InboxesPage/components/Hidden';
import Archived from './pages/inbox/InboxesPage/components/Archive';
import Restore from './pages/inbox/InboxesPage/components/Restore';
import Docs from './pages/workspace/docs';
import RenderWallets from './pages/workspace/wallet/components/RenderWallets';
import RenderList from './pages/workspace/Lists/RenderList';
import { IUser } from './types';
import RenderTaskModal from './pages/workspace/tasks/component/RenderTaskModal';
import NotFoundPage from './pages/NotFoundPage';
import Calendar from './pages/workspace/calendar';
import Goals from './pages/workspace/goals';
import Favorites from './pages/workspace/favorites';
import Home from './pages/workspace/home/Home';
import NewExplorerPage from './pages/newExplorer';

const inbox = [
  {
    path: 'inbox',
    element: <InboxesPage />,
    children: [
      { path: '', element: <Active /> },
      { path: 'hidden', element: <Hidden /> },
      { path: 'archived', element: <Archived /> },
      { path: 'restore', element: <Restore /> },
    ],
  },
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
];

export const routes = (user: IUser | null) =>
  createBrowserRouter([
    {
      path: 'workspace/onboarding',
      element: user ? (
        user.default_workspace_id ? (
          <Navigate to="/workspace" />
        ) : (
          <CreateWorkspace />
        )
      ) : (
        <Navigate to="/auth/login" />
      ),
    },
    {
      path: 'accept-invite/:inviteCode',
      element: user ? (
        <TeamMemberAcceptInvite />
      ) : (
        <Navigate to="/auth/register" />
      ),
    },
    { path: 'new-explorer', element: <NewExplorerPage /> },
    { path: 'new-explorer/:folderId', element: <NewExplorerPage /> },
    {
      path: '/',
      element: user ? (
        user.default_workspace_id ? (
          <MainLayout />
        ) : (
          <Navigate to="/workspace/onboarding" />
        )
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: '/', element: <Navigate to="/workspace" /> },
        { path: 'new-explorer', element: <NewExplorerPage /> },
        { path: 'new-explorer/:folderId', element: <NewExplorerPage /> },
        { path: 'explorer', element: <ExplorerPage /> },
        { path: 'explorer/:folderId', element: <ExplorerPage /> },
        { path: 'shared', element: <SharedPage /> },
        { path: 'search', element: <SearchPage /> },
        ...inbox,
        { path: 'settings/permissions', element: <PermissionsPage /> },
        { path: 'settings/team-members', element: <TeamMembersPage /> },
        {
          path: 'settings/team-members/invites',
          element: <TeamMemberInvitesPage />,
        },
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
      path: 'workspace',
      element: user ? (
        user.default_workspace_id ? (
          <Index />
        ) : (
          <Navigate to="/workspace/onboarding" />
        )
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: '', element: <Home /> },
        { path: 'notification', element: <Notification /> },
        { path: 'community', element: <Community /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'goals', element: <Goals /> },
        { path: 'docs', element: <Docs /> },
        { path: 'wallet/:walletId', element: <RenderWallets /> },
        { path: 'list/:listId', element: <RenderList /> },
        { path: 't/:taskId', element: <RenderTaskModal /> },
        ...inbox,
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
    { path: '*', element: <NotFoundPage /> },
  ]);

export default routes;
