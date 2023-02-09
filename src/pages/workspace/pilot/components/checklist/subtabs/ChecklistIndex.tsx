import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../../app/hooks";
import {
  UseCreateClistService,
  UseGetAllClistService,
} from "../../../../../../features/task/checklist/checklistService";
import ChecklistItem from "../components/ChecklistItem";
import { Spinner } from "../../../../../../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ChecklistModal from "../components/ChecklistModal";
import { lessOptions } from "../ModalOptions";
import { completeOptions } from "../ModalOptions";
import { setTriggerChecklistUpdate } from "../../../../../../features/task/checklist/checklistSlice";
import { BiCaretRight } from "react-icons/bi";

export default function ChecklistIndex() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Local states
  const [checklistName, setChecklistName] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  const [checklistId, setChecklistId] = useState<string>("");
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [arrowDown, setArrowDown] = useState<boolean>(false);

  // Redux states
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);

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
  // const { data: updateRes, status: updateStatus } = UseUpdateChecklistService({
  //   checklist_id: checklistId,
  //   name: checklistName,
  //   triggerUpdate: triggerChecklistUpdate,
  // });

  const editChecklist = (name: string) => {
    setChecklistName(name);
    setEditing(true);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    dispatch(setTriggerChecklistUpdate(true));
    setEditing(false);
    setChecklistId(id);
    refetch();
  };

  if (status == "loading") {
    <Spinner size={20} color={"blue"} />;
  }
  return status == "success" ? (
    <div className="mx-3">
      <div>
        <button
          className="px-5  py-2.5 text-xl cursor-pointer"
          onClick={handleSubmit}
        >
          + ADD CHECKLIST
        </button>
        <div>
          {task_checklist &&
            task_checklist.map(
              (
                item: { id: string; name: string; items: [] },
                index: number
              ) => {
                const done = item.items.filter(
                  (elem: { is_done: number }) => elem.is_done
                );
                return (
                  <div key={index}>
                    <div className="flex items-center">
                      <span className="px-5 text-lg flex items-center">
                        <div className="mx-1">
                          <BiCaretRight
                            onClick={() => {
                              setArrowDown(!arrowDown);
                              setItemId(item.id);
                              setShowChildren(!showChildren);
                            }}
                            className={`${
                              arrowDown && itemId == item.id
                                ? "transform rotate-90"
                                : ""
                            } cursor-pointer`}
                          />
                        </div>
                        {editing && itemId === item.id ? (
                          <form onSubmit={(e) => handleEdit(e, item.id)}>
                            <input
                              type="text"
                              value={checklistName}
                              onChange={(e) => setChecklistName(e.target.value)}
                            />
                          </form>
                        ) : (
                          <h1
                            onClick={() => {
                              setItemId(item.id);
                              editChecklist(item.name);
                            }}
                          >
                            {item.name}
                          </h1>
                        )}
                        <label>
                          ({done.length}/{item.items.length})
                        </label>
                      </span>
                      <div>
                        <ChecklistModal
                          options={
                            item.items.length === 0
                              ? lessOptions
                              : completeOptions
                          }
                        />
                      </div>
                    </div>
                    {showChildren && itemId == item.id ? (
                      <ChecklistItem
                        Item={item.items}
                        checklistId={item.id}
                        refetch={refetch}
                      />
                    ) : null}
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  ) : null;
}
