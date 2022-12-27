import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setTeamMemberGroupsPage } from '../../../../../../../features/settings/teamMemberGroups/teamMemberGroupSlice';
import { createTeamMemberGroupService } from '../../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { setCreateTeamMemberGroupSlideOverVisibility } from '../../../../../../../features/general/slideOver/slideOverSlice';
import { SlideOver, Button, Input } from '../../../../../../../components';
import { useAppSelector } from '../../../../../../../app/hooks';

function CreateTeamMemberGroupSlideOver() {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  // Form state
  const defaultFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name } = formState;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createTeamMemberGroupMutation = useMutation(
    createTeamMemberGroupService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team_member_groups', { page: 1 }]);
        dispatch(setTeamMemberGroupsPage(1));
        dispatch(setCreateTeamMemberGroupSlideOverVisibility(false));
        setFormState(defaultFormState);
      },
    }
  );

  const { showCreateTeamMemberGroupSlideOver } = useAppSelector(
    (state) => state.slideOver
  );

  const onSubmit = async () => {
    createTeamMemberGroupMutation.mutate({
      name,
    });
  };

  return (
    <SlideOver
      show={showCreateTeamMemberGroupSlideOver}
      onClose={() =>
        dispatch(setCreateTeamMemberGroupSlideOverVisibility(false))
      }
      headerTitle="Create a new team member group"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Group name"
              placeholder="Group name"
              name="name"
              value={name}
              type="text"
              onChange={onChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={createTeamMemberGroupMutation.status === 'loading'}
          label="Create group"
          width="w-40"
        />
      }
    />
  );
}

export default CreateTeamMemberGroupSlideOver;
