import React from 'react';
import { useDispatch } from 'react-redux';
import { setMyWorkspacesSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetMyWorkspaces } from '../../../../features/account/accountService';
import { StackListWithHeader, SlideOver } from '../../../../components';
import ListItem from './ListItem';
import { useAppSelector } from '../../../../app/hooks';

function MyWorkspacesSlideOver() {
  const dispatch = useDispatch();

  const { showMyWorkspacesSlideOver } = useAppSelector((state) => state.slideOver);

  const { data, status } = useGetMyWorkspaces();

  return (
    <SlideOver
      show={showMyWorkspacesSlideOver}
      onClose={() => dispatch(setMyWorkspacesSlideOverVisibility(false))}
      headerTitle="My workspaces"
      body={
        data && status === 'success' ? (
          <div className="px-4 sm:px-6 space-y-8 sm:py-0">
            <div className="overflow-hidden flex-1 h-full mt-5">
              <StackListWithHeader
                title={<span>All Workspaces</span>}
                items={data.data.workspaces.map((userWorkspace) => (
                  <ListItem key={userWorkspace.id} userWorkspace={userWorkspace} />
                ))}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )
      }
    />
  );
}

export default MyWorkspacesSlideOver;
