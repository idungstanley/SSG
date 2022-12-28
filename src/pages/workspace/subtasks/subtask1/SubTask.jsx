import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import {
  CalendarOutlined,
  FlagOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button } from '../../../../components';
import { createTaskService } from '../../../../features/task/taskService';

function SubTask({ parentTaskId }) {
  const queryClient = useQueryClient();
  const createSubTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries('subTaskData');
    },
  });

  const defaultTaskFormState = {
    name: '',
  };

  const [taskFormState, setTaskFormState] = useState(defaultTaskFormState);

  const handleTaskChange = (e) => {
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
              onChange={handleTaskChange}
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
            type="submit"
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

SubTask.defaultProps = {
  parentTaskId: '',
};

SubTask.propTypes = {
  parentTaskId: PropTypes.string,
};

export default SubTask;
