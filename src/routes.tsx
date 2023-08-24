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
import Notification from './pages/workspace/notification/Notification';
import Dashboard from './pages/workspace/dashboard';
import Active from './pages/inbox/InboxesPage/components/Active';
import Hidden from './pages/inbox/InboxesPage/components/Hidden';
import Archived from './pages/inbox/InboxesPage/components/Archive';
import Restore from './pages/inbox/InboxesPage/components/Restore';
import Docs from './pages/workspace/docs';
import RenderTaskModal from './pages/workspace/tasks/component/RenderTaskModal';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Calendar from './pages/calendar';
import Goals from './pages/workspace/goals';
import Favorites from './pages/workspace/favorites';
import Home from './pages/workspace/home/Home';
import ExplorerPage from './pages/explorer';
import Directory from './pages/directory';
import NotificationSettingsPage from './pages/settings/NotificationSettings/GeneralNotification/index';
import UserSettings from './pages/settings/UserSettings/Pages/Settings';
import CommunityPage from './pages/community';
import SideBarSettings from './pages/settings/UserSettings/components/sidebar/SideBar';
import CreateNewWorkspace from './pages/workspace/createWorkspace/NewWorkSpace';
import LeaveTypesPage from './pages/calendar/pages/LeaveTypesPage';
import { IUser } from './types';
import ManagePage from './pages/calendar/pages/ManagePage';
import WorkspaceSettings from './pages/settings/WorkspaceSettings';
import TasksIndex from './pages/workspace/tasksIndex';
import SubscribersSettings from './pages/settings/NotificationSettings/SubscribersSettings';
import { WallchartPage } from './pages/calendar/pages/WallchartPage';
import { useAppSelector } from './app/hooks';
import HubPage from './pages/hub';
import { ListPage } from './pages/list';
import { WalletPage } from './pages/wallet';
import Construction from './pages/settings/UserSettings/Pages/Construction';
import TaskInvite from './pages/workspace/tasks/taskInvite/TaskInvite';
import WorkSpaceTable from './pages/settings/WorkspaceSettings/GeneralWorkSpaceSettings/Table';
import AllListsPage from './pages/all-lists';

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

export const routes = (user: IUser | null) => {
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  return createBrowserRouter([
    {
      path: 'onboarding',
      element: user ? <CreateNewWorkspace /> : <Navigate to="/auth/login" />
    },
    {
      path: 'accept-invite/:inviteCode',
      element: <TeamMemberAcceptInvite />
    },
    {
      path: '/',
      element: user ? (
        user.default_workspace_id ? (
          <Navigate to={`/${currentWorkspaceId}`} />
        ) : (
          <Navigate to="/onboarding" />
        )
      ) : (
        <Navigate to="/auth/login" />
      )
    },
    {
      path: ':taskWorkspace/tasks/t/:taskInvite',
      element: <TaskInvite />
    },
    {
      path: '/:workSpaceId',
      element: <MainLayout />,
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
        {
          path: 'calendar',
          element: <Calendar />,
          children: [
            {
              path: '',
              element: <WallchartPage />
            },

            {
              path: 'types',
              element: <LeaveTypesPage />
            },
            {
              path: 'manage',
              element: <ManagePage />
            }
          ]
        },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'tasks', element: <TasksIndex /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'goals', element: <Goals /> },
        { path: 'docs', element: <Docs /> },
        // old view here now default  =============================
        { path: 'tasks/h/:hubId', element: <HubPage /> },
        { path: 'tasks/h/:hubId/t/:taskId', element: <HubPage /> },
        { path: 'tasks/sh/:subhubId', element: <HubPage /> },
        { path: 'tasks/sh/:subhubId/t/:taskId', element: <HubPage /> },
        { path: 'tasks/w/:walletId', element: <WalletPage /> },
        { path: 'tasks/w/:walletId/t/:taskId', element: <WalletPage /> },
        { path: 'tasks/l/:listId', element: <ListPage /> },
        { path: 'tasks/l/:listId/t/:taskId', element: <ListPage /> },
        { path: 't/:taskId', element: <RenderTaskModal /> },
        { path: 'all-lists', element: <AllListsPage /> },
        ...inbox,
        { path: 'shared', element: <SharedPage /> },
        { path: 'search', element: <SearchPage /> },
        ...inbox
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
      path: '/:workSpaceId/settings',
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
        { path: 'people', element: <TeamMembersPage /> },
        { path: 'construction', element: <Construction /> },
        // { path: 'team-members', element: <TeamMembersPage /> },
        { path: 'workspaces', element: <WorkspaceSettings /> },
        { path: 'workspaces/settings', element: <WorkSpaceTable /> },
        {
          path: 'notifications',
          element: <NotificationSettingsPage />
        },
        { path: 'team-members/invites', element: <TeamMemberInvitesPage /> },
        // { path: 'team-members', element: <TeamMembersPage /> },
        { path: 'team-members/groups', element: <TeamMemberGroupsPage /> },
        { path: 'settings/permisions', element: <PermissionsPage /> },
        { path: 'subscribers', element: <SubscribersSettings /> },
        {
          path: 'team-members/groups/:teamMemberGroupId',
          element: <TeamMemberGroupGeneralSettingsPage />
        },
        {
          path: 'team-members/groups/:teamMemberGroupId/members',
          element: <TeamMemberGroupMembersPage />
        }
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);
};

export default routes;
