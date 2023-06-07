import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../components';
import { getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { Spinner } from '../../../../../common';
import WorkspaceSettingsModal from '../../../../../pages/workspace/workspaceSettings/WorkspaceSettingsModal';
import { dimensions } from '../../../../../app/config/dimensions';
import { setFetchAllWorkspace } from '../../../../../features/workspace/workspaceSlice';

const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { sidebarWidthRD } = useAppSelector((state) => state.workspace);

  const { data: workSpaceData, status } = getWorkspaceService();
  // const [isDropdownActive, setDropDownActive] = useState<boolean>();
  const workspaceName = workSpaceData?.data?.workspace.name;
  const workspaceColor = workSpaceData?.data?.workspace.color as string;
  const joinName = workspaceName?.split(' ').slice(0, 2).join('').toUpperCase();
  const truncateName = joinName?.substring(0, 6) + '...';
  if (status == 'loading') {
    return <Spinner size={10} color={'#6B7280'} />;
  }

  return status == 'success' ? (
    <div className={`${showSidebar ? 'rounded border border-gray-400 p-0.5 h-6 cursor-pointer flex flex-grow' : ''} `}>
      <div className="flex items-center justify-between w-full" onClick={() => dispatch(setFetchAllWorkspace(true))}>
        <div className="flex items-center justify-between space-x-1">
          <AvatarWithInitials
            initials={
              workspaceName
                ?.split(' ')
                .slice(0, 2)
                .map((word) => word[0])
                .join('')
                .toUpperCase() as string
            }
            height="h-5"
            width="w-5"
            backgroundColour={workspaceColor}
            roundedStyle="rounded"
            textColor="white"
          />
          {showSidebar && (
            <p className="truncate" style={{ fontSize: '8px' }}>
              {sidebarWidthRD === MIN_SIDEBAR_WIDTH ? truncateName : joinName}
            </p>
          )}
        </div>
        <WorkspaceSettingsModal />
      </div>
    </div>
  ) : null;
}

export default WorkSpaceSelection;
