import React from 'react';
import { MdFileCopy } from 'react-icons/md';
// import TaskIcons from './taskIcons';
import { useAppSelector } from '../../../../../app/hooks';
import { IoEyeOutline } from 'react-icons/io5';
import { BsTags } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';
import { MdOutlineDeveloperBoard, MdOutlineDriveFileMove, MdDateRange, MdDeleteForever } from 'react-icons/md';
import { HiOutlineDocumentDuplicate, HiInbox } from 'react-icons/hi';
import { TbFolderX } from 'react-icons/tb';
import { GiStoneStack, GiJusticeStar } from 'react-icons/gi';
import { BiMerge, BiEdit } from 'react-icons/bi';
import { FlagIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { deleteTask } from '../../../../../features/task/taskService';
import { useDispatch } from 'react-redux';
import { displayPrompt, setVisibility } from '../../../../../features/general/prompt/promptSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setShowTaskNavigation } from '../../../../../features/task/taskSlice';

export default function TaskMenu() {
  const { currentTaskId } = useAppSelector((state) => state.task);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const useDeleteTask = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const TaskIcons = [
    {
      id: 1,
      icons: <IoEyeOutline />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 2,
      icons: <UserPlusIcon />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 3,
      icons: <MdOutlineDeveloperBoard />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 4,
      icons: <BsTags />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 5,
      icons: <TbSubtask />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 6,
      icons: <MdOutlineDriveFileMove />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 7,
      icons: <HiOutlineDocumentDuplicate />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 8,
      icons: <TbFolderX />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 9,
      icons: <MdDateRange />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 10,
      icons: <FlagIcon />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 11,
      icons: <GiStoneStack />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 12,
      icons: <BiMerge />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 13,
      icons: <GiJusticeStar />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 14,
      icons: <BiEdit />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 15,
      icons: <HiInbox />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 16,
      icons: <MdDeleteForever />,
      handleClick: (id: string) => {
        dispatch(
          displayPrompt('Delete task', 'Would you like delete this task from the workspace?', [
            {
              label: 'Delete task',
              style: 'danger',
              callback: () => {
                useDeleteTask.mutateAsync({
                  taskId: id
                });
                dispatch(setVisibility(false));
                dispatch(setShowTaskNavigation(false));
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      },
      isVisible: true
    }
  ];

  return (
    <div className="overflow-hidden -mt-1.5 z-100">
      <div
        className="abolute flex justify-between items-center w-12/12 h-11 bg-gray-800"
        style={{ transition: 'linear', transitionDelay: '100s' }}
      >
        <div className="pl-5">
          <input type="checkbox" value="checked" />
          <span className="text-white text-xs">1 Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <>
              <p
                className="flex items-center px-2 cursor-pointer mt-0 text-white text-lg"
                onClick={() => menu.handleClick(currentTaskId as string)}
                key={menu.id}
              >
                {menu.icons}
              </p>
            </>
          ))}
        </div>
        <div className="flex items-center pr-5 gap-2 ">
          <MdFileCopy className="text-white text-lg" />
          <input type="text" placeholder="type '/' for commands" className="h-8 rounded bg-transparent text-xs  " />
        </div>
      </div>
    </div>
  );
}
