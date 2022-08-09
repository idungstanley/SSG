import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInviteTeamMemberSlideOverVisibility,
} from '../../../../../features/general/slideOver/slideOverSlice';
import {
  SlideOver,
  Button,
  Input,
  SelectMenuSimple,
} from '../../../../../components';
import { useInviteTeamMemberMutation } from '../../../../../features/settings/teamMemberInvites/teamMemberInviteApi';

function InviteTeamMemberSlideOver() {
  const dispatch = useDispatch();

  const [inviteTeamMember, { isLoading }] = useInviteTeamMemberMutation();

  const showInviteTeamMemberSlideOver = useSelector((state) => state.slideOver.showInviteTeamMemberSlideOver);

  // Form state

  const defaultFormState = {
    email: '',
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [selectedRoleKey, setSelectedRoleKey] = useState(null);

  const { email } = formState;

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeRole = (e) => {
    setSelectedRoleKey(e.id);
  };

  const onSubmit = async () => {
    try {
      await inviteTeamMember({
        email,
        teamMemberRoleKey: selectedRoleKey,
        showSuccess: true,
      }).unwrap();

      setFormState(defaultFormState);
      setSelectedRoleKey(null);
      dispatch(setInviteTeamMemberSlideOverVisibility(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SlideOver
      show={showInviteTeamMemberSlideOver}
      onClose={() => dispatch(setInviteTeamMemberSlideOverVisibility(false))}
      headerTitle="Invite a team member"
      headerDescription="Select a role and enter their email to send an invite."
      body={(
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
              selectedId={selectedRoleKey}
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
      )}
      footerButtons={(
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={isLoading}
          label="Send invite email"
          width="w-40"
        />
      )}
    />
  );
}

export default InviteTeamMemberSlideOver;
