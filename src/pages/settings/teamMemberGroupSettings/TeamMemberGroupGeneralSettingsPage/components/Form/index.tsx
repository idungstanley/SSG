import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../../../../components';
import {
  useGetTeamMemberGroup,
  updateTeamMemberGroupService,
  deleteTeamMemberGroupService
} from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { displayPrompt, setVisibility } from '../../../../../../features/general/prompt/promptSlice';

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { teamMemberGroupId } = useParams();

  const { data: teamMemberGroup, status } = useGetTeamMemberGroup(teamMemberGroupId);

  const updateTeamMemberGroupMutation = useMutation(updateTeamMemberGroupService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['team_member_group', teamMemberGroup?.id]);
    }
  });

  const deleteTeamMemberGroupMutation = useMutation(deleteTeamMemberGroupService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['team_member_groups']);
      dispatch(setVisibility(false));
      navigate('/settings/team-members/groups');
    }
  });

  // Form state

  const defaultFormState = {
    name: ''
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name } = formState;

  useEffect(() => {
    if (status === 'success' && teamMemberGroup != null) {
      setFormState({
        name: teamMemberGroup.name
      });
    }
  }, [teamMemberGroup, status]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async () => {
    updateTeamMemberGroupMutation.mutate({
      name,
      teamMemberGroupId
    });
  };

  const deleteGroupConfirmation = () => {
    dispatch(
      displayPrompt('Delete group', 'Would you like to delete this group?', [
        {
          label: 'Delete group',
          style: 'danger',
          callback: () => {
            deleteTeamMemberGroupMutation.mutate({
              teamMemberGroupId
            });
          }
        },
        {
          label: 'Cancel',
          style: 'plain',
          callback: () => {
            dispatch(setVisibility(false));
          }
        }
      ])
    );
  };

  return status === 'success' ? (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">General settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage team member group general settings</p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Group name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="w-full max-w-xl">
                  <Input placeholder="Group name" name="name" value={name} type="text" onChange={onChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          <Button
            buttonStyle="white"
            loading={updateTeamMemberGroupMutation.status === 'loading'}
            onClick={deleteGroupConfirmation}
            label="Delete group"
            width="w-40"
          />
          <Button
            buttonStyle="primary"
            loading={updateTeamMemberGroupMutation.status === 'loading'}
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
