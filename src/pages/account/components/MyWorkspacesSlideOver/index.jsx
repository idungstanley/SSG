import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMyWorkspacesSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetMyWorkspacesQuery } from '../../../../features/account/accountApi';
import {
  StackListWithHeader,
  SlideOver,
} from '../../../../components';
import ListItem from './ListItem';

function MyWorkspacesSlideOver() {
  const dispatch = useDispatch();

  const showMyWorkspacesSlideOver = useSelector((state) => state.slideOver.showMyWorkspacesSlideOver);

  const { data, isLoading } = useGetMyWorkspacesQuery();

  return (
    <SlideOver
      show={showMyWorkspacesSlideOver}
      onClose={() => dispatch(setMyWorkspacesSlideOverVisibility(false))}
      headerTitle="My workspaces"
      body={(
        !isLoading && data ? (
          <div className="px-4 sm:px-6 space-y-8 sm:py-0">
            <div className="overflow-hidden flex-1 h-full mt-5">
              <StackListWithHeader
                title={<span>All Workspaces</span>}
                items={(
                  data.data.workspaces.map((userWorkspace) => (
                    <ListItem userWorkspace={userWorkspace} />
                  ))
                )}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )
      )}
    />
  );
}

export default MyWorkspacesSlideOver;
