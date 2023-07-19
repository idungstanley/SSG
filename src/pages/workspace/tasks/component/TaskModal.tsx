import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlinePaperClip, AiOutlineFlag, AiOutlineEye } from 'react-icons/ai';
import { BsTags, BsCalendar3 } from 'react-icons/bs';
import { createTaskService } from '../../../../features/task/taskService';
import { Button, Input, SlideOver } from '../../../../components';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateTaskSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { useAppSelector } from '../../../../app/hooks';
import { UseGetListDetails } from '../../../../features/list/listService';
import { ITask_statuses } from '../../../../features/list/list.interfaces';

function TaskModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showMenuDropdown, listIdCreateTask } = useAppSelector((state) => state.hub);
  const { showCreateTaskSlideOver } = useAppSelector((state) => state.slideOver);

  const { data: list } = UseGetListDetails({
    activeItemId: listIdCreateTask,
    activeItemType: 'list'
  });

  const [statusId, setStatusId] = useState<string>('');

  useEffect(() => {
    const minPosition = Math.min(...(list?.data.list.task_statuses.map((status) => status.position) || []));
    const statusObj: ITask_statuses | undefined = list?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj.position === minPosition
    );
    if (statusObj) {
      const newStatusId: string = statusObj.id;
      setStatusId(newStatusId);
    }
  }, [listIdCreateTask, list]);

  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      dispatch(setCreateTaskSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
    }
  });
  const defaultListFormState = {
    name: '',
    description: ''
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e?.target.name]: e?.target.value
    });
  };

  const { name, description } = formState;

  const onSubmit = async () => {
    await createTask.mutateAsync({
      name,
      description,
      task_status_id: statusId,
      showMenuDropdown: listIdCreateTask
    });
  };

  const handleCloseSlider = () => {
    dispatch(setCreateTaskSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
      })
    );
  };

  return (
    <SlideOver
      show={showCreateTaskSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create Task"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Task Name"
              placeholder="Enter Task name"
              name="name"
              value={name}
              type="text"
              onChange={handleTaskChange}
            />
          </div>
          <div className=" mt-5 space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5 ">
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleTaskChange}
              className="w-full h-32 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-600"
            />
          </div>
          <div className=" mt-5 space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5  flex justify-between items-center">
            <section id="attachement" className="flex items-center justify-start space-x-1 text-sm">
              <AiOutlinePaperClip className="text-gray-500" />
              <input type="file" name="file" id="file" className="hidden" />
              <label htmlFor="file" className="italic">
                Drag & Drop files to attach or
                <span className="decoration-dotted text-blue-400 cursor-pointer"> Browse</span>
              </label>
            </section>
            <section className="flex space-x-2 text-gray-500">
              <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                <AiOutlineFlag className="cursor-pointer" />
              </span>
              <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                <BsTags className="cursor-pointer" />
              </span>
              <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                <BsCalendar3 className="cursor-pointer" />
              </span>
              <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                <AiOutlineEye className="cursor-pointer text-purple-500" />
              </span>
            </section>
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Task"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default TaskModal;
