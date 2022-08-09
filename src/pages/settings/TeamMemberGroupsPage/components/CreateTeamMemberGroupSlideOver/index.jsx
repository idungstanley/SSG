import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateTeamMemberGroupSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { useCreateTeamMemberGroupMutation } from '../../../../../features/settings/teamMemberGroups/teamMemberGroupApi';
import {
  SlideOver,
  Button,
  Input,
} from '../../../../../components';

function CreateTeamMemberGroupSlideOver() {
  const dispatch = useDispatch();

  const [createTeamMemberGroup, { isLoading }] = useCreateTeamMemberGroupMutation();

  const showCreateTeamMemberGroupSlideOver = useSelector((state) => state.slideOver.showCreateTeamMemberGroupSlideOver);

  // Form state

  const defaultFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name } = formState;

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      await createTeamMemberGroup({
        name,
        showSuccess: true,
      }).unwrap();

      setFormState(defaultFormState);
      dispatch(setCreateTeamMemberGroupSlideOverVisibility(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SlideOver
      show={showCreateTeamMemberGroupSlideOver}
      onClose={() => dispatch(setCreateTeamMemberGroupSlideOverVisibility(false))}
      headerTitle="Create a new team member group"
      body={(
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
      )}
      footerButtons={(
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={isLoading}
          label="Create group"
          width="w-40"
        />
      )}
    />
  );
}

export default CreateTeamMemberGroupSlideOver;
