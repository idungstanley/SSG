import React from 'react';
import { AvatarWithInitials } from '../../../../components';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import {
  UseChecklistItemAssignee,
  UseChecklistItemUnassignee
} from '../../../../features/task/checklist/checklistService';
import { UseTaskAssignService, UseTaskUnassignService } from '../../../../features/task/taskService';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setCurrTeamMemId } from '../../../../features/task/taskSlice';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

interface AssigneeItem {
  item: ITeamMembersAndGroup;
  option: string;
  entity_id?: string;
  teams: boolean;
  handleClose: () => void;
  isAssigned?: boolean;
}

function AssigneeItem({ item, option, entity_id, teams, handleClose, isAssigned }: AssigneeItem) {
  const dispatch = useAppDispatch();

  const { selectedTasksArray, selectedListIds, selectedTaskParentId } = useAppSelector((state) => state.task);

  const { mutate: onCheklistItemAssign } = UseChecklistItemAssignee();

  const handleAssignChecklist = (id: string) => {
    onCheklistItemAssign({
      itemId: entity_id,
      team_member_id: id
    });
  };

  const { mutate: onTaskAssign } = UseTaskAssignService(
    selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
    item,
    selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  );

  const handleAssignTask = (id: string) => {
    onTaskAssign({
      taskIds: selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
      team_member_id: id,
      teams
    });
  };

  const { mutate: onTaskUnassign } = UseTaskUnassignService(
    selectedTasksArray.length ? selectedTasksArray : [entity_id as string],
    item,
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

  const { mutate: onCheklistItemUnassign } = UseChecklistItemUnassignee();
  const handleUnAssignChecklistItem = (id: string) => {
    handleClose();
    onCheklistItemUnassign({
      itemId: entity_id,
      team_member_id: id
    });
  };

  return (
    <div className="flex items-center justify-between cursor-pointer w-full hover:bg-gray-200 h-12 px-4 group">
      <div
        className="relative flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          handleClose();
          option === 'checklist'
            ? handleAssignChecklist(item.id)
            : option === EntityType.task
            ? handleAssignTask(item.id)
            : option === 'getTeamId'
            ? dispatch(setCurrTeamMemId(item.id))
            : null;
        }}
      >
        <span className={`${isAssigned ? 'ring ring-green-500 ring-offset-2 rounded-full ' : null}`}>
          {!teams ? (
            <div>
              {!item.user.avatar_path && (
                <AvatarWithInitials
                  initials={item.user.initials}
                  backgroundColour={item.user.color}
                  height="h-8"
                  width="w-8"
                />
              )}
              {item.user.avatar_path && <AvatarWithImage image_path={item.user.avatar_path} height="h-8" width="w-8" />}
            </div>
          ) : (
            <AvatarWithInitials initials={item.user.initials} backgroundColour={item.color} height="h-8" width="w-8" />
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

        <button className="text-black border rounded p-1 bg-white">Profile</button>
      </div>
    </div>
  );
}

export default AssigneeItem;
