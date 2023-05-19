import { Outlet, useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AddFileModal from '../../../components/Pilot/components/details/properties/attachments/AddFileModal';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { switchWorkspaceService } from '../../../features/account/accountService';
import { setCurrentWorkspace, switchWorkspace } from '../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { useEffect } from 'react';

function MainLayout() {
  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);
  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (workSpaceId != currentWorkspaceId) {
      onSwitchWorkspace();
    }
  }, []);

  return (
    <div className={cl('h-full flex flex-col')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="grid w-full h-full grid-rows-1 overflow-hidden grid-cols-autoFr">
          <div className="relative h-full">
            {/* show extended navigation button */}
            {/* <OpenExtBtn /> */}
            <Sidebar />
          </div>
          <div className="w-full h-full">
            {/* <AdditionalHeader /> */}
            <Header />
            <div className="w-full h-full">
              <Outlet />
            </div>
            <AddFileModal
              endpoint={`attachments?id=${activeItemId}?type=${activeItemType}`}
              // endpoint={`attachments/${folderId || ''}`}
              // activeItemId={activeItemId}
              // activeType={activeItemType}
              invalidateQuery={['attachments'] as InvalidateQueryFilters<unknown>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
