import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CalendarOutlined,
  FlagOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button } from '../../../../components';
import { createTaskService } from '../../../../features/task/taskService';

interface SubTaskProps {
  parentTaskId?: string;
}

function SubTask({ parentTaskId }: SubTaskProps) {
  const queryClient = useQueryClient();
  const createSubTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subTaskData']);
    },
  });

  const defaultTaskFormState = {
    name: '',
  };

  const [taskFormState, setTaskFormState] = useState(defaultTaskFormState);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskFormState({
      ...taskFormState,
      [e.target.name]: e.target.value,
    });
  };

  const { name } = taskFormState;

  const onSubmit = async () => {
    await createSubTask.mutateAsync({
      name,
      parentTaskId,
    });
  };

  return (
    <>
      {/* subtask */}
      <div className="bg-white border border-gray-100 rounded-lg px-2 py-1 flex  items-center pl-10">
        <div className="flex items-center w-8/12">
          {/* data and input */}
          <div>
            <input
              type="text"
              name="name"
              onChange={(e) => handleTaskChange(e)}
              placeholder="Click to add subtask"
              className="outline-none border-0"
            />
          </div>
        </div>
        {/* icons */}

        <div className="flex items-center space-x-10">
          <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
            <UserAddOutlined
              className="h-5 w-7 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
            <CalendarOutlined
              className="h-5 w-7 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
            <FlagOutlined
              className="h-5 w-7 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <Button
            buttonStyle="primary"
            onClick={onSubmit}
            // loading={loginMutation.status === 'loading'}
            label="Save"
            padding="py-2 px-4"
            height="h-7"
            width="w-20"
          />
          <div>
            <p className="text-xl text-gray-400 cursor-pointer">X</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubTask;
