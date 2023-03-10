import React, { useState, useEffect } from 'react';
import { MdArrowRight } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import ToolTip from '../../../../../../../../../components/Tooltip';
import { useDispatch } from 'react-redux';
import { setUpdateStatusModalId } from '../../../../../../../../../features/task/taskSlice';
import { UseUpdateTaskStatusService } from '../../../../../../../../../features/task/taskService';

interface StatusDetailsProps {
  Details: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    status: string;
  };
}

export default function Status({ Details }: StatusDetailsProps) {
  const [statusBg, setStatusBg] = useState('');
  const [complete, setComplete] = useState('');
  const dispatch = useDispatch();
  const StatusData = Details?.status;

  const { status } = UseUpdateTaskStatusService({
    task_id: Details?.id,
    statusDataUpdate: complete
  });

  if (status == 'success') {
    setComplete('');
  }

  const handleStatusBg = () => {
    if (StatusData == 'todo') {
      setStatusBg('gray');
    } else if (StatusData == 'in progress') {
      setStatusBg('purple');
    } else if (StatusData == 'archived') {
      setStatusBg('yellow');
    } else if (StatusData == 'completed') {
      setStatusBg('green');
    } else {
      setStatusBg('gray');
    }
  };

  const handleStatusMessage = (status: string) => {
    if (status === 'new') {
      return 'todo';
    } else if (!status) {
      return 'todo';
    } else {
      return status;
    }
  };
  useEffect(() => {
    handleStatusBg();
  });

  return (
    <section className="flex items-center space-x-1">
      <div className="flex space-x-0.5">
        <ToolTip tooltip="Current status">
          <button
            className={`p-2 bg-${statusBg}-300 text-black text-xs border-white rounded-l-md capitalize cursor-pointer object-contain h-8`}
            onClick={() => dispatch(setUpdateStatusModalId(Details?.id || ''))}
          >
            {handleStatusMessage(Details?.status)}
          </button>
        </ToolTip>
        <ToolTip tooltip="Next status">
          <button className={`p-2 bg-${statusBg}-300 text-black text-xs rounded-r-md border-white h-8`}>
            <MdArrowRight />
          </button>
        </ToolTip>
      </div>
      <div>
        <ToolTip tooltip="Set to complete">
          <button
            className=" p-2 text-xs rounded-md border border-gray-300 hover:border-green-300"
            onClick={() => setComplete('completed')}
          >
            <AiOutlineCheck className="hover:border-green-300" />
          </button>
        </ToolTip>
      </div>
    </section>
  );
}
