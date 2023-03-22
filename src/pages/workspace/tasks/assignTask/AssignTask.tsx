import React, { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AvatarWithInitials } from '../../../../components';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector } from '../../../../app/hooks';
import { setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';
import { getOneTaskService, UseTaskAssignService, UseUnassignTask } from '../../../../features/task/taskService';
import {
  UseChecklistItemAssignee,
  UseChecklistItemUnassignee
} from '../../../../features/task/checklist/checklistService';

interface checklistItem {
  assignees: [{ id: string; initials: string; colour: string }];
}

interface option {
  option?: string;
  item?: checklistItem;
}

export default function AssignTask({ option, item }: option) {
  const dispatch = useDispatch();
  const assigneeRef = useRef<HTMLInputElement>(null);
  const { data } = useGetTeamMembers({
    page: 0,
    query: ''
  });
  const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);

  const { clickedChecklistItemId } = useAppSelector((state) => state.checklist);

  const { mutate: onCheklistItemAssign } = UseChecklistItemAssignee();
  const { mutate: onCheklistItemUnassign } = UseChecklistItemUnassignee();
  const { mutate: onTaskAssign } = UseTaskAssignService();
  const { mutate: onTaskUnassign } = UseUnassignTask();

  const { data: getTaskAssignees } = getOneTaskService({
    task_id: toggleAssignCurrentTaskId
  });

  const assignedUser = getTaskAssignees?.data?.task?.assignees?.map(({ id }: { id: string }) => id);

  const assignees = item?.assignees.map(({ id }: { id: string }) => id);

  const handleAssignTask = (id: string) => {
    onTaskAssign({
      taskId: toggleAssignCurrentTaskId,
      team_member_id: id
    });
  };

  const handleUnAssignChecklistItem = (id: string) => {
    onCheklistItemUnassign({
      itemId: clickedChecklistItemId,
      team_member_id: id
    });
  };
  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: toggleAssignCurrentTaskId,
      team_member_id: id
    });
  };

  const handleAssignChecklist = (id: string) => {
    onCheklistItemAssign({
      itemId: clickedChecklistItemId,
      team_member_id: id
    });
  };

  return (
    <div className="relative">
      <section
        className="absolute bottom-0 left-0 ml-10 overflow-auto rounded-md shadow-lg w-60 bg-gray-50"
        style={{ maxHeight: '40vh' }}
        ref={assigneeRef}
        id="assignModal"
      >
        <div className="text-xs">
          <section className="relative flex">
            <AiOutlineSearch className="absolute w-5 h-5 right-3 top-3" />
            <input type="text" placeholder="Search..." className="w-full p-2 border-0 focus:outline-none" />
          </section>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {data?.data.team_members.map((item) => (
            <section className="p-3 space-x-2 hover:bg-gray-300" key={item?.id}>
              <div className="flex items-center justify-between cursor-pointer">
                <div
                  className="relative flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    dispatch(setCurrTeamMemId(item.id));
                    option === 'checklst_item' ? handleAssignChecklist(item.id) : handleAssignTask(item.id);
                  }}
                >
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />
                  <p className="text-xs text-black">{item.user.name.toLocaleUpperCase()}</p>
                </div>
                {assignees?.includes(item.id) && option === 'checklst_item' ? (
                  <button type="button" onClick={() => handleUnAssignChecklistItem(item.id)}>
                    <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </button>
                ) : null}
                {assignedUser?.includes(item.id) && option !== 'checklst_item' ? (
                  <button type="button" onClick={() => handleUnAssignTask(item.id)}>
                    <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </button>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
