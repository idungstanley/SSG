import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInboxService } from '../../../../../features/inbox/inboxesService';
import { setCreateInboxSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import {
  SlideOver,
  Button,
  Input,
  InputWithTrailingAddon,
} from '../../../../../components';

function CreateInboxSlideOver() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createInboxMutation = useMutation(createInboxService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['inboxes']);
      dispatch(setCreateInboxSlideOverVisibility(false));
      navigate(`/inbox/${data.data.inbox.id}`);
    },
  });

  const showCreateInboxSlideOver = useSelector(
    (state) => state.slideOver.showCreateInboxSlideOver,
  );

  const defaultFormState = {
    name: '',
    emailUsername: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name, emailUsername } = formState;

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    createInboxMutation.mutate({
      name,
      emailUsername,
    });
  };

  return (
    <SlideOver
      show={showCreateInboxSlideOver}
      onClose={() => dispatch(setCreateInboxSlideOverVisibility(false))}
      headerTitle="Create a new inbox"
      body={(
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Inbox name"
              placeholder="Inbox name"
              name="name"
              value={name}
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <InputWithTrailingAddon
              label="Inbox email"
              placeholder="Inbox email"
              name="emailUsername"
              value={emailUsername}
              type="text"
              onChange={onChange}
              addOn="@inbox.alsofile.com"
              hint="Leave blank and we'll generate one automatically for you"
            />
          </div>
        </div>
      )}
      footerButtons={(
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={createInboxMutation.status === 'loading'}
          label="Create inbox"
          width="w-40"
        />
      )}
    />
  );
}

export default CreateInboxSlideOver;
