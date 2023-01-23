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
import { MdOutlineDragIndicator, MdDragIndicator } from "react-icons/md";
import { FaTimes, FaSort } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { CheckIcon } from "@heroicons/react/solid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Dropdown } from "../../../components";
import {
  createTaskService,
  getTaskListService,
} from "../../../features/task/taskService";
import { getListsDetailsService } from "../../../features/list/listService";
import SubTask from "../subtasks/subtask1/SubTask";
// import RenderTaskModal from '../../tasks/ccomponent/RenderTaskModal';
import ListNav from "./components/renderlist/ListNav";
import addColumns from "./components/renderlist/listDetails/listDetails";
import { useAppSelector } from "../../../app/hooks";
import AddColumnDropdown from "../tasks/dropdown/AddColumnDropdown";
import { useDispatch } from "react-redux";
import { setCurrentTaskId } from "../../../features/task/taskSlice";
import TaskMenu from "../tasks/component/taskMenu/TaskMenu";

function RenderList() {
  const dispatch = useDispatch();
  const [addNewItem, setAddNewItem] = useState(false);
  const [parentTaskId, setParentTaskId] = useState("");
  const [subTaskOne, setSubTaskOne] = useState<boolean | string>(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const { listId } = useParams();
  const queryClient = useQueryClient();
  const { myTaskData } = useAppSelector((state) => state.task);

  console.log("myTaskData", myTaskData);

  const createTask = useMutation(createTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries("createtask" as any);
      setAddNewItem(!addNewItem);
    },
  });

  const { data: listChildrenData } = getTaskListService({ listId });

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
  const [dropDown, setdropDown] = useState(false);

  const handleDropDown = () => {
    console.log(dropDown);

    setdropDown((prev) => !prev);
  };

  const [close, setClose] = useState(true);
  const handleClose = () => {
    setClose((prev) => !prev);
  };

  const { current_task_id } = useAppSelector((state) => state.task);
  console.log(current_task_id);

  const [nav, setNav] = useState(false);
  const displayNav: any = (id) => {
    setNav((prev) => !prev);
    dispatch(setCurrentTaskId(id));
    console.log(id);
  };

  // {dropDown ? (<>
  // <div></div>
  // </>) : null}
  const navigate = useNavigate();
  const handleTaskModal = (id: string) => {
    setOpenTaskModal(true);
    navigate(`/workspace/t/${id}`);
  };

  return (
    <div
      className="h-screen overflow-hidden relative"
      style={{ backgroundColor: "#eee" }}
    >
      {nav && (
        <span className="transition	duration-300 ease-in-out absolute w-full">
          <TaskMenu />
        </span>
      )}
      <section id="nav">
        <ListNav
          navName={listDetailsData?.data?.list?.name}
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="mt-3 p-3">
        <div
          className=" block p-2 border-2 border-gray-200"
          style={{ backgroundColor: "#eee" }}
        >
          <div id="listTitle" className="flex justify-between items-center">
            <div className="flex items-center justify-center space-x-2 text-gray-400 group">
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
              <p className="text-xs hover:bg-gray-200 hover:text-gray-500 cursor-pointer transition-all ease-in-out		">
                {" "}
                + New Task
                {/* <span onClick={() => handleNewTask()}></span> */}
              </p>
              <p className="opacity-0 group-hover:opacity-100 hover:bg-gray-300 hover:text-gray-500 border-gray-700 p-1 cursor-pointer text-xs transition-all	ease-in-out	">
                Add Description
              </p>
              <p className="opacity-0 group-hover:opacity-100 hover:bg-gray-300 hover:text-gray-500 border-gray-700 p-1 cursor-pointer text-xs transition-all	ease-in-out	">
                Add Comment
              </p>
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
            <div className="inline-flex justify-center items-center w-full p-3 opacity-0 hover:opacity-100">
              <hr className="my-8 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
              <span
                className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 dark:text-white dark:bg-gray-900 hover:text-blue-700 cursor-pointer text-xs"
                style={{ backgroundColor: "#eee" }}
              >
                Add New Status
              </span>
            </div>
          </section>
          {/* card */}
          <div className=" flex  items-center  ">
            <div className=" flex w-6/12 items-center gap-2 shrink-0">
              <span className="bg-gray-200 hover:bg-gray-400 rounded-full p-px mt-1">
                <FiArrowDownCircle
                  className={`text-gray-400 text-sm hover:text-gray-200  ${
                    close === false && "rotateimg90"
                  }`}
                  aria-hidden="true"
                  onClick={() => handleClose()}
                />
              </span>
              <div className="flex items-center justify-center cursor-pointer relative">
                <div className="group flex items-center">
                  <span className="text-xs text-black p-1 bg-gray-300 pr-2">
                    OPEN
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-1	ml-1">
                  {myTaskData?.length}
                </span>

                <span className="text-xs text-gray-400 mt-1	">TASK</span>
              </div>
            </div>
            <div className="flex items-center w-6/12">
              <p className=" flex justify-start items-center h-5  text-gray-400 text-xs  rounded-full font-semibold hover:bg-gray-400 hover:text-gray-50 group">
                <span className="opacity-0 group-hover:opacity-100">
                  <MdOutlineDragIndicator />
                </span>
                <span>USER</span>
                <span className="opacity-0 group-hover:opacity-100">
                  <FaSort />
                </span>
              </p>
              <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
                <span className="opacity-0 group-hover:opacity-100">
                  <MdOutlineDragIndicator />
                </span>
                <span>DUE DATE</span>
                <span className="opacity-0 group-hover:opacity-100">
                  <FaSort />
                </span>
              </p>
              <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
                <span className="opacity-0 group-hover:opacity-100">
                  <MdOutlineDragIndicator />
                </span>
                <span>PRIORITY</span>
                <span className="opacity-0 group-hover:opacity-100">
                  <FaSort />
                </span>
              </p>
              <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
                <span className="opacity-0 group-hover:opacity-100">
                  <MdOutlineDragIndicator />
                </span>
                <span>CREATED AT</span>
                <span className="opacity-0 group-hover:opacity-100">
                  <FaSort />
                </span>
              </p>
              <span
                className=" flex relative items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold group"
                onClick={() => handleDropDown()}
              >
                <FiPlusCircle className="font-black	" />
                <span className="text-sm">
                  {dropDown && (
                    <AddColumnDropdown title="" listItems={addColumns} />
                  )}
                </span>
              </span>
            </div>
          </div>

          {myTaskData?.map((task, i) => (
            <div key={task.id}>
              {close && (
                <div className="group relative bg-white border border-gray-100 hover:bg-gray-100  flex  items-center ml-6 pl-3 	">
                  <span
                    className="flex items-center absolute  "
                    style={{ left: "-30px" }}
                  >
                    <input
                      type="checkbox"
                      className="opacity-0 transition duration-200 group-hover:opacity-100 cursor-pointer"
                      onClick={(e) => displayNav(task.id)}
                    />
                    <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move	  " />
                  </span>

                  <RiCheckboxBlankFill
                    className=" text-gray-400 text-xs"
                    aria-hidden="true"
                  />
                  <div className="flex items-center w-6/12 group">
                    {/* data and input */}
                    <div onClick={() => handleTaskModal(task.id)}>
                      {/* {i == 0 && <h1>Tasks</h1>} */}

                      <p className="capitalize text-xs font-semibold leading-8 pl-5	">
                        {task.name}
                      </p>
                    </div>

                    {/* iconstask */}
                    <div
                      id="iconWrapper"
                      className="flex items-start pt-1 space-x-1 ml-1 opacity-0  group-hover:opacity-100"
                    >
                      <PlusOutlined
                        className="cursor-pointer flex-shrink-0 text-xs h-6 w-6 text-black"
                        aria-hidden="true"
                        onClick={() => handleSubTask(task.id)}
                      />
                      <EditOutlined
                        className="cursor-pointer flex-shrink-0 text-xs h-4 w-4 text-black"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  {/* icons */}

                  <div className="flex  space-x-10">
                    <span className=" rounded-full text-xs text-center">
                      <UserAddOutlined
                        className="h-5 w-5 text-gray-400 text-xl "
                        aria-hidden="true"
                      />
                    </span>
                    <span className="border-dotted border-gray-300 pl-3 ml-5">
                      <CalendarOutlined
                        className="h-5 w-7 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="border-dotted border-gray-300 ml-5">
                      <FlagOutlined
                        className="h-5 w-7  text-gray-400 ml-8"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              )}
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
                    className=" border-transparent focus:border-transparent focus:ring-0"
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
