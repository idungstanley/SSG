/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createListService } from '../../../../features/list/listService';
import { Button, Input } from '../../../../components';

interface ListModalProps {
  listVisible: boolean;
  walletId?: string;
  onCloseListModal: () => void;
}

function ListModal({
  listVisible,
  onCloseListModal,
  walletId,
}: ListModalProps) {
  const queryClient = useQueryClient();
  const createList = useMutation(createListService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseListModal();
    },
  });

  const defaultListFormState = {
    name: '',
  };

  const hub_id = JSON.parse(localStorage.getItem('currentHubId') || '"');

  const [formState, setFormState] = useState(defaultListFormState);

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createList.mutateAsync({
      listName: name,
      hubId: hub_id,
      parentId: walletId,
    });
  };

  if (!listVisible) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 flex items-center justify-center w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col w-5/12">
        <div
          className="text-xl text-white place-self-end"
          onClick={() => onCloseListModal()}
        >
          X
        </div>
        <div className="p-2 bg-white rounded">
          <section className="h-24 pt-4 pl-4 header">
            <h3 className="text-xl font-bold">Create List</h3>
          </section>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <section id="listform">
            <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
              <Input
                label="List Name:"
                placeholder="Enter List Name"
                name="name"
                value={name}
                type="text"
                onChange={handleListChange}
              />
            </div>
            <div className="px-4 mb-8 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={onSubmit}
                label="Create List"
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

export default ListModal;
