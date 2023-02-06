import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../app/hooks";
import {
  getchecklist,
  updateList,
} from "../../../../../features/task/checklist/checklistSlice";
import { createChecklistService } from "../../../../../features/task/checklist/checklistService";
import { getOneTaskServices } from "../../../../../features/task/taskService";
import { getaTaskServices } from "../../../../../features/task/checklist/checklistService";

type checklistItem = {
  name: string;
};

export default function Checklist() {
  const dispatch = useDispatch();
  const { checklist } = useAppSelector((state) => state.checklist);
  const [checklists, setChecklists] = useState<any>(checklist);

  useEffect(() => {
    setChecklists(checklist);
  }, [checklists, checklist]);

  const addChecklist = () => {
    dispatch(
      updateList({
        name: "Checklist",
      })
    );
  };
  return (
    <>
      <div>
        <button
          className="px-5  py-2.5 text-xl cursor-pointer"
          onClick={addChecklist}
        >
          + ADD CHECKLIST
        </button>
        <div>
          {checklists &&
            checklists.map((item, index) => {
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
