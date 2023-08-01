import React, { useState, useEffect } from 'react';
import { MdArrowRight } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import ToolTip from '../../../../../../../components/Tooltip/Tooltip';
import { useDispatch } from 'react-redux';
import { setUpdateStatusModalId } from '../../../../../../../features/task/taskSlice';
import { UseUpdateTaskStatusService2 } from '../../../../../../../features/task/taskService';

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

  const { mutate } = UseUpdateTaskStatusService2();

  const handleUpdateTaskStatus = () => {
    const updateStatusMutation = {
      task_id: Details?.id,
      statusDataUpdate: complete
    };
    mutate(updateStatusMutation);
  };

  const handleStatusModal = () => {
    dispatch(setUpdateStatusModalId(Details?.id));
    handleUpdateTaskStatus();
  };

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
        <ToolTip title="Current status">
          <button
            className={`p-2 bg-${statusBg}-300 text-black text-xs border-white rounded-l-md capitalize cursor-pointer object-contain h-8`}
            onClick={() => handleStatusModal()}
          >
            {handleStatusMessage(Details?.status)}
          </button>
        </ToolTip>
        <ToolTip title="Next status">
          <button className={`p-2 bg-${statusBg}-300 text-black text-xs rounded-r-md border-white h-8`}>
            <MdArrowRight />
          </button>
        </ToolTip>
      </div>
      <div>
        <ToolTip title="Set to complete">
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
