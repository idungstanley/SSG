import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AddFileModal from '../../../components/Pilot/components/details/properties/attachments/AddFileModal';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { switchWorkspaceService, useGetUserSettingsKeys } from '../../../features/account/accountService';
import { selectCurrentUser, setCurrentWorkspace, switchWorkspace } from '../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DragContext from './DragContext/DragContext';
import { Toaster } from 'react-hot-toast';
import Favorites from '../../../pages/workspace/favorites';
import useResolution from '../../../hooks/useResolution';
import { STORAGE_KEYS, dimensions } from '../../../app/config/dimensions';
import { SetUserSettingsStore } from '../../../features/account/accountSlice';
import { setActiveHotkeyIds } from '../../../features/workspace/workspaceSlice';
import TaskShortCutModal from '../../../utils/taskShortCut/TaskShortCutModal';

function MainLayout() {
  const key = 'sidebar';
  const location = useLocation();
  const navigate = useNavigate();
  const { workSpaceId } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const resolution = useResolution();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { userSettingsData } = useAppSelector((state) => state.account);
  const [taskShortcut, setTaskShortcut] = useState(false);

  const user = useAppSelector(selectCurrentUser);

  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: (data) => {
      // Clear react-query and redux cache
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data.data.workspace.id));

      dispatch(setCurrentWorkspace(data.data.workspace.id));
      dispatch(setMyWorkspacesSlideOverVisibility(false));
      // navigate('/');

      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
    }
  });
  const onSwitchWorkspace = () => {
    switchWorkspaceMutation.mutate({
      workspaceId: workSpaceId as string
    });
    queryClient.invalidateQueries(['workspace']);
  };

  const { data: userData } = useGetUserSettingsKeys(true, key, resolution);
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.key === '?') {
      // Check if the active element is an input field (you can extend this to include other elements as needed)
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      } else {
        setTaskShortcut(true);
      }
    }
  });

  useEffect(() => {
    if (userData) {
      const value = userData.value;
      localStorage.setItem(
        STORAGE_KEYS.USER_SETTINGS_DATA,
        JSON.stringify({
          ...userSettingsData,
          [STORAGE_KEYS.SIDEBAR_WIDTH]: value.sidebarWidth ? value.sidebarWidth : dimensions.navigationBar.default,
          [STORAGE_KEYS.PILOT_WIDTH]: value.pilotWidth ? value.pilotWidth : dimensions.pilot.default,
          [STORAGE_KEYS.EXTENDED_BAR_WIDTH]: value.extendedBarWidth
            ? value.extendedBarWidth
            : dimensions.extendedBar.default,
          [STORAGE_KEYS.HOT_KEYS]: value.hotkeys ? value.hotkeys : []
        })
      );
      dispatch(setActiveHotkeyIds(value.hotkeys ? value.hotkeys : []));
      dispatch(SetUserSettingsStore({ ...userSettingsData, ...value }));
    }
  }, [userData]);

  useEffect(() => {
    if (user) {
      if (workSpaceId != currentWorkspaceId) {
        onSwitchWorkspace();
      }
    } else {
      localStorage.setItem('visitingRoute', location.pathname);
      navigate('/auth/login');
    }
  }, []);

  return workSpaceId === currentWorkspaceId ? (
    <div className={cl('h-full flex flex-col')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <Toaster position="bottom-left" />
      <DragContext>
        <div className="flex h-full">
          <div className="grid w-full h-full grid-rows-1 overflow-hidden grid-cols-autoFr">
            <div className="relative h-full">
              <Sidebar />
            </div>
            <div className="w-full h-full">
              {/* <AdditionalHeader /> */}
              {userSettingsData?.isFavoritePinned && <Favorites />}
              <Header />
              <div className="w-full h-full">
                <Outlet />
              </div>
              <AddFileModal
                endpoint={'attachments'}
                invalidateQuery={['attachments'] as InvalidateQueryFilters<unknown>}
              />
            </div>
          </div>
        </div>
      </DragContext>
      {taskShortcut && <TaskShortCutModal setTaskShortcutModal={setTaskShortcut} />}
    </div>
  ) : null;
}

export default MainLayout;
