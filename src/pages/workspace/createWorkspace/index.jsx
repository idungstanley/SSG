/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  Breadcrumb,
  SimpleSectionHeading,
  Input,
  InputAvatar,
  AvatarWithInitials,
  AvatarBg,
  Button,
} from '../../../components';
import { avatarBg, companySizeBtn } from './colors';
import { createWorkspaceService } from '../../../features/workspace/workspaceService';
import {
  selectCurrentUser,
  setCurrentUser,
} from '../../../features/auth/authSlice';

function CreateWorkspace() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const createWSMutation = useMutation(createWorkspaceService, {
    onSuccess: (successData) => {
      localStorage.setItem(
        'currentWorkspacename',
        JSON.stringify(successData.data.workspace.name),
      );
      localStorage.setItem(
        'currentWorkspaceSize',
        JSON.stringify(successData.data.workspace.company_size),
      );
      localStorage.setItem(
        'wsemail',
        JSON.stringify(successData.data.workspace.emails),
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          default_workspace_id: successData.data.workspace.id,
        }),
      );
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(successData.data.workspace.id),
      );
      dispatch(
        setCurrentUser({
          ...user,
          currentWorkspaceId: successData.data.workspace.id,
        }),
      );
    },
  });

  const defaultFormState = {
    name: '',
    email: '',
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [bgAvatar, setBgAvatart] = useState('red');
  const [companySize, setCompanySize] = useState(0);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const selectedCompanySize = (value) => {
    setCompanySize(value);
  };

  const { name, email } = formState;

  const emails = email.split(' ');

  const onSubmit = async () => {
    await createWSMutation.mutateAsync({
      name,
      emails,
      companySize,
    });
  };

  const handleBgClick = (colour) => {
    setBgAvatart(colour);
  };

  useEffect(() => {
    // getWs();
    // console.log(localStorage.getItem('currentWorkspaceId'));
  }, []);

  return (
    <div className="h-full flex-1 flex flex-col overflow-y-scroll bg-gray-50">
      <Breadcrumb
        pages={[
          {
            name: 'Workspace',
            href: '/workspace/onboarding',
            current: true,
          },
        ]}
        rootIcon={
          <PlusIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        }
        rootIconHref="/workspace/onboarding"
      />

      <section className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 ">
        <div className="my-5">
          <SimpleSectionHeading
            title="Create your workspace"
            description={null}
            actions={null}
          />
        </div>
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Enter workspace name:"
              placeholder="workspace name"
              name="name"
              // value={name}
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
            <p className="mb-4 h">Customize your workspace avatar</p>
            <section className="flex items-center justify-start space-x-7">
              <InputAvatar action="Click to upload" upload={null} size={null} />
              <AvatarWithInitials
                className="pl-3"
                height="h-52"
                width="w-52"
                initials="AU"
                backgroundColour={bgAvatar}
                textSize="text-2xl"
              />
              <div className="grid grid-cols-4 pl-16 gap-20">
                {avatarBg.map(({ colour }) => (
                  <AvatarBg
                    size={10}
                    colour={colour}
                    name="avatarBackgroudColor"
                    onClick={() => handleBgClick(colour)}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <p className="mb-4 h">How many people will you be working with?</p>
            <div className="space-x-5">
              {companySizeBtn.map(({ label, value }) => (
                <Button
                  buttonStyle="primary"
                  onClick={() => selectedCompanySize(value)}
                  // loading={loginMutation.status === 'loading'}
                  type="button"
                  label={label}
                  padding="py-2 px-4"
                  height="h-10"
                  width="w-half"
                />
              ))}
            </div>
          </div>
          <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
            {/* <p className="mb-4 h">Invite people into your workspace</p> */}
            <Input
              label="Invite people into your workspace:"
              placeholder="Enter email"
              name="email"
              // value={null}
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
            <Button
              buttonStyle="primary"
              onClick={onSubmit}
              // loading={loginMutation.status === 'loading'}
              type="submit"
              label="Create Workspace"
              padding="py-2 px-4"
              height="h-10"
              width="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateWorkspace;
