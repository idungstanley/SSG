import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import MainLogo from '../../../../assets/branding/main-logo.png';
import { Button, Input } from '../../../../components';
import { useEditHubService } from '../../../../features/hubs/hubService';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  getCurrHubId,
  setshowMenuDropdown,
} from '../../../../features/hubs/hubSlice';

interface ModalProps {
  isEditVisible: boolean;
  onCloseEditHubModal: () => void;
}
export default function EditHubModal({
  isEditVisible,
  onCloseEditHubModal,
}: ModalProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currHubId } = useAppSelector((state) => state.hub);
  const createHub = useMutation(useEditHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseEditHubModal();
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const defaultHubFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  );

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      currentWorkspaceId,
      currHubId,
    });

    onCloseEditHubModal();
  };

  const handleCloseEditModal = (e) => {
    if (e.target.id === 'wrapper') onCloseEditHubModal();
  };

  if (!isEditVisible) return null;
  return (
    <div
      className="w-full m-auto z-50 overflow-x-hidden overflow-y-auto inset-0 left-0 fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleCloseEditModal}
    >
      <div className="w-5/12 flex flex-col">
        <div
          className="text-white text-xl place-self-end"
          onClick={() => onCloseEditHubModal()}
        >
          X
        </div>
        <div className="bg-white p-2 rounded">
          <section className="header h-36 flex justify-center items-center flex-col">
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              alt="Workflow"
            />
            <h3 className="font-bold">Edit Hub name</h3>
          </section>
          <section id="input" className="mt-5 ml-2">
            <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
              <Input
                label="Hub Name:"
                placeholder="Enter New Hub Name"
                name="name"
                value={name}
                type="text"
                onChange={handleHubChange}
              />
            </div>
            <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={onSubmit}
                label="Create Hub"
                padding="py-2 px-4"
                height="h-10"
                width="w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
