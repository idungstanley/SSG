import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { useAppSelector } from '../../../../../../app/hooks';
import { ComboboxOption } from '../../../TeamMembersSettingsPage/components/AddInboxTeamMemberSlideOver';

function AddInboxTeamMemberGroupSlideOver() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const queryClient = useQueryClient();

  const { showAddInboxTeamMemberGroupSlideOver } = useAppSelector(
    (state) => state.slideOver
  );

  const [
    unpaginatedTeamMemberGroupOptions,
    setUnpaginatedTeamMemberGroupOptions,
  ] = useState<ComboboxOption[]>([]);
  const [teamMemberGroupId, setTeamMemberGroupId] = useState<string | null>(
    null
  );
  const [query, setQuery] = useState<string>('');
  const [selectedAccessLevelKey, setSelectedAccessLevelKey] = useState<
    string | null
  >(null);

  const addTeamMemberGroupInboxAccessMutation = useMutation(
    addTeamMemberGroupInboxAccessService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['inbox_access', inboxId]);
        dispatch(setAddInboxTeamMemberGroupSlideOverVisibility(false));
        setSelectedAccessLevelKey(null);
        setQuery('');
        setTeamMemberGroupId(null);
      },
    }
  );

  const onChangeAccessLevel = (e: string) => {
    setSelectedAccessLevelKey(e);
  };

  const onQueryChange = (q: string) => {
    setQuery(q);
    setTeamMemberGroupId(null);
  };

  const onChange = (key: string) => {
    setTeamMemberGroupId(key);
  };

  const onSubmit = () => {
    addTeamMemberGroupInboxAccessMutation.mutate({
      teamMemberGroupId,
      accessLevelKey: selectedAccessLevelKey,
      inboxId,
    });
  };

  const { status, data, fetchNextPage, hasNextPage } = useGetTeamMemberGroups({
    query,
  });

  useEffect(() => {
    const temp: ComboboxOption[] = [];

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
      onClose={() =>
        dispatch(setAddInboxTeamMemberGroupSlideOverVisibility(false))
      }
      headerTitle="Add group to inbox"
      headerDescription="Set a role and select a team member group"
      body={
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
              selectedId={selectedAccessLevelKey || ''}
            />
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <ComboBoxWithAvatar
              label="Team member group"
              onQueryChange={onQueryChange}
              onChange={onChange}
              selectedKey={teamMemberGroupId || ''}
              options={unpaginatedTeamMemberGroupOptions}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={status === 'loading'}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={addTeamMemberGroupInboxAccessMutation.status === 'loading'}
          label="Add group"
          width="w-40"
        />
      }
    />
  );
}

export default AddInboxTeamMemberGroupSlideOver;
