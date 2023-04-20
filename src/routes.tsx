import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layout/components/MainLayout';
import UnauthenticatedLayout from './layout/components/UnauthenticatedLayout';

// Authentication
import LoginPage from './pages/workspace/createWorkspace/auth/LoginPage';
import RegisterPage from './pages/workspace/createWorkspace/auth/RegisterPage';

// Main
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
import CreateWorkspace from './pages/workspace/createWorkspace';
import Notification from './pages/workspace/notification/Notification';
import Dashboard from './pages/workspace/dashboard';
import Active from './pages/inbox/InboxesPage/components/Active';
import Hidden from './pages/inbox/InboxesPage/components/Hidden';
import Archived from './pages/inbox/InboxesPage/components/Archive';
import Restore from './pages/inbox/InboxesPage/components/Restore';
import Docs from './pages/workspace/docs';
import RenderWallets from './pages/workspace/wallet/renderWallets/RenderWallets';
import RenderList from './pages/workspace/lists/RenderList';
import { IUser } from './types';
import RenderTaskModal from './pages/workspace/tasks/component/RenderTaskModal';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Calendar from './pages/workspace/calendar';
import Goals from './pages/workspace/goals';
import Favorites from './pages/workspace/favorites';
import Home from './pages/workspace/home/Home';
import ExplorerPage from './pages/explorer';
import RenderHubs from './pages/workspace/hubs/components/renderHubs/RenderHubs';
import Directory from './pages/directory';
import NotificationSettingsPage from './pages/settings/NotificationSettings/index';
// import UserSettingsProfile from './pages/settings/UserSettings';
import UserSettings from './pages/settings/UserSettings/Pages/Settings';
import CommunityPage from './pages/community';
import UnderConstruction from './pages/settings/UserSettings/Pages/UnderConstruction';
import SideBarSettings from './pages/settings/UserSettings/components/sidebar/SideBar';

const inbox = [
  {
    path: 'inbox',
    element: <InboxesPage />,
    children: [
      { path: '', element: <Active /> },
      { path: 'hidden', element: <Hidden /> },
      { path: 'archived', element: <Archived /> },
      { path: 'restore', element: <Restore /> }
    ]
  },
  { path: 'inbox/:inboxId', element: <InboxPage /> },
  { path: 'inbox/:inboxId/settings', element: <GeneralSettingsPage /> },
  {
    path: 'inbox/:inboxId/settings/permissions',
    element: <PermissionsSettingsPage />
  },
  {
    path: 'inbox/:inboxId/settings/members',
    element: <TeamMembersSettingsPage />
  },
  {
    path: 'inbox/:inboxId/settings/groups',
    element: <TeamMemberGroupsSettingsPage />
  }
];

export const routes = (user: IUser | null) =>
  createBrowserRouter([
    {
      path: 'onboarding',
      element: user ? <CreateWorkspace /> : <Navigate to="/auth/login" />
    },
    // {
    //   path: 'workspaceId',
    //   element: <MainLayout />
    // },
    {
      path: 'accept-invite/:inviteCode',
      element: <TeamMemberAcceptInvite />
    },
    {
      path: '/',
      element: user ? (
        user.default_workspace_id ? (
          <MainLayout />
        ) : (
          <Navigate to="/onboarding" />
        )
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: '', element: <Home /> },
        { path: 'explorer', element: <ExplorerPage /> },
        { path: 'explorer/:folderId', element: <ExplorerPage /> },
        { path: 'directory', element: <Directory /> },
        { path: 'directory/case', element: <Directory /> },
        { path: 'directory/shelf', element: <Directory /> },
        { path: 'directory/shelf/:directoryId', element: <Directory /> },
        { path: 'notification', element: <Notification /> },
        { path: 'community', element: <CommunityPage /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'goals', element: <Goals /> },
        { path: 'docs', element: <Docs /> },
        { path: 'hub', element: <RenderHubs /> },
        { path: 'hub/:hubId', element: <RenderHubs /> },
        { path: 'hub/:hubId/t/:taskId', element: <RenderHubs /> },
        { path: 'wallet/:walletId', element: <RenderWallets /> },
        { path: 'wallet/:walletId/t/:taskId', element: <RenderWallets /> },
        { path: 'list/:listId', element: <RenderList /> },
        { path: 'list/:listId/t/:taskId', element: <RenderList /> },
        { path: 't/:taskId', element: <RenderTaskModal /> },
        ...inbox,
        { path: 'shared', element: <SharedPage /> },
        { path: 'search', element: <SearchPage /> },
        ...inbox,
        {
          path: 'settings/notifications',
          element: <NotificationSettingsPage />
        },
        {
          path: 'settings/team-members/groups/:teamMemberGroupId',
          element: <TeamMemberGroupGeneralSettingsPage />
        },
        {
          path: 'settings/team-members/groups/:teamMemberGroupId/members',
          element: <TeamMemberGroupMembersPage />
        }
      ]
    },
    {
      path: '/auth',
      element: user == null ? <UnauthenticatedLayout /> : <Navigate to="/" />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'register/:inviteCode', element: <RegisterPage /> }
      ]
    },
    {
      path: '/settings',
      element: user ? (
        user.default_workspace_id ? (
          <SideBarSettings />
        ) : (
          <Navigate to="/onboarding" />
        )
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: 'profile', element: <UserSettings /> },
        { path: 'construction', element: <UnderConstruction /> },
        { path: 'team-members/invites', element: <TeamMemberInvitesPage /> },
        { path: 'team-members', element: <TeamMembersPage /> },
        { path: 'team-members/groups', element: <TeamMemberGroupsPage /> },
        { path: 'settings/permisions', element: <PermissionsPage /> }
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);

export default routes;
