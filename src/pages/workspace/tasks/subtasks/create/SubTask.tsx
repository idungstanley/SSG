import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarOutlined,
  FlagOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button } from "../../../../../components";
import { createTaskService } from "../../../../../features/task/taskService";
import { FaTimes } from "react-icons/fa";
import { setCurrentParentTaskId } from "../../../../../features/task/taskSlice";
import { useDispatch } from "react-redux";

interface SubTaskProps {
  parentTaskId?: string | null;
}

function SubTask({ parentTaskId }: SubTaskProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const createSubTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCurrentParentTaskId(null));
    },
  });

  const defaultTaskFormState = {
    name: "",
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
      <div className="bg-white border border-sky-500  ml-6 flex items-center">
        <div className="flex items-center w-9/12">
          {/* data and input */}
          <div>
            <input
              type="text"
              name="name"
              onChange={(e) => handleTaskChange(e)}
              placeholder="Click to add subtask"
              className="border-transparent focus:border-transparent focus:ring-0 pl-20"
            />
          </div>
        </div>
        {/* icons */}

        <div className="flex items-center space-x-1">
          <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
            <UserAddOutlined
              className="text-xs h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
            <UserAddOutlined
              className="text-xs h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
            <UserAddOutlined
              className="text-xs h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
            <CalendarOutlined
              className="text-xs h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
            <FlagOutlined
              className="text-xs h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <Button
            buttonStyle="primary"
            onClick={onSubmit}
            // loading={loginMutation.status === 'loading'}
            label="SAVE"
            padding="py-3 px-4"
            height="h-5"
            width="w-15"
            roundedLeft={false}
            roundedRight={false}
          />
          <FaTimes className="text-xl text-gray-400 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default SubTask;
