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
import { Disclosure, Transition } from "@headlessui/react";

type checklistItem = {
  name: string;
};

export default function ChecklistIndex() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Local states
  const [checklistName, setChecklistName] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  const [checklistId, setChecklistId] = useState<string>("");

  // Redux states
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
  const { data: updateRes, status: updateStatus } = UseUpdateChecklistService({
    checklist_id: checklistId,
    name: checklistName,
    triggerUpdate: triggerChecklistUpdate,
  });

  const editChecklist = (name) => {
    setChecklistName(name);
    setEditing(true);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    console.log(checklistName);
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
            task_checklist.map((item, index) => {
              const done = item.items.filter((e) => e.is_done);
              return (
                <div key={index}>
                  <div className="flex items-center">
                    <span className="px-5 text-lg flex items-center">
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
                  <ChecklistItem Item={item.items} checklistId={item.id} />
                  {/* ===============================  */}
                  <Disclosure>
                    <Disclosure.Button>btn</Disclosure.Button>
                    <span className="px-5 text-lg flex items-center">
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
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <ChecklistItem
                          Item={item.items}
                          checklistId={item.id}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : null;
}
