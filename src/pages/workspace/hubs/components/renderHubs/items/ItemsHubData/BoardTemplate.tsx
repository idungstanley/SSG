import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import {
  ImyTaskData,
  setToggleAssignCurrentTaskId,
} from "../../../../../../../features/task/taskSlice";
import { useAppSelector } from "../../../../../../../app/hooks";
import { useDispatch } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import AssignTask from "../../../../../tasks/assignTask/AssignTask";
import { AvatarWithInitials } from "../../../../../../../components";

interface listIdprops {
  listId: string;
}
export default function BoardTemplate({ listId }: listIdprops) {
  const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);

  const dispatch = useDispatch();

  const { data } = getTaskListService({ listId });

  const products = data?.data.tasks;

  const groupBy = (key: string, arr) =>
    arr.reduce(
      (cache, product) => ({
        ...cache,
        [product[key]]:
          product[key] in cache
            ? cache[product[key]].concat(product)
            : [product],
      }),
      {}
    );

  const newData = groupBy("status", products);

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const groupAssignee = (
    data: [{ id: string; initials: string; colour: string }] | undefined
  ) => {
    return data?.map((newData) => (
      <div key={newData.id} className="">
        <span key={newData.id}>
          <AvatarWithInitials
            initials={newData.initials}
            backgroundColour={newData.colour}
            height="h-5"
            width="w-5"
          />
        </span>
      </div>
    ));
  };

  return (
    <>
      <div className=" dynamic gap-5  ">
        {Object.keys(newData).map((key) => {
          return (
            <>
              <div
                key={key}
                className="relative -mt-10 h-10 flex justify-center items-center shadow-md rounded w-56 bg-white p-3  "
              >
                <div className=" absolute top-0 rounded bg-gray-400 w-full h-1"></div>
                <h3 className="absolute left-0 pl-3 ">{key}</h3>
              </div>
              <div className="-ml-10 mt-5  ">
                {newData[key].map((items: ImyTaskData) => {
                  return (
                    <div
                      key={items.id}
                      className=" bg-white h-28 mt-3  shadow-md   w-56 p-2"
                      style={{ marginLeft: "-80px" }}
                    >
                      <div className="flex gap-5 justify-between ">
                        <p className="text-justify text-sm font-bold truncate">
                          {items.name.length > 70
                            ? items.name.slice(0, 80) + "..."
                            : items.name}
                        </p>
                        <div>
                          <span>
                            {items.assignees &&
                            (
                              items?.assignees as Array<{
                                id: string;
                                initials: string;
                                colour: string;
                              }>
                            ).length == 0 ? (
                              <>
                                <div
                                  onClick={() => handleAssigneeModal(items.id)}
                                >
                                  <UserAddOutlined
                                    className=" text-gray-400  cursor-pointer "
                                    aria-hidden="true"
                                  />
                                  <span className="absolute shadow-2xl  z-30 mt-5">
                                    {toggleAssignCurrentTaskId == items?.id ? (
                                      <AssignTask />
                                    ) : null}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  onClick={() => handleAssigneeModal(items.id)}
                                  className="cursor-pointer flex "
                                >
                                  {groupAssignee(items.assignees)}
                                  <span className="absolute shadow-2xl mt-10 z-30  ">
                                    {toggleAssignCurrentTaskId == items?.id ? (
                                      <AssignTask />
                                    ) : null}
                                  </span>
                                </div>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
