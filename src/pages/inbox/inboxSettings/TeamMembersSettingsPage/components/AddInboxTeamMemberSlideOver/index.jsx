import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAddInboxTeamMemberSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMembers } from '../../../../../../features/workspace/teamMemberService';
import { addTeamMemberInboxAccessService } from '../../../../../../features/inbox/inboxSettingsService';
import {
  SlideOver,
  SelectMenuSimple,
  Button,
  ComboBoxWithAvatar,
  AvatarWithInitials,
} from '../../../../../../components';

function AddInboxTeamMemberSlideOver() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const queryClient = useQueryClient();

  const showAddInboxTeamMemberSlideOver = useSelector((state) => state.slideOver.showAddInboxTeamMemberSlideOver);

  const [unpaginatedTeamMemberOptions, setUnpaginatedTeamMemberOptions] = useState([]);
  const [teamMemberId, setTeamMemberId] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedAccessLevelKey, setSelectedAccessLevelKey] = useState(null);

  const addTeamMemberInboxAccessMutation = useMutation(addTeamMemberInboxAccessService, {
    onSuccess: () => {
      queryClient.invalidateQueries('inbox_access', inboxId);
      dispatch(setAddInboxTeamMemberSlideOverVisibility(false));
      setSelectedAccessLevelKey(null);
      setQuery('');
      setTeamMemberId(null);
    },
  });

  const onChangeAccessLevel = (e) => {
    setSelectedAccessLevelKey(e.id);
  };

  const onQueryChange = (q) => {
    setQuery(q);
    setTeamMemberId(null);
  };

  const onChange = (key) => {
    setTeamMemberId(key);
  };

  const onSubmit = () => {
    addTeamMemberInboxAccessMutation.mutate({
      teamMemberId,
      accessLevelKey: selectedAccessLevelKey,
      inboxId,
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
    var temp = [];

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
      show={showAddInboxTeamMemberSlideOver}
      onClose={() => dispatch(setAddInboxTeamMemberSlideOverVisibility(false))}
      headerTitle="Add member to inbox"
      headerDescription="Set a role and select a team member"
      body={(
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <SelectMenuSimple
              label="Role"
              options={[
                { id: 'read', name: 'Read-only' },
                { id: 'modify', name: 'Manage' },
                { id: 'full-control', name: 'Full control' },
                { id: 'owner', name: 'Owner' },
              ]}
              onChange={onChangeAccessLevel}
              selectedId={selectedAccessLevelKey}
            />
          </div>
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
          loading={addTeamMemberInboxAccessMutation.status === 'loading'}
          label="Add member"
          width="w-40"
        />
      )}
    />
  );
}

export default AddInboxTeamMemberSlideOver;
