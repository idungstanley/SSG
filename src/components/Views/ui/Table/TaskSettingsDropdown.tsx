import { useState, useEffect } from 'react';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveTask, unarchiveTask } from '../../../../features/task/taskService';
import { setSelectedTasksArray } from '../../../../features/task/taskSlice';
import { setVisibility, displayPrompt } from '../../../../features/general/prompt/promptSlice';
import { Task } from '../../../../features/task/interface.tasks';
import ToolTip from '../../../Tooltip/Tooltip';
import DropdownTitle from '../../../DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../DropDowns/DropdownSubtitle';
import { Menu } from '@mui/material';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';

interface TaskDropDownProps {
  setEitableContent: (i: boolean) => void;
  task: Task;
}
export default function TaskDropDown({ setEitableContent, task }: TaskDropDownProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);
  const [isArchivedTasks, setArchivedTasks] = useState<boolean>(false);

  const handleSettings = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.preventDefault();
    setDropdownEl(e.currentTarget);
  };

  let isArchived = true;
  useEffect(() => {
    {
      if (!task.archived_at) {
        isArchived = false;
      }
    }
    setArchivedTasks(isArchived);
  }, [task.archived_at]);

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

  const items = [
    {
      label: 'Rename',
      handleClick: (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setEitableContent(true);
        setDropdownEl(null);
      }
    },
    {
      label: 'Add to',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Convert to',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Task Type',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Duplicate',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Send email to task',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Merge',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Move',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Dependencies',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: 'Templates',
      color: 'orange',
      handleClick: () => null
    },
    {
      label: `${isArchivedTasks ? 'Unarchive' : 'Archive'}`,
      handleClick: () => {
        setDropdownEl(null);
        dispatch(
          displayPrompt(
            `${isArchivedTasks ? 'Unarchive' : 'Archive'} task`,
            `Would you like ${isArchivedTasks ? 'unarchive' : 'archive'} this task from the workspace?`,
            [
              {
                label: `${isArchivedTasks ? 'Unarchive' : 'Archive'} task`,
                style: 'warning',
                callback: () => {
                  if (isArchivedTasks) {
                    useUnarchiveTask.mutateAsync({
                      selectedTasksArray: [task.id]
                    });
                  } else {
                    useArchiveTask.mutateAsync({
                      selectedTasksArray: [task.id]
                    });
                  }
                  dispatch(setVisibility(false));
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
      }
    }
  ];

  return (
    <>
      <ToolTip title="Settings">
        <button className="p-1 opacity-0 group-hover:opacity-100" onClick={(e) => handleSettings(e)}>
          <ThreeDotIcon />
        </button>
      </ToolTip>
      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)}>
        <VerticalScroll>
          <div style={{ height: '372px', width: '180px' }}>
            <DropdownTitle content="TASK" />
            <DropdownSubtitle content="SETTINGS" />
            <div>
              {items.map((i) => (
                <div key={i.label}>
                  <div
                    onClick={(e) => {
                      i.handleClick(e), setDropdownEl(null);
                    }}
                    key={i.label}
                    className="flex p-3 text-alsoit-text-lg font-semibold w-full cursor-pointer hover:bg-[#f4f4f4] rounded"
                    style={{ lineHeight: '15.6px', color: i.color || '' }}
                  >
                    {i.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VerticalScroll>
      </Menu>
    </>
  );
}
