import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, RadioGroupInPanel } from '../../../../../../components';
import {
  useGetInboxAccess,
  updateInboxWorkspaceAccessLevelService
} from '../../../../../../features/inbox/inboxSettingsService';

export default function Form() {
  const queryClient = useQueryClient();
  const { inboxId } = useParams();
  const { data, status } = useGetInboxAccess(inboxId);

  const [workspaceAccessLevel, setWorkspaceAccessLevel] = useState<string | null>(null);

  const setSelected = (key: string) => {
    setWorkspaceAccessLevel(key);
  };

  useEffect(() => {
    if (status === 'success' && data != null) {
      setWorkspaceAccessLevel(data.data.inbox_access_level === null ? null : data.data.inbox_access_level.key);
    }
  }, [data]);

  const updateInboxWorkspaceAccessLevelMutation = useMutation(updateInboxWorkspaceAccessLevelService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox_access', inboxId]);
    }
  });

  const onSubmit = async () => {
    updateInboxWorkspaceAccessLevelMutation.mutate({
      accessLevelKey: workspaceAccessLevel,
      inboxId
    });
  };

  return data ? (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Permissions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage inbox permissions</p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="x" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Workspace access
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="w-full max-w-xl">
                  <RadioGroupInPanel
                    options={[
                      {
                        name: 'No access',
                        description: 'Only members and groups which are added directly will have access.',
                        key: null
                      },
                      {
                        name: 'Read-only',
                        description: 'All workspace members can view the inbox and its files.',
                        key: 'read'
                      },
                      {
                        name: 'Manage',
                        description: 'All workspace members can manage the inbox and its files.',
                        key: 'modify'
                      },
                      {
                        name: 'Full control',
                        description: 'All workspace members have full control over the inbox.',
                        key: 'full-control'
                      },
                      {
                        name: 'Owner',
                        description: 'All workspace members are owners of the inbox.',
                        key: 'owner'
                      }
                    ]}
                    selectedKey={workspaceAccessLevel || ''}
                    setSelected={setSelected}
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
            loading={updateInboxWorkspaceAccessLevelMutation.status === 'loading'}
            buttonStyle="primary"
            onClick={onSubmit}
            label="Save changes"
            width="w-40"
          />
        </div>
      </div>
    </div>
  ) : null;
}
