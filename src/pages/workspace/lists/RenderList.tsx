import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { CheckIcon } from "@heroicons/react/solid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components";
import {
  createTaskService,
  getTaskListService,
} from "../../../features/task/taskService";
import { getListsDetailsService } from "../../../features/list/listService";
import SubTask from "../subtasks/subtask1/SubTask";
// import RenderTaskModal from '../../tasks/ccomponent/RenderTaskModal';
import ListNav from "./components/renderlist/ListNav";

function RenderList() {
  const [addNewItem, setAddNewItem] = useState(false);
  const [parentTaskId, setParentTaskId] = useState("");
  const [subTaskOne, setSubTaskOne] = useState<boolean | string>(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const { listId } = useParams();
  const queryClient = useQueryClient();
  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries("createtask" as any);
      setAddNewItem(!addNewItem);
    },
  });
  const { data: listChildrenData } = useQuery<{
    data: { tasks: { id: string; name: string }[] };
  }>({
    queryKey: ["listData_bylistId", listId],
    queryFn: getTaskListService,
  });

  const { data: listDetailsData } = useQuery({
    queryKey: ["listDetails", listId],
    queryFn: getListsDetailsService,
  });
  const defaultTaskFormState = {
    name: "",
  };

  const [formState, setFormState] = useState(defaultTaskFormState);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const { name } = formState;

  const onSubmit = async () => {
    await createTask.mutateAsync({
      name,
      getListId: listId,
    });
  };

  const handleSubTask = (id: string) => {
    setParentTaskId(id);
    setSubTaskOne(!subTaskOne);
    if (subTaskOne === id) {
      return setSubTaskOne(false);
    }
    setSubTaskOne(id);
  };

  const navigate = useNavigate();
  const handleTaskModal = (id: string) => {
    setOpenTaskModal(true);
    navigate(`/workspace/t/${id}`);
  };

  return (
    <div className="h-screen" style={{ backgroundColor: "#eee" }}>
      <section id="nav">
        <ListNav
          navName="ListName"
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="mt-3 p-3">
        <div
          className=" block p-2border border-gray-200"
          style={{ backgroundColor: "#eee" }}
        >
          <div id="listTitle" className="flex justify-between items-center">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <ChevronDownIcon
                className="flex-shrink-0 h-4 w-5"
                aria-hidden="true"
              />
              <p className="font-bold text-gray-700 dark:text-gray-400">
                {listDetailsData?.data?.list?.name}
              </p>
              <InformationCircleIcon
                className="flex-shrink-0 h-4 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p> + New Task</p>
              <p>Add Description</p>
              <p>Add Comment</p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-gray-400">
              <CheckIcon
                className="flex-shrink-0 h-4 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p>Show Closed</p>
            </div>
          </div>
          <section id="border">
            <div className="inline-flex justify-center items-center w-full p-3">
              <hr className="my-8 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
              <span
                className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 dark:text-white dark:bg-gray-900"
                style={{ backgroundColor: "#eee" }}
              >
                Add New Status
              </span>
            </div>
          </section>
          {/* card */}
          <div className="flex w-full">
            <div className=" flex w-6/12 items-center gap-2">
              <FiArrowDownCircle
                className=" text-gray-400 text-xs"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-gray-400	">OPEN</span>{" "}
              {listChildrenData?.data?.tasks.length}
              <span className="text-xs font-semibold text-gray-400	">TASK</span>
            </div>
            <div className="flex items-center space-x-8">
              <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold">
                <span>
                  <MdOutlineDragIndicator />
                </span>
                <span>USER</span>
              </p>
              <p className="h-5  text-gray-400 text-xs text-gray-400 text-md  rounded-full p-1 ml-1 font-semibold">
                DUE DATE
              </p>
              <p className="h-5 text-gray-400 text-xs text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold">
                PRIORITY
              </p>
              <p className="h-5  text-gray-400 text-xs text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold">
                CREATED AT
              </p>
              <p className="h-5  text-gray-400 text-xs text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold">
                <FiPlusCircle className="font-black	" />
              </p>
            </div>
          </div>
          {listChildrenData?.data?.tasks?.map((task) => (
            <div key={task.id}>
              <div className="bg-white border border-gray-100  flex  items-center ml-5 pl-3">
                <RiCheckboxBlankFill
                  className=" text-gray-400 text-xs"
                  aria-hidden="true"
                />
                <div className="flex items-center w-6/12">
                  {/* data and input */}
                  <div onClick={() => handleTaskModal(task.id)}>
                    <p className="capitalize text-xs font-semibold leading-8 pl-5	">
                      {task.name}
                    </p>
                  </div>

                  {/* iconstask */}
                  <div
                    id="iconWrapper"
                    className="flex items-center space-x-1 ml-1 opacity-0  hover:opacity-100"
                  >
                    <div
                      id="wrapper"
                      className="flex items-center justify-center h-6 w-6 rounded bg-gray-100  "
                    >
                      <PlusOutlined
                        className="cursor-pointer flex-shrink-0 text-xs h-6 w-6 text-black"
                        aria-hidden="true"
                        onClick={() => handleSubTask(task.id)}
                      />
                    </div>
                    <div
                      id="wrapper"
                      className="flex items-center justify-center h-5 w-5 rounded bg-gray-100"
                    >
                      <EditOutlined
                        className="cursor-pointer flex-shrink-0 text-xs h-4 w-4 text-black"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                {/* icons */}

                <div className="flex  space-x-10">
                  <span
                    className="border-dotted border-gray-300 border-2 rounded-full text-xs"
                    style={{ marginLeft: "-20px" }}
                  >
                    <UserAddOutlined
                      className="h-5 w-5 text-gray-400 text-xs"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300 pl-3">
                    <CalendarOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300">
                    <FlagOutlined
                      className="h-5 w-7 pl-10 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              {subTaskOne === task.id ? (
                <div>
                  <SubTask parentTaskId={parentTaskId} />
                </div>
              ) : null}
            </div>
          ))}

          {/* toggle */}
          {addNewItem && (
            <div className="bg-white border border-sky-500  ml-5 flex  items-center">
              <div className="flex items-center w-10/12">
                {/* data and input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleTaskChange(e)}
                    placeholder="Click to add task"
                    className="outline-none border-0"
                  />
                </div>
              </div>
              {/* icons */}
              <div className="flex items-center space-x-1">
                <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
                  <UserAddOutlined
                    className="text-xs h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
                  <UserAddOutlined
                    className="text-xs h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="border-dotted border-gray-300 border-2 rounded-full text-xs font-semibold">
                  <UserAddOutlined
                    className="text-xs h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
                  <CalendarOutlined
                    className="text-xs h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="border-dotted border-gray-300 border-2 rounded-full text-xs">
                  <FlagOutlined
                    className="text-xs h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                <Button
                  buttonStyle="primary"
                  onClick={onSubmit}
                  // loading={loginMutation.status === 'loading'}
                  label="SAVE"
                  padding="py-3 px-4"
                  height="h-5"
                  width="w-15"
                  roundedLeft={false}
                  roundedRight={false}
                />
                <div onClick={() => setAddNewItem(!addNewItem)}>
                  <FaTimes className="text-xl text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          )}
          <div
            className=""
            id="newItem"
            onClick={() => setAddNewItem(!addNewItem)}
          >
            <p className="pl-2 text-xs  w-20 mt-1 cursor-pointer ml-10 font-semibold text-gray-400">
              + New Task
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RenderList;
