import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../../app/hooks";
import {
  UseCreateClistService,
  UseGetAllClistService,
  UseUpdateChecklistService,
} from "../../../../../../features/task/checklist/checklistService";
import ChecklistItem from "../components/ChecklistItem";
import { Spinner } from "../../../../../../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ChecklistModal from "../components/ChecklistModal";
import { lessOptions } from "../ModalOptions";
import { completeOptions } from "../ModalOptions";
import { setTriggerChecklistUpdate } from "../../../../../../features/task/checklist/checklistSlice";
import { BiCaretRight } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { Disclosure } from "@headlessui/react";

export default function ChecklistIndex() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Local states
  const [checklistName, setChecklistName] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  const [checklistId, setChecklistId] = useState<string>("");

  // RTK states
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const { triggerChecklistUpdate } = useAppSelector((state) => state.checklist);

  //Create Checklist
  const createChecklist = useMutation(UseCreateClistService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      task_id: currentTaskIdForPilot,
    });
  };

  // Get Checklists
  const { data, status, refetch } = UseGetAllClistService({
    task_id: currentTaskIdForPilot,
  });
  const task_checklist = data?.data.task.checklists;

  // Update Checklist
  const { data: updateData, status: updateStatus } = UseUpdateChecklistService({
    checklist_id: checklistId,
    name: checklistName,
    triggerUpdate: triggerChecklistUpdate,
  });

  if (updateStatus === "success") {
    refetch();
  }

  const editChecklist = (name: string) => {
    setChecklistName(name);
    setEditing(true);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    dispatch(setTriggerChecklistUpdate(true));
    setEditing(false);
    setChecklistId(id);
  };

  if (status == "loading") {
    <Spinner size={20} color={"blue"} />;
  }
  return status == "success" ? (
    <div className="p-1">
      <div className="border-2 flex justify-center items-center text-center">
        <h1 className="text-xl">Checklists</h1>
        <div
          className="rounded-full text-xl cursor-pointer hover:bg-gray-300 mx-3 p-1"
          onClick={handleSubmit}
        >
          <GoPlus className="w-3 h-3" />
        </div>
      </div>
      <div>
        {task_checklist.length > 0
          ? task_checklist.map((item, index) => {
              const done = item.items.filter((e) => e.is_done);
              return (
                <Disclosure key={item.id}>
                  {({ open }) => (
                    <div>
                      <div className="group flex items-center border-2 border-t-0 p-1 hover:text-gray-700 hover:bg-gray-200 cursor-pointer">
                        <span className="px-5 flex items-center">
                          <Disclosure.Button>
                            <div className="mx-1">
                              <BiCaretRight
                                className={
                                  open ? "rotate-90 transform w-4 h-4" : ""
                                }
                              />
                            </div>
                          </Disclosure.Button>
                          <div>
                            {editing && itemId === item.id ? (
                              <form onSubmit={(e) => handleEdit(e, item.id)}>
                                <input
                                  type="text"
                                  value={checklistName}
                                  onChange={(e) =>
                                    setChecklistName(e.target.value)
                                  }
                                />
                              </form>
                            ) : (
                              <h1
                                className="cursor-text"
                                onClick={() => {
                                  setItemId(item.id);
                                  editChecklist(item.name);
                                }}
                              >
                                {item.name}
                              </h1>
                            )}
                          </div>
                          <label>
                            ({done.length}/{item.items.length})
                          </label>
                        </span>
                        <div className="opacity-0 group-hover:opacity-100">
                          <ChecklistModal
                            options={
                              item.items.length === 0
                                ? lessOptions
                                : completeOptions
                            }
                          />
                        </div>
                      </div>
                      <Disclosure.Panel className="ml-6">
                        <ChecklistItem
                          Item={item.items}
                          checklistId={item.id}
                          refetch={refetch}
                        />
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              );
            })
          : "This task has no Checklist, click on the plus sign to create one"}
      </div>
    </div>
  ) : null;
}
