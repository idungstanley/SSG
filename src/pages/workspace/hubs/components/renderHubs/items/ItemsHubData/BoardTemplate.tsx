import React, { useState } from 'react';
import { getTaskListService } from '../../../../../../../features/task/taskService';
import {
  ImyTaskData,
  setToggleAssignCurrentTaskId,
} from '../../../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';
import AssignTask from '../../../../../tasks/assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../../../components';
import CardState from '../../../../../tasks/component/views/CardState';
import { IoChevronBackOutline } from 'react-icons/io5';
import { VscEllipsis } from 'react-icons/vsc';
import { BsPlus } from 'react-icons/bs';

interface listIdprops {
  listId: string;
}
export default function BoardTemplate({ listId }: listIdprops) {
  const { toggleAssignCurrentTaskId, CompactView, CompactViewWrap } =
    useAppSelector((state) => state.task);

  const dispatch = useDispatch();

  const { data } = getTaskListService({ listId });

  const products: ImyTaskData[] = data?.data.tasks;

  const groupBy = (key: string, arr: ImyTaskData[]) =>
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

  const newData = groupBy('status', products);

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
    return (data as [{ id: string; initials: string; colour: string }])
      ?.length >= 3 ? (
      <div className="flex items-center justify-center">
        {data?.slice(0, 2).map((newData) => (
          <div key={newData.id} className="">
            <span
              key={newData.id}
              className="flex gap-1 items-center justify center"
            >
              <AvatarWithInitials
                initials={newData.initials}
                backgroundColour={newData.colour}
                height={`${CompactView || CompactViewWrap ? 'h-4' : 'h-5'}`}
                width={`${CompactView || CompactViewWrap ? 'w-4' : 'w-5'}`}
              />
            </span>
          </div>
        ))}
        <span>
          {(data as [{ id: string; initials: string; colour: string }])
            ?.length -
            2 !==
          0 ? (
            <span>
              +
              {(data as [{ id: string; initials: string; colour: string }])
                ?.length - 2}
            </span>
          ) : null}
        </span>
      </div>
    ) : (
      data?.map((newData) => (
        <div key={newData.id} className="flex">
          <span key={newData.id}>
            <AvatarWithInitials
              initials={newData.initials}
              backgroundColour={newData.colour}
              height={`${CompactView ? 'h-4' : 'h-5'}`}
              width={`${CompactView ? 'w-4' : 'w-5'}`}
            />
          </span>
        </div>
      ))
    );
  };

  const [icons, setIcons] = useState<string | null>(null);

  return (
    <>
      <div className=" dynamic gap-5  ">
        {Object.keys(newData).map((key) => {
          return (
            <>
              <div
                key={key}
                className="relative -mt-10 h-10 flex justify-center items-center shadow-md rounded w-56 bg-white uppercase p-3 font-bold group "
                style={{ fontSize: '12px' }}
              >
                {key === 'new' ? (
                  <div className=" absolute top-0 rounded-t-lg	 bg-blue-400 w-full h-1"></div>
                ) : key === 'in progress' ? (
                  <div
                    className=" absolute top-0 rounded-t-lg w-full h-1"
                    style={{ backgroundColor: '#7c3bed' }}
                  ></div>
                ) : key === 'completed' ? (
                  <div className=" absolute top-0 rounded-t-lg bg-green-400 w-full h-1"></div>
                ) : key === 'archived' ? (
                  <div className=" absolute top-0 rounded-t-lg bg-yellow-400 w-full h-1"></div>
                ) : (
                  <div className=" absolute top-0 rounded-t-lg bg-gray-400 w-full h-1"></div>
                )}
                <h3 className="absolute left-0 pl-3  ">{key}</h3>
                <div className="flex absolute right-0 pr-3 items-center gap-2 text-sm font-bold">
                  <span className="opacity-0 group-hover:opacity-100 bg-gray-200 rounded cursor-pointer">
                    <IoChevronBackOutline />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
                    <VscEllipsis />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
                    <BsPlus />
                  </span>
                </div>
              </div>
              <div className="-ml-10 mt-5 oveflow-y-auto">
                {newData[key].map((items: ImyTaskData) => {
                  return (
                    <div
                      key={items.id}
                      className=" bg-white  mt-3  shadow-md   w-56 p-2 relative"
                      style={{ marginLeft: '-80px' }}
                      onMouseEnter={() => setIcons(items.id)}
                    >
                      <div className="flex gap-5 justify-between ">
                        <p className="text-sm font-bold  pb-2">
                          {items.name.length > 70
                            ? items.name.slice(0, 70) + '...'
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
                      <div className="py-2">
                        {icons == items.id && <CardState task={items} />}
                      </div>
                      <span className="pt-10">
                        <p
                          className="absolute bottom-0  uppercase text-gray-400 mt-1 pb-1 "
                          style={{ fontSize: '11px' }}
                        >
                          + add new task
                        </p>
                      </span>
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
