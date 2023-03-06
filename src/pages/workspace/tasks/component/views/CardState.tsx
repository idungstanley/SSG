import React from 'react';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { RiFootballFill } from 'react-icons/ri';
import { TbCheck } from 'react-icons/tb';
import { TfiCalendar } from 'react-icons/tfi';
import { VscEllipsis } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { ImyTaskData, setCurrentTaskPriorityId } from '../../../../../features/task/taskSlice';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import TagModal from '../../../../../components/tags/TagModal';
import { setCurrentTaskIdForTag } from '../../../../../features/workspace/tags/tagSlice';

interface TaskDataProps {
  task: ImyTaskData;
}

export default function CardState({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  const handleTaskPriority = (id: string) => {
    dispatch(setCurrentTaskPriorityId(id));
  };
  return (
    <div className="flex h-full items-center justify-between">
      <div className="flex items-center gap-1 text-gray-300 ">
        <span className=" text-x font-bold ">
          <TfiCalendar />
        </span>
        <span className=" text-xl cursor-pointer pt-1" onClick={() => handleTaskPriority(task.id as string)}>
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
        <span className="  text-xl" onClick={() => dispatch(setCurrentTaskIdForTag(task.id))}>
          <TagModal />
        </span>
        <span className="  text-xl">
          <IoPeopleOutline />
        </span>
        <span className="  text-xl">
          <RiFootballFill />
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <span className="  text-xl">
          <TbCheck />
        </span>
        <span className="  ">
          <MdOutlineRadioButtonUnchecked />
        </span>
        <span className="  text-xl">
          <VscEllipsis />
        </span>
      </div>
    </div>
  );
}
