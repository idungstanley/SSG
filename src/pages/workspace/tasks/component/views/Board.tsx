import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { IoChevronBackOutline } from 'react-icons/io5';
import { VscEllipsis } from 'react-icons/vsc';
import { BsPlus } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setToggleAssignCurrentTaskId } from '../../../../../features/task/taskSlice';
import { TbSubtask } from 'react-icons/tb';
import CardState from './CardState';
import AssignTask from '../../assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../components';
import { UserPlusIcon } from '@heroicons/react/24/outline';

function Board() {
  const dispatch = useDispatch();
  const { myTaskData, toggleAssignCurrentTaskId } = useAppSelector(
    (state) => state.task
  );

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

  const [icons, setIcons] = useState<string | null>(null);

  return (
    <div className="m-auto fgoverflow">
      <div className="flex gap-7 ">
        {myTaskData.map((task) => (
          <div key={task.id} className="rounded " style={{ width: 'auto' }}>
            <div className="w-64 h-1 bg-gray-400 rounded-t-sm "></div>
            <div className="flex items-center justify-between w-64 h-10 p-2 bg-white rounded shadow-md group boardGrab">
              <div className="flex items-center gap-2 ">
                <h3 className="text-xs font-bold uppercase ">{task.status}</h3>
                <span className="w-5 text-center border-2 rounded-full">
                  <p className="text-xs font-bold "> 1</p>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
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
            </div>
            <div
              className="w-64 p-3 mt-10 bg-white rounded shadow-md group"
              onMouseEnter={() => setIcons(task.id)}
              onMouseLeave={() => setIcons(task.id)}
            >
              <p className="text-xs font-bold">
                {/* task {">"} lists {">"} stanlists */}
                lists / tasks
              </p>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-sm font-bold capitalize">{task.name}</h3>
                <span>
                  {task.assignees &&
                  (
                    task?.assignees as Array<{
                      id: string;
                      initials: string;
                      colour: string;
                    }>
                  ).length == 0 ? (
                    <>
                      <div onClick={() => handleAssigneeModal(task.id)}>
                        <UserPlusIcon
                          className="text-gray-400 cursor-pointer "
                          aria-hidden="true"
                        />
                        <span className="absolute z-30 shadow-2xl ">
                          {toggleAssignCurrentTaskId == task?.id ? (
                            <AssignTask />
                          ) : null}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => handleAssigneeModal(task.id)}
                        className="flex cursor-pointer "
                      >
                        {groupAssignee(task.assignees)}
                        <span className="absolute z-30 shadow-2xl ">
                          {toggleAssignCurrentTaskId == task?.id ? (
                            <AssignTask />
                          ) : null}
                        </span>
                      </div>
                    </>
                  )}
                </span>
              </div>
              <div>
                <div className="text-xl text-gray-300 opacity-0 group-hover:opacity-100">
                  <TbSubtask />
                </div>
              </div>
              {icons == task.id && <CardState task={task} />}
              <span>
                <p className="mt-3 text-xs font-bold uppercase color-gray">
                  + add subtask
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
