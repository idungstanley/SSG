import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAddGroupTeamMemberSlideOverVisibility } from '../../../../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMembers } from '../../../../../../../features/workspace/teamMemberService';
import { addTeamMemberToGroupService } from '../../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import {
  SlideOver,
  Button,
  ComboBoxWithAvatar,
  AvatarWithInitials,
} from '../../../../../../../components';

function AddGroupTeamMemberSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { teamMemberGroupId } = useParams();

  const showAddGroupTeamMemberSlideOver = useSelector((state) => state.slideOver.showAddGroupTeamMemberSlideOver);

  const [unpaginatedTeamMemberOptions, setUnpaginatedTeamMemberOptions] = useState([]);
  const [teamMemberId, setTeamMemberId] = useState(null);
  const [query, setQuery] = useState('');

  const addTeamMemberToGroupMutation = useMutation(addTeamMemberToGroupService, {
    onSuccess: () => {
      queryClient.invalidateQueries('team_member_group', teamMemberGroupId);
      dispatch(setAddGroupTeamMemberSlideOverVisibility(false));
      setQuery('');
      setTeamMemberId(null);
    },
  });

  const onQueryChange = (q) => {
    setQuery(q);
    setTeamMemberId(null);
  };

  const onChange = (key) => {
    setTeamMemberId(key);
  };

  const onSubmit = () => {
    if (teamMemberId == null) {
      return false;
    }

    return addTeamMemberToGroupMutation.mutate({
      teamMemberId,
      teamMemberGroupId,
    });
  };

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
  } = useGetTeamMembers({
    query,
  });

  useEffect(() => {
    const temp = [];

    if (status === 'success' && data) {
      const flat = data.pages.flatMap((page) => page.data.team_members);

      flat.map((teamMember) => {
        const avatar = (
          <AvatarWithInitials
            height="h-6"
            width="w-6"
            initials={teamMember.initials}
            backgroundColour={teamMember.colour}
            textSize="text-xs"
          />
        );

        return temp.push({
          id: teamMember.id,
          name: teamMember.user.name,
          avatar,
        });
      });
    }

    return setUnpaginatedTeamMemberOptions(temp);
  }, [data]);

  return (
    <SlideOver
      show={showAddGroupTeamMemberSlideOver}
      onClose={() => dispatch(setAddGroupTeamMemberSlideOverVisibility(false))}
      headerTitle="Add team member to group"
      headerDescription="Select a team member to add"
      body={(
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <ComboBoxWithAvatar
              label="Team member"
              query={query}
              onQueryChange={onQueryChange}
              onChange={onChange}
              selectedKey={teamMemberId}
              options={unpaginatedTeamMemberOptions}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={status === 'loading'}
            />
          </div>
        </div>
      )}
      footerButtons={(
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={addTeamMemberToGroupMutation.status === 'loading'}
          label="Add member"
          width="w-40"
        />
      )}
    />
  );
}

export default AddGroupTeamMemberSlideOver;
