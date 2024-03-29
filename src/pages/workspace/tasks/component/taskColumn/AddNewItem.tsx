import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAddNewTaskItem } from '../../../../../features/task/taskSlice';
import { Button } from '../../../../../components';
import { FaGlobeAfrica, FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTaskService } from '../../../../../features/task/taskService';
import { CalendarIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { setCreateTaskFromTop } from '../../../../../features/list/listSlice';

interface AddNewItemProps {
  listId: string | undefined;
}

export default function AddNewItem({ listId }: AddNewItemProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      dispatch(setAddNewTaskItem(false));
      dispatch(setCreateTaskFromTop(false));
      setIsEditInputVisible(false);
    }
  });

  const saveButtonRef = useRef(null);
  const defaultTaskFormState = {
    name: ''
  };
  const [formState, setFormState] = useState(defaultTaskFormState);
  const { name } = formState;

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async () => {
    await createTask.mutateAsync({
      name,
      getListId: listId
    });
  };

  function handleOutsideClick() {
    setIsEditInputVisible(true);
    if (!isEditInputVisible) {
      return;
    }
    onSubmit();
  }

  return (
    <div className="bg-white border border-sky-500  ml-4 h-10 flex  items-center">
      <div className="flex items-center w-10/12">
        {/* data and input */}
        <div>
          <input
            type="text"
            name="name"
            autoFocus
            onChange={(e) => handleTaskChange(e)}
            onKeyDown={(e) => (e.key === 'Enter' ? onSubmit() : null)}
            placeholder="Click to add task"
            className=" border-transparent h-9 text-xs  focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      {/* icons */}
      <div className="flex items-center space-x-1">
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon className="text-xs h-6 w-6 text-gray-400" aria-hidden="true" />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon className="text-xs h-6 w-6 text-gray-400" aria-hidden="true" />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
          <UserPlusIcon className="text-xs h-6 w-6 text-gray-400" aria-hidden="true" />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
          <CalendarIcon className="text-xs h-6 w-6 text-gray-400" aria-hidden="true" />
        </span>
        <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
          <FaGlobeAfrica className="text-xs h-6 w-6 text-gray-400" aria-hidden="true" />
        </span>
        <Button
          buttonStyle="primary"
          onClick={handleOutsideClick}
          label="SAVE"
          padding="py-3 px-4"
          height="h-5"
          width="w-15"
          roundedLeft={false}
          roundedRight={false}
        />
        <div
          ref={saveButtonRef}
          onClick={() => {
            setIsEditInputVisible(true);
            dispatch(setAddNewTaskItem(false));
            dispatch(setCreateTaskFromTop(false));
          }}
        >
          <FaTimes className="text-xl text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
