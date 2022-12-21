import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAddInboxTeamMemberGroupSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMemberGroups } from '../../../../../../features/workspace/teamMemberGroupService';
import { addTeamMemberGroupInboxAccessService } from '../../../../../../features/inbox/inboxSettingsService';
import {
  SlideOver,
  SelectMenuSimple,
  Button,
  ComboBoxWithAvatar,
  AvatarWithInitials,
} from '../../../../../../components';

function AddInboxTeamMemberGroupSlideOver() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const queryClient = useQueryClient();

  const showAddInboxTeamMemberGroupSlideOver = useSelector((state) => state.slideOver.showAddInboxTeamMemberGroupSlideOver);

  const [unpaginatedTeamMemberGroupOptions, setUnpaginatedTeamMemberGroupOptions] = useState([]);
  const [teamMemberGroupId, setTeamMemberGroupId] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedAccessLevelKey, setSelectedAccessLevelKey] = useState(null);

  const addTeamMemberGroupInboxAccessMutation = useMutation(addTeamMemberGroupInboxAccessService, {
    onSuccess: () => {
      queryClient.invalidateQueries('inbox_access', inboxId);
      dispatch(setAddInboxTeamMemberGroupSlideOverVisibility(false));
      setSelectedAccessLevelKey(null);
      setQuery('');
      setTeamMemberGroupId(null);
    },
  });

  const onChangeAccessLevel = (e) => {
    setSelectedAccessLevelKey(e.id);
  };

  const onQueryChange = (q) => {
    setQuery(q);
    setTeamMemberGroupId(null);
  };

  const onChange = (key) => {
    setTeamMemberGroupId(key);
  };

  const onSubmit = () => {
    addTeamMemberGroupInboxAccessMutation.mutate({
      teamMemberGroupId,
      accessLevelKey: selectedAccessLevelKey,
      inboxId,
    });
  };

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
  } = useGetTeamMemberGroups({
    query,
  });

  useEffect(() => {
    const temp = [];

    if (status === 'success' && data) {
      const flat = data.pages.flatMap((page) => page.data.team_member_groups);

      flat.map((teamMemberGroup) => {
        const avatar = (
          <AvatarWithInitials
            height="h-6"
            width="w-6"
            initials={teamMemberGroup.initials}
            backgroundColour={teamMemberGroup.colour}
            textSize="text-xs"
          />
        );

        return temp.push({
          id: teamMemberGroup.id,
          name: teamMemberGroup.name,
          avatar,
        });
      });
    }

    return setUnpaginatedTeamMemberGroupOptions(temp);
  }, [data]);

  return (
    <SlideOver
      show={showAddInboxTeamMemberGroupSlideOver}
      onClose={() => dispatch(setAddInboxTeamMemberGroupSlideOverVisibility(false))}
      headerTitle="Add group to inbox"
      headerDescription="Set a role and select a team member group"
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
              label="Team member group"
              query={query}
              onQueryChange={onQueryChange}
              onChange={onChange}
              selectedKey={teamMemberGroupId}
              options={unpaginatedTeamMemberGroupOptions}
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
          loading={addTeamMemberGroupInboxAccessMutation.status === 'loading'}
          label="Add group"
          width="w-40"
        />
      )}
    />
  );
}

export default AddInboxTeamMemberGroupSlideOver;
