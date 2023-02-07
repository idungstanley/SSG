import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { UseCreateTagService } from '../../features/workspace/workspaceService';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function CreateTag() {
  const queryClient = useQueryClient();
  const defaultHubFormState = {
    name: '',
  };

  const createTag = useMutation(UseCreateTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { name } = formState;

  const onSubmit = async () => {
    await createTag.mutateAsync({
      name,
    });
  };
  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <input
        type="text"
        placeholder="Create New Tag"
        className="w-full relative text-sm rounded-md border-gray-300 border-transparent focus:border-transparent  ring-0 focus:ring-0"
        name="name"
        onChange={handleTagChange}
      />
      <PaperAirplaneIcon
        className="h-6 w-6 stroke-current text-gray-400 inline-block absolute top-2 right-1 cursor-pointer"
        aria-hidden="true"
        onClick={onSubmit}
      />

      {/* </form> */}
    </div>
  );
}
