import React, { useEffect, useState } from 'react';
import { AvatarWithInitials } from '../../../../components';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import {
  UseChecklistItemAssignee,
  UseChecklistItemUnassignee
} from '../../../../features/task/checklist/checklistService';
import {
  UseTaskAssignService,
  UseTaskUnassignService,
  UseTaskWatchersAssignService
} from '../../../../features/task/taskService';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setCurrTeamMemId,
  setSelectedTaskParentId,
  setSelectedTaskType,
  setTaskColumnIndex,
  setTaskRowFocus
} from '../../../../features/task/taskSlice';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { AssigneeType, Task } from '../../../../features/task/interface.tasks';

interface AssigneeItem {
  item: ITeamMembersAndGroup;
  option: string;
  entity_id?: string;
  teams: boolean;
  handleClose: () => void;
  isAssigned?: boolean;
  isWatchers?: boolean;
  assigneeArr: ITeamMembersAndGroup[];
  task: Task;
}

function AssigneeItem({
  item,
  option,
  entity_id,
  teams,
  handleClose,
  isAssigned,
  isWatchers,
  assigneeArr,
  task
}: AssigneeItem) {
  const dispatch = useAppDispatch();

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const {
    selectedTasksArray,
    selectedListIds,
    selectedTaskParentId,
    CompactView,
    taskRowFocus,
    KeyBoardSelectedTaskData
  } = useAppSelector((state) => state.task);

  const { mutate: onCheklistItemAssign } = UseChecklistItemAssignee(entity_id as string, item as AssigneeType);

  const handleAssignChecklist = (id: string) => {
    onCheklistItemAssign({
      itemId: entity_id,
      team_member_id: id
    });
  };

  const { mutate: onTaskAssign } = UseTaskAssignService(
    selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
    item as ITeamMembersAndGroup,
    selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  );
  const { mutate: onWatchersTaskAssign } = UseTaskWatchersAssignService(
    selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
    item as ITeamMembersAndGroup,
    selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  );

  const handleAllAssignee = () => {
    const { id } = item;
    if (option === 'checklist') {
      isAssigned ? handleUnAssignChecklistItem(id) : handleAssignChecklist(id);
    } else if (option === EntityType.task) {
      isAssigned ? handleUnAssignTask(id) : handleAssignTask(id);
    } else if (option === 'getTeamId') {
      dispatch(setCurrTeamMemId(id));
    }
    handleClose();
  };

  const handleAssignTask = (id: string) => {
    if (isWatchers) {
      onWatchersTaskAssign({
        ids: selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
        team_member_ids: [id]
      });
    } else {
      onTaskAssign({
        ids: selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
        team_member_id: id,
        teams
      });
    }
  };

  const { mutate: onTaskUnassign } = UseTaskUnassignService(
    selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
    item as ITeamMembersAndGroup,
    selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  );

  const handleUnAssignTask = (id: string) => {
    handleClose();
    onTaskUnassign({
      taskId: entity_id as string,
      team_member_id: id,
      teams
    });
  };

  const { mutate: onCheklistItemUnassign } = UseChecklistItemUnassignee(entity_id as string, item.id);
  const handleUnAssignChecklistItem = (id: string) => {
    handleClose();
    onCheklistItemUnassign({
      itemId: entity_id,
      team_member_id: id
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && focusedIndex !== null && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown') {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, assigneeArr.length - 1)));
      }

      if (event.key === 'Enter' && focusedIndex !== null && focusedIndex < assigneeArr.length) {
        dispatch(setSelectedTaskParentId((task.parent_id || task.list_id) as string));
        dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
        handleAllAssignee();
        dispatch(setTaskRowFocus(true));
        dispatch(setTaskColumnIndex(null));
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);

  useEffect(() => {
    if (task.id === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(!taskRowFocus));
  }, [task, KeyBoardSelectedTaskData]);

  return (
    <div
      className={`flex items-center justify-between w-full h-12 px-4 cursor-pointer ${
        focusedIndex && assigneeArr[focusedIndex].id === item.id ? 'bg-alsoit-gray-50' : ''
      } hover:bg-alsoit-gray-50 group`}
    >
      <div className="relative flex items-center space-x-2 cursor-pointer" onClick={handleAllAssignee}>
        <span className={`${isAssigned ? 'ring ring-green-500 ring-offset-2 rounded-full ' : null}`}>
          {!teams ? (
            <div>
              {!item.user.avatar_path && (
                <AvatarWithInitials
                  initials={item.user.initials}
                  backgroundColour={item.user.color}
                  height={CompactView ? 'h-5' : 'h-7'}
                  width={CompactView ? 'w-5' : 'w-7'}
                />
              )}
              {item.user.avatar_path && (
                <AvatarWithImage
                  image_path={item.user.avatar_path}
                  height={CompactView ? 'h-5' : 'h-7'}
                  width={CompactView ? 'w-5' : 'w-7'}
                />
              )}
            </div>
          ) : (
            <AvatarWithInitials
              initials={item.user.initials}
              backgroundColour={item.color}
              height={CompactView ? 'h-5' : 'h-7'}
              width={CompactView ? 'w-5' : 'w-7'}
            />
          )}
        </span>
        <p className="text-sm text-black truncate hover:text-clip">
          {Capitalize(teams ? (item.name as string | null) : item.user.name)}
        </p>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100">
        {isAssigned ? (
          <button
            type="button"
            className="mx-2"
            onClick={() =>
              option === EntityType.task || option === EntityType.subtask
                ? handleUnAssignTask(item.id)
                : handleUnAssignChecklistItem(item.id)
            }
          >
            <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
          </button>
        ) : null}

        <button className="p-1 text-black bg-white border rounded">Profile</button>
      </div>
    </div>
  );
}

export default AssigneeItem;
