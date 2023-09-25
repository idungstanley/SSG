import React, { useEffect, useState } from 'react';
import { MdFileCopy } from 'react-icons/md';
import { useAppSelector } from '../../../../../app/hooks';
import { IoEyeOutline } from 'react-icons/io5';
import { BsTags } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';
import { MdOutlineDeveloperBoard, MdOutlineDriveFileMove, MdDateRange, MdDeleteForever } from 'react-icons/md';
import { HiOutlineDocumentDuplicate, HiInbox } from 'react-icons/hi';
import { TbFolderX } from 'react-icons/tb';
import { GiStoneStack, GiJusticeStar } from 'react-icons/gi';
import { BiMerge, BiEdit } from 'react-icons/bi';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { deleteTask } from '../../../../../features/task/taskService';
import { useDispatch } from 'react-redux';
import { displayPrompt, setVisibility } from '../../../../../features/general/prompt/promptSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setSelectedTasksArray, setShowTaskNavigation } from '../../../../../features/task/taskSlice';
import RoundedCheckbox from '../../../../../components/Checkbox/RoundedCheckbox';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import ToolTip from '../../../../../components/Tooltip/Tooltip';
import ActiveTreeSearch from '../../../../../components/ActiveTree/ActiveTreeSearch';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import { ImCheckmark2 } from 'react-icons/im';

export default function TaskMenu() {
  const dispatch = useDispatch();

  const { selectedTasksArray, duplicateTaskObj } = useAppSelector((state) => state.task);

  const queryClient = useQueryClient();

  const [isVisible, setIsVisible] = useState(false);
  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTasksArray.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedTasksArray]);

  useEffect(() => {
    if (!duplicateTaskObj.popDuplicateTaskModal) {
      handleClose();
    }
  }, [duplicateTaskObj.popDuplicateTaskModal]);

  const useDeleteTask = useMutation(deleteTask, {
    onSuccess: () => {
      dispatch(setSelectedTasksArray([]));
      queryClient.invalidateQueries(['task']);
    }
  });

  const handleShowSelectDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setShowSelectDropdown(event.currentTarget);
  };

  const handleClose = () => {
    setShowSelectDropdown(null);
    // setToggleDuplicateMoal(false);
  };

  const TaskIcons = [
    {
      id: 1,
      label: 'Set watchers',
      icons: <IoEyeOutline />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 2,
      label: 'Set assignees',
      icons: <UserPlusIcon />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 3,
      label: 'Set Status',
      icons: <MdOutlineDeveloperBoard />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 4,
      label: 'Set Status',
      icons: <BsTags />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 5,
      label: 'Set Tags',
      icons: <TbSubtask />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 6,
      label: ' Convert to Subtask ',
      icons: <MdOutlineDriveFileMove />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 7,
      label: 'Duplicate tasks',
      icons: <HiOutlineDocumentDuplicate />,
      handleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        handleShowSelectDropdown(e);
        // setToggleDuplicateMoal(!toggleDuplicateMoal);
      },
      isVisible: true
    },
    {
      id: 8,
      label: 'Move tasks or add tasks in multiple Lists',
      icons: <TbFolderX />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 9,
      label: 'Set Dates',
      icons: <MdDateRange />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 10,
      label: 'Priority',
      icons: <PriorityDropdown taskCurrentPriority="low" />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 11,
      label: 'Dependencies',
      icons: <GiStoneStack />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 12,
      label: 'Merge tasks',
      icons: <BiMerge />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 13,
      label: 'Task Linking',
      icons: <GiJusticeStar />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 14,
      label: 'Set Custom Fields',
      icons: <BiEdit />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 15,
      label: 'Archive tasks',
      icons: <HiInbox />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 16,
      icons: <MdDeleteForever />,
      label: 'Delete',
      handleClick: () => {
        dispatch(
          displayPrompt('Delete task', 'Would you like delete this task from the workspace?', [
            {
              label: 'Delete task',
              style: 'danger',
              callback: () => {
                useDeleteTask.mutateAsync({
                  selectedTasksArray: selectedTasksArray
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
    <div className={`overflow-hidden ${isVisible ? 'slide-in' : 'slide-out'} z-100 `}>
      <div
        className="abolute flex justify-between items-center w-12/12 h-11 bg-gray-800"
        style={{ transition: 'linear', transitionDelay: '100s' }}
      >
        <div className="pl-5 space-x-2">
          <RoundedCheckbox
            styles="rounded-full text-alsoit-purple-300"
            isChecked={true}
            onChange={() => {
              dispatch(setSelectedTasksArray([]));
            }}
          />
          <span className="text-white text-xs">{selectedTasksArray.length} Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <>
              <ToolTip className="pt-2" title={menu.label} placement="bottom">
                <p
                  className="flex items-center px-2 cursor-pointer mt-0 text-white text-lg"
                  onClick={(e) => menu.handleClick(e)}
                  key={menu.id}
                >
                  {menu.icons}
                </p>
              </ToolTip>
            </>
          ))}
        </div>

        <div className="flex items-center pr-5 gap-2 ">
          <MdFileCopy className="text-white text-lg" />
          <input type="text" placeholder="type '/' for commands" className="h-8 rounded bg-transparent text-xs  " />
        </div>
      </div>
      <div className="absolute z-50">
        {
          <AlsoitMenuDropdown handleClose={handleClose} anchorEl={showSelectDropdown}>
            <ActiveTreeSearch option="taskDuplicate" />
          </AlsoitMenuDropdown>
        }
      </div>
      <div className="flex justify-center">
        <p
          className=" bg-gray-800 text-white p-2 rounded-3xl border border-white -mt-1 cursor-pointer"
          onClick={() => {
            dispatch(setSelectedTasksArray([]));
          }}
        >
          <span className="text-gray-300">X</span>
          Dismiss
        </p>
      </div>
    </div>
  );
}
