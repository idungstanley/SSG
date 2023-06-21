/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { IoChevronBackOutline } from 'react-icons/io5';
import { VscEllipsis } from 'react-icons/vsc';
import { BsPlus } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { ImyTaskData, setToggleAssignCurrentTaskId } from '../../../../../../features/task/taskSlice';
import CardState from '../CardState';
import AssignTask from '../../../assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../../components';
import { RiUserAddLine } from 'react-icons/ri';
import { TaskDataProps } from '../../taskData/TaskData';
import { TaskKeyof } from '../../../../../../features/task/interface.tasks';

function Board({ tasks }: TaskDataProps) {
  const dispatch = useDispatch();
  const { toggleAssignCurrentTaskId, CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  // type GroupedData = {
  //   [key: string]: ImyTaskData[];
  // };
  // const groupBy = (key: TaskKeyof, arr: ImyTaskData[]): GroupedData =>
  //   arr.reduce((cache: GroupedData, product) => {
  //     const cacheKey = product[key as TaskKeyof];
  //     if (!cacheKey) {
  //       return cache;
  //     }
  //     return { ...cache, [cacheKey]: cacheKey in cache ? cache[cacheKey].concat(product) : [product] };
  //   }, {} as GroupedData);

  const newData = tasks;

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const groupAssignee = (data: [{ id: string; initials: string; colour: string }] | undefined) => {
    return (data as [{ id: string; initials: string; colour: string }])?.length >= 3 ? (
      <div className="flex items-center justify-center ">
        {data?.slice(0, 2).map((newData) => (
          <div key={newData.id} className="">
            <span key={newData.id} className="flex items-center gap-1 justify center">
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
          {(data as [{ id: string; initials: string; colour: string }])?.length - 2 !== 0 ? (
            <span>+{(data as [{ id: string; initials: string; colour: string }])?.length - 2}</span>
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
  // const [icons, setIcons] = useState('');
  return (
    <div className="gap-5 pl-5 dynamic pt-14">
      {newData &&
        Object.keys(newData).map((key) => {
          return (
            <>
              <div
                key={key}
                className="relative flex items-center justify-center w-56 h-10 p-3 -mt-10 font-bold uppercase bg-white rounded shadow-md group "
                style={{ fontSize: '12px' }}
              >
                {key === 'new' ? (
                  <div className="absolute top-0 w-full h-1 bg-blue-400 rounded-t-lg "></div>
                ) : key === 'in progress' ? (
                  <div className="absolute top-0 w-full h-1 rounded-t-lg " style={{ backgroundColor: '#7c3bed' }}></div>
                ) : key === 'completed' ? (
                  <div className="absolute top-0 w-full h-1 bg-green-400 rounded-t-lg "></div>
                ) : key === 'archived' ? (
                  <div className="absolute top-0 w-full h-1 bg-yellow-400 rounded-t-lg "></div>
                ) : (
                  <div className="absolute top-0 w-full h-1 bg-gray-400 rounded-t-lg "></div>
                )}
                <h3 className="absolute left-0 pl-3 ">{key}</h3>
                <div className="absolute right-0 flex items-center gap-2 pr-3 text-sm font-bold">
                  <span className="bg-gray-200 rounded opacity-0 cursor-pointer group-hover:opacity-100">
                    <IoChevronBackOutline />
                  </span>
                  <span className="opacity-0 cursor-pointer group-hover:opacity-100">
                    <VscEllipsis />
                  </span>
                  <span className="opacity-0 cursor-pointer group-hover:opacity-100">
                    <BsPlus />
                  </span>
                </div>
              </div>
              {/* <div className="mt-5 -ml-10 oveflow-y-auto">
                {newData[key].map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="relative w-56 p-2 mt-3 bg-white shadow-md "
                      style={{ marginLeft: '-80px' }}
                      onMouseEnter={() => setIcons(items.id)}
                    >
                      <div className="flex justify-between gap-5 ">
                        <p className="pb-2 text-sm font-bold">
                          {items.name.length > 70 ? items.name.slice(0, 70) + '...' : items.name}
                        </p>
                        <div>
                          <span>
                            {items.assignees && (items?.assignees).length < 1 ? (
                              <>
                                <div onClick={() => handleAssigneeModal(items.id)}>
                                  <RiUserAddLine className="text-gray-400 cursor-pointer " aria-hidden="true" />
                                  <span className="absolute z-30 mt-5 shadow-2xl">
                                    {toggleAssignCurrentTaskId == items?.id ? <AssignTask /> : null}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div onClick={() => handleAssigneeModal(items.id)} className="flex cursor-pointer ">
                                  {groupAssignee(items.assignees)}
                                  <span className="absolute z-30 mt-10 shadow-2xl ">
                                    {toggleAssignCurrentTaskId == items?.id ? <AssignTask /> : null}
                                  </span>
                                </div>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="py-2">{icons == items.id && <CardState task={items} />}</div>
                      <span className="pt-10">
                        <p
                          className="absolute bottom-0 pb-1 mt-1 text-gray-400 uppercase "
                          style={{ fontSize: '11px' }}
                        >
                          + add new task
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div> */}
            </>
          );
        })}
    </div>
  );
}

export default Board;
