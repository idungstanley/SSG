import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, InputWithTrailingAddon } from '../../../../../../components';
import { useGetInbox } from '../../../../../../features/inbox/inboxesService';
import { updateInboxSettingsService } from '../../../../../../features/inbox/inboxSettingsService';

export default function Form() {
  const { inboxId } = useParams();

  const { data: inbox, status: loadingInboxData } = useGetInbox(inboxId);

  const updateInboxSettingsMutation = useMutation(updateInboxSettingsService);

  // Form state

  const defaultFormState = {
    name: '',
    emailUsername: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name, emailUsername } = formState;

  useEffect(() => {
    if (loadingInboxData === 'success' && inbox != null) {
      setFormState({
        name: inbox.name,
        emailUsername: inbox.email_key,
      });
    }
  }, [inbox]);

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    updateInboxSettingsMutation.mutate({
      name,
      emailUsername,
      inboxId,
    });
  };

  return inbox ? (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">General settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage inbox general settings
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Inbox name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="w-full max-w-xl">
                  <Input
                    placeholder="Inbox name"
                    name="name"
                    value={name}
                    type="text"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Inbox email
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="w-full max-w-xl">
                  <InputWithTrailingAddon
                    placeholder="Inbox email"
                    name="emailUsername"
                    value={emailUsername}
                    type="text"
                    onChange={onChange}
                    addOn="@inbox.alsofile.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Button
            buttonStyle="primary"
            loading={updateInboxSettingsMutation.status === 'loading'}
            onClick={onSubmit}
            label="Save changes"
            width="w-40"
          />
        </div>
      </div>
    </div>
  ) : (
    <span>Loading...</span>
  );
}
