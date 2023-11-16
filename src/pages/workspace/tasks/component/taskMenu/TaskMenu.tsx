import React, { useEffect, useState, Fragment } from 'react';
import { MdFileCopy } from 'react-icons/md';
import { useAppSelector } from '../../../../../app/hooks';
import { IoEyeOutline } from 'react-icons/io5';
import { BsBox, BsTags } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';
import { MdOutlineDriveFileMove, MdDateRange, MdDeleteForever } from 'react-icons/md';
import { HiOutlineDocumentDuplicate, HiInbox } from 'react-icons/hi';
import { TbFolderX } from 'react-icons/tb';
import { GiStoneStack, GiJusticeStar } from 'react-icons/gi';
import { HiOutlineUserPlus } from 'react-icons/hi2';
import { BiMerge } from 'react-icons/bi';
import { archiveTask, deleteTask, unarchiveTask } from '../../../../../features/task/taskService';
import { useDispatch } from 'react-redux';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

import { displayPrompt, setVisibility } from '../../../../../features/general/prompt/promptSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  setSelectedListIds,
  setSelectedTasksArray,
  setShowTaskNavigation,
  setSubtasks,
  setTasks
} from '../../../../../features/task/taskSlice';
import RoundedCheckbox from '../../../../../components/Checkbox/RoundedCheckbox';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import ToolTip from '../../../../../components/Tooltip/Tooltip';
import ActiveTreeSearch from '../../../../../components/ActiveTree/ActiveTreeSearch';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import { deleteTaskManager, findCurrentTaskManager } from '../../../../../managers/Task';
import Assignee from '../../assignTask/Assignee';
import { ManageTagsDropdown } from '../../../../../components/Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AiFillFlag } from 'react-icons/ai';
import DateFormat from '../../../../../components/DateFormat';
import CustomFieldsModal from '../../customFields/CustomFieldsModal';
import MultipleStatuses from '../../multipleStatuses/MultipleStatuses';

export const TASK_DUPLICATE = 'task_duplicate';
export const TASK_MOVE = 'task_move';
export const BROWSE_TASKS_FROM_HOME = 'browse_tasks_from_home';
export const OPTIONS_WITH_AVAILABLE_LISTS = [TASK_DUPLICATE, TASK_MOVE, BROWSE_TASKS_FROM_HOME];

