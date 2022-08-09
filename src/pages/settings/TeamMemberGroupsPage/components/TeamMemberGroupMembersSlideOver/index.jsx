import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTeamMemberGroupMembersSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { useGetMyWorkspacesQuery } from '../../../../../features/account/accountApi';
import {
  StackListWithHeader,
  SlideOver,
} from '../../../../../components';

function TeamMemberGroupMembersSlideOver() {
  const dispatch = useDispatch();

  const showTeamMemberGroupMembersSlideOver = useSelector((state) => state.slideOver.showTeamMemberGroupMembersSlideOver);

  const { isLoading } = useGetMyWorkspacesQuery();

  return (
    <SlideOver
      show={showTeamMemberGroupMembersSlideOver}
      onClose={() => dispatch(setTeamMemberGroupMembersSlideOverVisibility(false))}
      headerTitle="Members in Finance group"
      body={(
        !isLoading ? (
          <div className="px-4 sm:px-6 space-y-8 sm:py-0">
            <div className="overflow-hidden flex-1 h-full mt-5">
              <StackListWithHeader
                title={<span>All Workspaces</span>}
                items={<span>ITEMS GO HERE</span>}
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

export default TeamMemberGroupMembersSlideOver;
