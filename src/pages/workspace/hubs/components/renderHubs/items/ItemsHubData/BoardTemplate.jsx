import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { getTaskListService } from '../../../../../../../features/task/taskService';
import { setToggleAssignCurrentTaskId } from '../../../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import AssignTask from '../../../../../tasks/assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../../../components';
import CardState from '../../../../../tasks/component/views/CardState';
import { IoChevronBackOutline } from 'react-icons/io5';
import { VscEllipsis } from 'react-icons/vsc';
import { BsPlus } from 'react-icons/bs';
import { UserPlusIcon } from '@heroicons/react/24/solid';

// interface listIdprops {
//   listId: string;
// }
export default function BoardTemplate({ listId }) {
  const {
    toggleAssignCurrentTaskId,
    CompactView,
    CompactViewWrap,
  } = useAppSelector((state) => state.task);

  const dispatch = useDispatch();

  const { data } = getTaskListService({ listId });

  const products = data?.data.tasks;

  const groupBy = (key, arr) =>
    arr.reduce(
      (cache, product) => ({
        ...cache,
        [product[key]]:
          product[key] in cache
            ? cache[product[key]].concat(product)
            : [product],
      }),
      {},
    );

  const newData = groupBy('status', products);

  const handleAssigneeModal = (id) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const groupAssignee = (data) => {
    return data?.length >= 3 ? (
      <div className="flex items-center justify-center">
        {data?.slice(0, 2).map((newData) => (
          <div key={newData.id} className="">
            <span
              key={newData.id}
              className="flex items-center gap-1 justify center"
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
          {data?.length - 2 !== 0 ? <span>+{data?.length - 2}</span> : null}
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

  const [icons, setIcons] = useState(null);

  return (
    <>
      <div className="gap-5 dynamic">
        {Object.keys(newData).map((key) => {
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
                  <div
                    className="absolute top-0 w-full h-1 rounded-t-lg "
                    style={{ backgroundColor: '#7c3bed' }}
                  ></div>
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
              <div className="mt-5 -ml-10 oveflow-y-auto">
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
                          {items.name.length > 70
                            ? items.name.slice(0, 70) + '...'
                            : items.name}
                        </p>
                        <div>
                          <span>
                            {items.assignees &&
                            (items?.assignees).length == 0 ? (
                              <>
                                <div
                                  onClick={() => handleAssigneeModal(items.id)}
                                >
                                  <UserPlusIcon
                                    className="text-gray-400 cursor-pointer "
                                    aria-hidden="true"
                                  />
                                  <span className="absolute z-30 mt-5 shadow-2xl">
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
                                  className="flex cursor-pointer "
                                >
                                  {groupAssignee(items.assignees)}
                                  <span className="absolute z-30 mt-10 shadow-2xl ">
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
                          className="absolute bottom-0 pb-1 mt-1 text-gray-400 uppercase "
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

BoardTemplate.propTypes = {
  listId: PropTypes.string,
};
