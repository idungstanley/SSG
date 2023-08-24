import React, { useState, useEffect } from 'react';
import { MdArrowRight } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setUpdateStatusModalId } from '../../../../../../features/task/taskSlice';
import { UseUpdateTaskStatusService2 } from '../../../../../../features/task/taskService';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { IListDetails } from '../../../../../../features/list/list.interfaces';
import { IWalletDetails } from '../../../../../../features/wallet/wallet.interfaces';

interface StatusDetailsProps {
  details: IHubDetails | undefined | ITaskFullList | IListDetails | IWalletDetails;
}

export default function Status({ details }: StatusDetailsProps) {
  const [statusBg, setStatusBg] = useState('');
  const [complete, setComplete] = useState('');
  const [iconToggle, setIconToggle] = useState<{ arrow: boolean; check: boolean }>({
    arrow: false,
    check: false
  });
  const dispatch = useAppDispatch();
  const StatusData = details ? ('status' in details ? details?.status : null) : null;

  // const { status } = UseUpdateTaskStatusService({
  //   task_id: Details?.id,
  //   statusDataUpdate: complete
  // });

  // if (status == 'success') {
  //   setComplete('');
  // }

  const { mutate } = UseUpdateTaskStatusService2();

  const handleUpdateTaskStatus = () => {
    const updateStatusMutation = {
      task_id: details?.id,
      statusDataUpdate: complete
    };
    mutate(updateStatusMutation);
  };

  const handleStatusModal = () => {
    dispatch(setUpdateStatusModalId(details?.id || ''));
    handleUpdateTaskStatus();
  };

  const handleStatusBg = () => {
    const statusName = StatusData?.name;

    if (statusName == 'to do') {
      setStatusBg('gray');
    } else if (statusName == 'in progress') {
      setStatusBg('purple');
    } else if (statusName == 'archived') {
      setStatusBg('yellow');
    } else if (statusName == 'completed') {
      setStatusBg('green');
    } else {
      setStatusBg('gray');
    }
  };

  const handleStatusMessage = (status: string | null | undefined) => {
    if (status === 'new') {
      return 'to do';
    } else if (!status) {
      return 'to do';
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
        {details && 'status' in details ? (
          <ToolTip title="Current status">
            <button
              className={`p-2 bg-${statusBg}-300 text-black text-xs border-white rounded-l-md capitalize cursor-pointer object-contain h-8`}
              onClick={() => handleStatusModal()}
            >
              {handleStatusMessage(details.status.name)}
            </button>
          </ToolTip>
        ) : null}
        <ToolTip title="Next status">
          <button className={`p-2 bg-${statusBg}-300 text-black text-xs rounded-r-md border-white h-8`}>
            <div
              onMouseEnter={() => setIconToggle((prev) => ({ ...prev, arrow: true }))}
              onMouseLeave={() => setIconToggle((prev) => ({ ...prev, arrow: false }))}
            >
              <MdArrowRight
                className={iconToggle.arrow ? 'text-alsoit-purple-300 w-4 h-4' : 'text-alsoit-gray-200 w-4 h-4'}
              />
            </div>
          </button>
        </ToolTip>
      </div>
      <div>
        <ToolTip title="Set to complete">
          <button
            className="p-2 text-xs border border-gray-300 rounded-md hover:border-green-300"
            onClick={() => setComplete('completed')}
          >
            <AiOutlineCheck className="hover:border-green-300" />
          </button>
        </ToolTip>
      </div>
    </section>
  );
}
