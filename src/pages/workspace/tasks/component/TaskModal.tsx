import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BorderOutlined,
  CalendarTwoTone,
  CloseOutlined,
  EyeInvisibleTwoTone,
  FlagTwoTone,
  PlusOutlined,
  PlusSquareTwoTone,
  TagTwoTone,
} from '@ant-design/icons';
import {
  ArrowDownIcon,
  PaperClipIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { createTaskService } from '../../../../features/task/taskService';
import { Button } from '../../../../components';

interface TaskModalProps {
  taskVisible: boolean;
  onCloseTaskModal: () => void;
  getListId: string | undefined;
}

function TaskModal({
  taskVisible,
  onCloseTaskModal,
  getListId,
}: TaskModalProps) {
  const queryClient = useQueryClient();

  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries('createtask' as any);
      onCloseTaskModal();
    },
  });
  const defaultListFormState = {
    name: '',
    description: '',
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const { name, description } = formState;

  const onSubmit = async () => {
    await createTask.mutateAsync({
      name,
      description,
      getListId,
    });
  };

  if (!taskVisible) return null;

  return (
    <div className="w-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 z-10 backdrop-blur-sm flex justify-center items-center">
      <div className="absolute right-10 w-5/12 bottom-5 flex flex-col">
        <div className="bg-red-400 p-4 shadow">
          <section className="mb-3">
            <div
              id="taskformheader"
              className="flex justify-between items-center space-x-1"
            >
              <div>
                <BorderOutlined />
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  className="w-96 border-0 text-red-500 border-transparent focus:border-transparent focus:ring-0"
                  name="name"
                  onChange={handleTaskChange}
                />
              </div>

              <div className="flex items-center justify-center space-x-2">
                <ArrowDownIcon
                  className="h-7 w-5 pt-2 text-gray-700 rounded-full p-0.5"
                  aria-hidden="true"
                />
                <CloseOutlined
                  className="h-7 w-5 pt-2 text-gray-700"
                  aria-hidden="true"
                  onClick={() => onCloseTaskModal()}
                />
              </div>
            </div>
          </section>
          <section
            id="assign"
            className="flex justify-start items-center space-x-2 mb-3"
          >
            <p>In</p>
            <input type="text" className="rounded-full h-5 border-gray-300" />
            <p>For</p>
            <span className="border-dotted border-gray-300 border-2 rounded-full p-1">
              <UserGroupIcon
                className="h-7 w-7 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </section>
          <section id="textarea" className="mb-3 w-full ">
            <textarea
              placeholder="Description"
              name="description"
              className="w-full rounded border-gray-300 relative"
            />
            <PlusOutlined className="absolute left-2.5 top-32" />
            <div className="flex w-full justify-between">
              <span className="flex justify-center space-x-0.5 items-center">
                <PlusSquareTwoTone twoToneColor="#858585" />
                <small>Add subtask</small>
              </span>
              <span className="flex justify-center space-x-0.5 items-center">
                <PlusSquareTwoTone twoToneColor="#858585" />
                <small>Add checklist</small>
              </span>
            </div>
          </section>
          <section
            id="attachement"
            className="flex items-center justify-start space-x-1 mb-3"
          >
            <PaperClipIcon
              className="h-7 w-5 pt-2 text-gray-700 rounded-full p-0.5"
              aria-hidden="true"
            />
            <input type="file" name="file" id="file" className="hidden" />
            <label htmlFor="file" className="italic">
              Drag & Drop files to attach or
              <span className="decoration-dotted text-blue-400"> Browse</span>
            </label>
          </section>
          <section
            id="submittask"
            className="flex w-full items-center justify-between"
          >
            <div className="flex justify-between w-3/6 mb-10">
              <FlagTwoTone twoToneColor="rgb(209 213 219)" />
              <TagTwoTone twoToneColor="rgb(209 213 219)" />
              <CalendarTwoTone twoToneColor="rgb(209 213 219)" />
              <EyeInvisibleTwoTone twoToneColor="rgb(209 213 219)" />
            </div>
            <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={onSubmit}
                label="Create Task"
                padding="py-2 px-4"
                height="h-10"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
