/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CloseOutlined } from '@ant-design/icons';
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
  getListId: string;
}

function TaskModal({
  taskVisible,
  onCloseTaskModal,
  getListId,
}: TaskModalProps) {
  const queryClient = useQueryClient();

  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
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
    <div className="w-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="absolute right-10 w-5/12 bottom-5 flex flex-col">
        <div className="bg-white p-2 rounded">
          <section>
            <div
              id="taskformheader"
              className="flex justify-between items-center space-x-1"
            >
              <div>
                <span className="text-5xl">.</span>
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  className="w-96 border-0 outline-none focus:outline-none"
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
            className="flex justify-start items-center space-x-2"
          >
            <p>in</p>
            <input type="text" className="rounded-full" />
            <p>For</p>
            <UserGroupIcon
              className="h-7 w-7 text-gray-400"
              aria-hidden="true"
            />
          </section>
          <section id="textarea">
            <textarea placeholder="Description" name="description" />
          </section>
          <section
            id="attachement"
            className="flex items-center justify-start space-x-1"
          >
            <PaperClipIcon
              className="h-7 w-5 pt-2 text-gray-700 rounded-full p-0.5"
              aria-hidden="true"
            />
            <input type="file" name="file" id="file" className="hidden" />
            <label htmlFor="file">
              Drag & Drop files to attach or
              <span className="underline text-blue-400">Browse</span>
            </label>
          </section>
          <section id="submittask">
            <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={onSubmit}
                label="Create Task"
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

TaskModal.defaultProps = {
  taskVisible: false,
  getListId: '',
  // onCloseListModal: false,
};

TaskModal.propTypes = {
  taskVisible: PropTypes.bool,
  onCloseTaskModal: PropTypes.func.isRequired,
  getListId: PropTypes.string,
};

export default TaskModal;
