import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AvatarWithInitials } from "../../../../components";
import { useGetTeamMembers } from "../../../../features/settings/teamMembers/teamMemberService";
import { useAppSelector } from "../../../../app/hooks";
import {
  setCurrTeamMemId,
  setTriggerAsssignTask,
} from "../../../../features/task/taskSlice";
import { useDispatch } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
  UseAssignTaskService,
  UseUnAssignTaskService,
  getOneTaskServices,
} from "../../../../features/task/taskService";
import {
  UseAssignChecklistItemService,
  UseUnAssignChecklistItemService,
} from "../../../../features/task/checklist/checklistService";
import {
  setTriggerAssignChecklistItem,
  setTriggerUnassignChecklistItem,
} from "../../../../features/task/checklist/checklistSlice";

interface checklistItem {
  assignees: [{ id: string; initials: string; colour: string }];
}

interface option {
  option?: string;
  item?: checklistItem;
}

export default function AssignTask({ option, item }: option) {
  const dispatch = useDispatch();
  const [unAssignTrigger, setUnAssignTrigger] = React.useState(false);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const { data } = useGetTeamMembers({
    page: 0,
    query: "",
  });
  const { toggleAssignCurrentTaskId, currTeamMemberId, triggerAsssignTask } =
    useAppSelector((state) => state.task);

  const {
    clickedChecklistId,
    clickedChecklistItemId,
    triggerAssignChecklistItem,
    triggerUnassignChecklistItem,
  } = useAppSelector((state) => state.checklist);

  UseAssignChecklistItemService({
    checklist_id: clickedChecklistId,
    itemId: clickedChecklistItemId,
    team_member_id: currTeamMemberId,
    triggerAssignChecklistItem: triggerAssignChecklistItem,
  });

  UseUnAssignChecklistItemService({
    checklist_id: clickedChecklistId,
    itemId: clickedChecklistItemId,
    team_member_id: currTeamMemberId,
    triggerUnassignChecklistItem: triggerUnassignChecklistItem,
  });

  UseAssignTaskService({
    task_id: toggleAssignCurrentTaskId,
    team_member_id: currTeamMemberId,
    triggerAsssignTask: triggerAsssignTask,
  });

  UseUnAssignTaskService({
    task_id: toggleAssignCurrentTaskId,
    team_member_id: currTeamMemberId,
    unAssignTrigger,
  });

  const { data: getTaskAssignees } = getOneTaskServices({
    task_id: toggleAssignCurrentTaskId,
  });

  const assignedUser = getTaskAssignees?.data.task.assignees.map(
    ({ id }: { id: string }) => id
  );

  const assignees = item?.assignees.map(({ id }: { id: string }) => id);

  const handleUnAssign = (id: string) => {
    dispatch(setCurrTeamMemId(id));
    setUnAssignTrigger(true);
  };

  const handleUnAssignChecklistItem = (id: string) => {
    dispatch(setCurrTeamMemId(id));
    dispatch(setTriggerUnassignChecklistItem(true));
  };

  // const handleAssignModal = (e) => {
  //   if (assigneeRef.current?.getAttribute('id') !== 'assignModal') {
  //     dispatch(setToggleAssignCurrentTaskId(null));
  //   }
  // };
  return (
    <div className="relative">
      <section
        className="w-60 absolute ml-10 bottom-0 left-0 rounded-md shadow-lg bg-gray-50 overflow-auto"
        style={{ maxHeight: "40vh" }}
        ref={assigneeRef}
        id="assignModal"
      >
        <div className="text-xs">
          <section className="flex relative">
            <AiOutlineSearch className="h-5 w-5 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full border-0 focus:outline-none"
            />
          </section>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {data?.data.team_members.map((item) => (
            <section className="space-x-2 hover:bg-gray-300 p-3" key={item?.id}>
              <div className="flex items-center justify-between cursor-pointer">
                <div
                  className="relative flex items-center cursor-pointer  space-x-2"
                  onClick={() => {
                    dispatch(setCurrTeamMemId(item.id));
                    option === "checklstItem"
                      ? dispatch(setTriggerAssignChecklistItem(true))
                      : dispatch(setTriggerAsssignTask(true));
                  }}
                >
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />
                  <p className="text-xs text-black">
                    {item.user.name.toLocaleUpperCase()}
                  </p>
                </div>
                {assignees?.includes(item.id) && option === "checklstItem" ? (
                  <button
                    type="button"
                    onClick={() => handleUnAssignChecklistItem(item.id)}
                  >
                    <TrashIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
                  </button>
                ) : null}
                {assignedUser?.includes(item.id) &&
                option !== "checklstItem" ? (
                  <button type="button" onClick={() => handleUnAssign(item.id)}>
                    <TrashIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
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