export default function TaskMenu() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    selectedTasksArray,
    duplicateTaskObj,
    selectedListIds,
    selectedTaskParentId,
    tasks: taskData,
    subtasks
  } = useAppSelector((state) => state.task);

  const [isVisible, setIsVisible] = useState(false);
  const [isHideTooltip, setHideTooltip] = useState<boolean>(false);
  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);
  const [isArchivedTasks, setArchivedTasks] = useState<boolean>(false);
  const [activeTreeType, setActiveTreeType] = useState<string>('');

  useEffect(() => {
    if (selectedTasksArray.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedTasksArray]);

  useEffect(() => {
    if (!duplicateTaskObj.popDuplicateTaskModal || !selectedTasksArray.length) {
      handleClose();
    }
  }, [duplicateTaskObj.popDuplicateTaskModal, selectedTasksArray]);

  useEffect(() => {
    if (selectedTasksArray.length) {
      let isArchived = true;
      selectedTasksArray.forEach((id) => {
        const currentTask = findCurrentTaskManager(id, taskData, subtasks);
        if (!currentTask?.archived_at) {
          isArchived = false;
        }
      });
      setArchivedTasks(isArchived);
    }
  }, [selectedTasksArray]);

  const useDeleteTask = useMutation(deleteTask, {
    onSuccess: () => {
      const updatedTasks = deleteTaskManager(
        selectedTasksArray as string[],
        selectedListIds.length ? selectedListIds : [selectedTaskParentId],
        taskData
      );
      // const selectedTaskType === EntityType.task ? taskData : subtasks;

      if (EntityType.task) {
        dispatch(setTasks(updatedTasks));
      } else {
        dispatch(setSubtasks(updatedTasks));
      }
      dispatch(setSelectedTasksArray([]));
    }
  });

  const useArchiveTask = useMutation(archiveTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks']);
      dispatch(setSelectedTasksArray([]));
    }
  });

  const useUnarchiveTask = useMutation(unarchiveTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks']);
      dispatch(setSelectedTasksArray([]));
    }
  });

  const handleShowSelectDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setShowSelectDropdown(event.currentTarget);
  };

  const handleClose = () => {
    setShowSelectDropdown(null);
  };

  const TaskIcons = [
    {
      id: 'set_watchers',
      label: 'Set watchers',
      icons: <Assignee option="task" icon={<IoEyeOutline />} isAdditionalHeader={true} isWatchers={true} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_assignees',
      label: 'Set assignees',
      icons: <Assignee option="task" isAdditionalHeader={true} icon={<HiOutlineUserPlus />} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_status',
      label: 'Set Status',
      icons: <MultipleStatuses />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_tags',
      label: 'Set Tags',
      icons: <ManageTagsDropdown entityId="" tagsArr={[]} entityType="task" icon={<BsTags />} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'convert_to_subtask',
      label: 'Convert to subtasks',
      icons: <TbSubtask color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'move_tasks_or_add_tasks_in_multiple_lists',
      // label: 'Move tasks or add tasks in multiple Lists',
      label: 'Move tasks',
      icons: <MdOutlineDriveFileMove />,
      handleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        handleShowSelectDropdown(e);
        setActiveTreeType(TASK_MOVE);
      },
      isVisible: true
    },
    {
      id: 'duplicate_tasks',
      label: 'Duplicate tasks',
      icons: <HiOutlineDocumentDuplicate />,
      handleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        handleShowSelectDropdown(e);
        setActiveTreeType(TASK_DUPLICATE);
      },
      isVisible: true
    },
    {
      id: 'remove_tasks_from_this_lists',
      label: 'Remove tasks from this List',
      icons: <TbFolderX color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_dates',
      label: 'Set Dates',
      icons: <DateFormat date="" icon={<MdDateRange className="h-5 w-5 text-white" />} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'priority',
      label: 'Priority',
      icons: <PriorityDropdown taskCurrentPriority="low" icon={<AiFillFlag className="h-4 w-5 text-white" />} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_task_type',
      label: 'Set task type',
      icons: <BsBox color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'dependencies',
      label: 'Dependencies',
      icons: <GiStoneStack color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'merge_tasks',
      label: 'Merge tasks',
      icons: <BiMerge color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'task_linking',
      label: 'Task Linking',
      icons: <GiJusticeStar color="orange" opacity={0.5} />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: 'set_custom_fields',
      label: 'Set Custom Fields',
      icons: <CustomFieldsModal />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      id: isArchivedTasks ? 'unarchive_tasks' : 'archive_tasks',
      label: isArchivedTasks ? 'Unarchive tasks' : 'Archive tasks',
      icons: <HiInbox />,
      handleClick: () => {
        dispatch(
          displayPrompt(
            `${isArchivedTasks ? 'Unarchive' : 'Archive'} tasks`,
            `Would you like ${isArchivedTasks ? 'unarchive' : 'archive'} these tasks from the workspace?`,
            [
              {
                label: `${isArchivedTasks ? 'Unarchive' : 'Archive'} tasks`,
                style: 'warning',
                callback: () => {
                  if (isArchivedTasks) {
                    useUnarchiveTask.mutateAsync({
                      selectedTasksArray: selectedTasksArray
                    });
                  } else {
                    useArchiveTask.mutateAsync({
                      selectedTasksArray: selectedTasksArray
                    });
                  }
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
            ]
          )
        );
      },
      isVisible: true
    },
    {
      id: 'delete',
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
        className="flex items-center justify-between bg-gray-800 abolute w-12/12 h-11"
        style={{ transition: 'linear', transitionDelay: '100s' }}
      >
        <div className="pl-5 space-x-2">
          <RoundedCheckbox
            styles="rounded-full text-alsoit-purple-300"
            isChecked={true}
            onChange={() => {
              dispatch(setSelectedTasksArray([]));
              dispatch(setSelectedListIds([]));
            }}
          />
          <span className="text-xs text-white">{selectedTasksArray.length} Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <Fragment key={menu.id}>
              <ToolTip className="pt-2" title={isHideTooltip ? '' : menu.label} placement="bottom">
                <p
                  className="flex items-center px-2 mt-0 text-lg text-white cursor-pointer"
                  onClick={(e) => {
                    menu.handleClick(e);
                    setHideTooltip(!isHideTooltip);
                  }}
                  key={menu.id}
                >
                  {menu.icons}
                </p>
              </ToolTip>
            </Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2 pr-5 ">
          <ToolTip className="pt-2" title="Copy to clipboard" placement="bottom">
            <div>
              <MdFileCopy className="text-lg" color="orange" opacity={0.5} />
            </div>
          </ToolTip>
          <input type="text" placeholder="type '/' for commands" className="h-8 text-xs bg-transparent rounded " />
        </div>
      </div>
      <div className="absolute z-50">
        {
          <AlsoitMenuDropdown handleClose={handleClose} anchorEl={showSelectDropdown}>
            <ActiveTreeSearch option={activeTreeType} />
          </AlsoitMenuDropdown>
        }
      </div>
      <div className="flex justify-center">
        <p
          className="p-2 -mt-1 text-white bg-gray-800 border border-white cursor-pointer rounded-3xl"
          onClick={() => {
            dispatch(setSelectedTasksArray([]));
            dispatch(setSelectedListIds([]));
          }}
        >
          <span className="mr-2 text-gray-300">X</span>
          Dismiss
        </p>
      </div>
    </div>
  );
}
