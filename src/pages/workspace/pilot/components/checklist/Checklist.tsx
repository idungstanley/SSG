import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { createChecklistService } from "../../../../../features/task/checklist/checklistService";

export default function Checklist() {
  const [input, setInput] = useState<boolean>(false);

  type checklistItem = {
    name: string;
  };
  const [checklists, setChecklists] = useState<any>([
    {
      name: "Checklist",
    },
    {
      name: "Checklist",
    },
  ]);
  const addChecklist = () => {
    const newChecklist: checklistItem = {
      name: "Checklist",
    };
    const data = {
      taskId: "586b2551-6d4a-4a62-9b5a-066eac5716f1",
      name: "Checklist",
    };
    createChecklistService(data);
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
          {checklists.map((item, index) => {
            return (
              <>
                <h1 className="px-5 text-xl" key={index}>
                  {item.name}(0/0)
                </h1>
                <span>
                  <label className="text-xl px-5">+</label>
                  <input
                    type="text"
                    className="border-none hover:boder-none hover:outline-none"
                    placeholder="New Checklist Item"
                  />
                </span>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
