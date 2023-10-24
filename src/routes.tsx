import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts

const MainLayout = lazy(() => import('./layout/components/MainLayout'));
const UnauthenticatedLayout = lazy(() => import('./layout/components/UnauthenticatedLayout'));

// Authentication
const LoginPage = lazy(() => import('./pages/workspace/createWorkspace/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/workspace/createWorkspace/auth/RegisterPage'));

// Main
const SearchPage = lazy(() => import('./pages/search/SearchPage'));

// Inboxes
const InboxesPage = lazy(() => import('./pages/inbox/InboxesPage'));
const InboxPage = lazy(() => import('./pages/inbox/InboxPage'));
const GeneralSettingsPage = lazy(() => import('./pages/inbox/inboxSettings/GeneralSettingsPage'));
const PermissionsSettingsPage = lazy(() => import('./pages/inbox/inboxSettings/PermissionsSettingsPage'));
const TeamMembersSettingsPage = lazy(() => import('./pages/inbox/inboxSettings/TeamMembersSettingsPage'));
const TeamMemberGroupsSettingsPage = lazy(() => import('./pages/inbox/inboxSettings/TeamMemberGroupsSettingsPage'));

// Settings
const PermissionsPage = lazy(() => import('./pages/settings/PermissionsPage'));
const TeamMembersPage = lazy(() => import('./pages/settings/teamMemberSettings/TeamMembersPage'));
const TeamMemberInvitesPage = lazy(() => import('./pages/settings/teamMemberInviteSettings/TeamMemberInvitesPage'));

// Team member group settings
const TeamMemberGroupsPage = lazy(() => import('./pages/settings/teamMemberGroupSettings/TeamMemberGroupsPage'));
const TeamMemberGroupGeneralSettingsPage = lazy(
  () => import('./pages/settings/teamMemberGroupSettings/TeamMemberGroupGeneralSettingsPage')
);
const TeamMemberGroupMembersPage = lazy(
  () => import('./pages/settings/teamMemberGroupSettings/TeamMemberGroupMembersPage')
);
const TeamMemberAcceptInvite = lazy(
  () => import('./pages/settings/teamMemberGroupSettings/TeamMemberAcceptInvitePage')
);
const SharedPage = lazy(() => import('./pages/shared'));

// At workspace
const Notification = lazy(() => import('./pages/workspace/notification/Notification'));
const Dashboard = lazy(() => import('./pages/workspace/dashboard'));
const Active = lazy(() => import('./pages/inbox/InboxesPage/components/Active'));
const Hidden = lazy(() => import('./pages/inbox/InboxesPage/components/Hidden'));
const Archived = lazy(() => import('./pages/inbox/InboxesPage/components/Archive'));
const Restore = lazy(() => import('./pages/inbox/InboxesPage/components/Restore'));
const Docs = lazy(() => import('./pages/workspace/docs'));
const RenderTaskModal = lazy(() => import('./pages/workspace/tasks/component/RenderTaskModal'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const Calendar = lazy(() => import('./pages/calendar'));
const Goals = lazy(() => import('./pages/workspace/goals'));
const Favorites = lazy(() => import('./pages/workspace/favorites'));
const Home = lazy(() => import('./pages/workspace/home/Home'));
const ExplorerPage = lazy(() => import('./pages/explorer'));
const Directory = lazy(() => import('./pages/directory'));
const NotificationSettingsPage = lazy(() => import('./pages/settings/NotificationSettings/GeneralNotification/index'));
const UserSettings = lazy(() => import('./pages/settings/UserSettings/Pages/Settings'));
const CommunityPage = lazy(() => import('./pages/community'));
const SideBarSettings = lazy(() => import('./pages/settings/UserSettings/components/sidebar/SideBar'));
const CreateNewWorkspace = lazy(() => import('./pages/workspace/createWorkspace/NewWorkSpace'));
const LeaveTypesPage = lazy(() => import('./pages/calendar/pages/LeaveTypesPage'));
import { IUser } from './types';
const ManagePage = lazy(() => import('./pages/calendar/pages/ManagePage'));
const WorkspaceSettings = lazy(() => import('./pages/settings/WorkspaceSettings'));
const TasksIndex = lazy(() => import('./pages/workspace/tasksIndex'));
const SubscribersSettings = lazy(() => import('./pages/settings/NotificationSettings/SubscribersSettings'));
import { WallchartPage } from './pages/calendar/pages/WallchartPage';
import { useAppSelector } from './app/hooks';
const HubPage = lazy(() => import('./pages/hub'));
import { ListPage } from './pages/list';
import { WalletPage } from './pages/wallet';
import ManageHr from './pages/hr/pages/ManageHr';
import MyOverviewHrPage from './pages/hr/pages/MyOverviewHr';
const Construction = lazy(() => import('./pages/settings/UserSettings/Pages/Construction'));
const TaskInvite = lazy(() => import('./pages/workspace/tasks/taskInvite/TaskInvite'));
const WorkSpaceTable = lazy(() => import('./pages/settings/WorkspaceSettings/GeneralWorkSpaceSettings/Table'));
const EverythingPage = lazy(() => import('./pages/everything'));
const ForgotPassword = lazy(() => import('./pages/workspace/createWorkspace/auth/ForgotPassword/ForgotPassword'));
const EmailSentPage = lazy(() => import('./pages/workspace/createWorkspace/auth/ForgotPassword/EmailSentPage'));
const ResetPassword = lazy(() => import('./pages/workspace/createWorkspace/auth/ForgotPassword/ResetPassword'));
const AlsoHr = lazy(() => import('./pages/hr'));
const TimeClockPage = lazy(() => import('./pages/time-clock'));
const VerifyEmail = lazy(() => import('./pages/workspace/createWorkspace/auth/VerifyEmail/Index'));

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
    { path: 'auth/verify-email/:verificationCode', element: <VerifyEmail /> },
    {
      path: 'auth/verify-email/:verificationCode',
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
        {
          path: 'hr',
          element: <AlsoHr />,
          children: [
            {
              path: 'my-overview',
              element: <MyOverviewHrPage />
            },
            {
              path: '',
              element: <ManageHr />
            }
          ]
        },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'tasks', element: <TasksIndex /> },
        { path: 'insights', element: <TasksIndex /> },
        { path: 'insights/time-clock', element: <TimeClockPage /> },
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
        { path: 'everything', element: <EverythingPage /> },
        ...inbox,
        { path: 'shared', element: <SharedPage /> },
        { path: 'search', element: <SearchPage /> },
        ...inbox
      ]
    },
    {
      path: '/auth',
      element: !user ? <UnauthenticatedLayout /> : <Navigate to="/" />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'register/:inviteCode', element: <RegisterPage /> },
        { path: 'forgot', element: <ForgotPassword /> },
        { path: 'recover', element: <EmailSentPage /> },
        { path: 'reset-password/:resetCode', element: <ResetPassword /> }
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
        { path: 'workspaces', element: <WorkspaceSettings /> },
        { path: 'workspaces/settings', element: <WorkSpaceTable /> },
        {
          path: 'notifications',
          element: <NotificationSettingsPage />
        },
        { path: 'team-members/invites', element: <TeamMemberInvitesPage /> },
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
