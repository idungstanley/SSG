import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../app/hooks";
import { getchecklist } from "../../../../../features/task/checklist/checklistSlice";
import {
  createChecklistService,
  getOneTaskServices,
} from "../../../../../features/task/taskService";
import { UseCreateChecklist } from "../../../../../features/task/checklist/checklistService";

type checklistItem = {
  name: string;
};

export default function Checklist() {
  const dispatch = useDispatch();
  const [checklists, setChecklists] = useState<any>(null);
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
  const [updateChecklist, setUpdateChecklist] = useState<boolean>(false);
  dispatch(getchecklist(currentTaskIdForPilot));

  const { data, status } = UseCreateChecklist({
    task_id: currentTaskIdForPilot,
    trigger: triggerCreate,
  });

  // console.log(status);
  const { data: task, refetch } = getOneTaskServices({
    task_id: currentTaskIdForPilot,
  });
  console.log(task?.data.task.task_checklists);
  if (status == "success") {
    refetch();
  }

  const { checklist } = useAppSelector((state) => state.checklist);
  useEffect(() => {
    setChecklists(checklist);
  }, [checklists, checklist]);

  return (
    <>
      <div>
        <button
          className="px-5  py-2.5 text-xl cursor-pointer"
          onClick={() => setTriggerCreate(true)}
        >
          + ADD CHECKLIST
        </button>
        <div>
          {task?.data.task.task_checklists &&
            task?.data.task.task_checklists.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center">
                    <h1 className="px-5 text-xl">{item.name}(0/0)</h1>
                    <div className="opacity-0 hover:opacity-100 cursor-pointer">
                      <BsThreeDots />
                    </div>
                  </div>
                  <span className="flex items-center">
                    <label className="text-xl px-5">+</label>
                    <input
                      type="text"
                      className="border-none hover:boder-none hover:outline-none"
                      placeholder="New Checklist Item"
                    />
                    <div className="opacity-0 hover:opacity-100 cursor-pointer">
                      <BsThreeDots />
                    </div>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
