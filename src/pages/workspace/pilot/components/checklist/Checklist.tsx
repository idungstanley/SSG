import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
  getOneTaskServices,
  UseCreateCheckList,
} from '../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../app/hooks';
// import { useDispatch } from "react-redux";
// import { useAppSelector } from '../../../../../app/hooks';
// import { createchecklistSlice } from "../../../../../features/task/checklist/checklistSlice";

export default function Checklist() {
  // const dispatch = useDispatch();
  // const { checklist } = useAppSelector((state) => state.checklist);

  // type checklistItem = {
  //   name: string;
  // };
  // const [checklists, setChecklists] = useState<any>(checklist);
  // const addChecklist = () => {
  //   const newChecklist: checklistItem = {
  //     name: "Checklist",
  //   };
  //   const data = {
  //     taskId: "586b2551-6d4a-4a62-9b5a-066eac5716f1",
  //     name: "Checklist",
  //   };
  //   // createChecklistService(data);
  //   dispatch(createchecklistSlice(newChecklist));
  //   setChecklists(checklist);
  //   console.log(checklist);
  // };

  const [triggerCreateChecklist, setTriggerCreateChecklist] = useState(false);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const { data: task } = getOneTaskServices({
    task_id: activeItemId,
  });
  const { data } = UseCreateCheckList({
    task_id: activeItemId,
    trigger: triggerCreateChecklist,
  });
  // console.log(data?.data);
  return (
    <>
      <div>
        <button
          className="px-5  py-2.5 text-xl cursor-pointer"
          onClick={() => setTriggerCreateChecklist(true)}
        >
          + ADD CHECKLIST
        </button>
        <div>
          {/* {checklists.map((item, index) => {
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
                  <div className="opacity-0 hover:opacity-100">
                    <BsThreeDots />
                  </div>
                </span>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}
