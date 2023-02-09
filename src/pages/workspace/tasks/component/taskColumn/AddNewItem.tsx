import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setAddNewTaskItem } from '../../../../../features/task/taskSlice';
import { Button } from '../../../../../components';
import { FaGlobeAfrica, FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTaskService } from '../../../../../features/task/taskService';
import { CalendarIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface AddNewItemProps {
  listId: string | undefined;
}

export default function AddNewItem({ listId }: AddNewItemProps) {
  const dispatch = useDispatch();
  const { addNewTaskItem } = useAppSelector((state) => state.task);
  const queryClient = useQueryClient();
  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setAddNewTaskItem(!addNewTaskItem));
    },
  });
  const defaultTaskFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultTaskFormState);

  const { name } = formState;

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    await createTask.mutateAsync({
      name,
      getListId: listId,
    });
  };
  return (
    <div className="bg-white border border-sky-500  ml-5 flex  items-center">
      <div className="flex items-center w-10/12">
        {/* data and input */}
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => handleTaskChange(e)}
            placeholder="Click to add task"
            className=" border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      {/* icons */}
      <div className="flex items-center space-x-1">
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon
            className="text-xs h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon
            className="text-xs h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon
            className="text-xs h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
          <CalendarIcon
            className="text-xs h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
          <FaGlobeAfrica
            className="text-xs h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="SAVE"
          padding="py-3 px-4"
          height="h-5"
          width="w-15"
          roundedLeft={false}
          roundedRight={false}
        />
        <div onClick={() => dispatch(setAddNewTaskItem(!addNewTaskItem))}>
          <FaTimes className="text-xl text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
