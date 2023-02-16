import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setInviteTeamMemberSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import {
  SlideOver,
  Button,
  Input,
  SelectMenuSimple,
} from '../../../../../../components';
import { createTeamMemberInviteService } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppSelector } from '../../../../../../app/hooks';

function InviteTeamMemberSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Form state
  const defaultFormState = {
    email: '',
    name: '',
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [selectedRoleKey, setSelectedRoleKey] = useState<string | null>(null);

  const { showInviteTeamMemberSlideOver } = useAppSelector(
    (state) => state.slideOver
  );

  const { email, name } = formState;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeRole = (key: string) => {
    setSelectedRoleKey(key);
  };

  const createTeamMemberInviteMutation = useMutation(
    createTeamMemberInviteService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team_member_invites']);

        setFormState(defaultFormState);
        setSelectedRoleKey(null);
        dispatch(setInviteTeamMemberSlideOverVisibility(false));
      },
    }
  );

  const onSubmit = async () => {
    createTeamMemberInviteMutation.mutate({
      email,
      name,
      teamMemberRoleKey: selectedRoleKey || '',
    });
  };

  return (
    <SlideOver
      show={showInviteTeamMemberSlideOver}
      onClose={() => dispatch(setInviteTeamMemberSlideOverVisibility(false))}
      headerTitle="Invite a team member"
      headerDescription="Select a role and enter their email to send an invite."
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <SelectMenuSimple
              label="Role"
              options={[
                { id: 'guest', name: 'Guest' },
                { id: 'low', name: 'Low' },
                { id: 'high', name: 'High' },
                { id: 'admin', name: 'Admin' },
                { id: 'owner', name: 'Owner' },
              ]}
              onChange={onChangeRole}
              selectedId={selectedRoleKey || ''}
            />
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Name"
              placeholder="Name"
              name="name"
              value={name}
              type="text"
              hint="The invite will be sent here."
              onChange={onChange}
            />
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              hint="The invite will be sent here."
              onChange={onChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={createTeamMemberInviteMutation.status === 'loading'}
          label="Send invite email"
          width="w-40"
        />
      }
    />
  );
}

export default InviteTeamMemberSlideOver;
