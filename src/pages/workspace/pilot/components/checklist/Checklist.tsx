import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../app/hooks";
import {
  UseCreateClistService,
  UseGetAllClistService,
} from "../../../../../features/task/checklist/checklistService";
import ChecklistItem from "./ChecklistItem";
import { Spinner } from "../../../../../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ChecklistSubtab from "./ChecklistSubtab";
import ChecklistModal from "./ChecklistModal";

type checklistItem = {
  name: string;
};

export default function Checklist() {
  const queryClient = useQueryClient();

  const createChecklist = useMutation(UseCreateClistService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  console.log(currentTaskIdForPilot);
  const { data, status, refetch } = UseGetAllClistService({
    task_id: currentTaskIdForPilot,
  });
  const task_checklist = data?.data.task.checklists;
  const [checklists, setChecklists] = useState(task_checklist);
  console.log(data);

  if (status == "loading") {
    <Spinner size={20} color={"blue"} />;
  }
  console.log(status);
  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      task_id: currentTaskIdForPilot,
    });
  };

  return status == "success" ? (
    <div className="mx-3">
      <ChecklistSubtab />
      <div>
        <button
          className="px-5  py-2.5 text-xl cursor-pointer"
          onClick={handleSubmit}
        >
          + ADD CHECKLIST
        </button>
        <div>
          {task_checklist &&
            task_checklist.map((item, index) => {
              const done = item.items.filter((e) => e.is_done);
              return (
                <div key={index}>
                  <div className="flex items-center">
                    <h1 className="px-5 text-lg">
                      {item.name}({done.length}/{item.items.length})
                    </h1>
                    <div>
                      <ChecklistModal />
                    </div>
                  </div>
                  <ChecklistItem Item={item.items} checklistId={item.id} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : null;
}
