import React, { useState } from 'react';
import { MdArrowRight } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setUpdateStatusModalId } from '../../../../../../features/task/taskSlice';
import { UseUpdateTaskStatusService } from '../../../../../../features/task/taskService';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { IListDetails } from '../../../../../../features/list/list.interfaces';
import { IWalletDetails } from '../../../../../../features/wallet/wallet.interfaces';

interface StatusDetailsProps {
  details: IHubDetails | undefined | ITaskFullList | IListDetails | IWalletDetails;
}

export default function Status({ details }: StatusDetailsProps) {
  const dispatch = useAppDispatch();

  const [complete, setComplete] = useState('');
  // const [iconToggle, setIconToggle] = useState<{ arrow: boolean; check: boolean }>({
  //   arrow: false,
  //   check: false
  // });

  // const StatusData = details ? ('status' in details ? details?.status : null) : null;

  const { isSuccess } = UseUpdateTaskStatusService({
    task_id: details?.id as string,
    statusDataUpdate: complete
  });

  if (isSuccess) setComplete('');

  const handleStatusModal = () => {
    dispatch(setUpdateStatusModalId(details?.id || ''));
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

  return (
    <section className="flex items-center space-x-1">
      <div className="flex space-x-0.5">
        {details && 'status' in details ? (
          <ToolTip title="Current status">
            <button
              className="flex items-center object-contain h-6 p-2 text-xs text-white capitalize border-white rounded-md cursor-pointer w-fit"
              onClick={() => handleStatusModal()}
              style={{ backgroundColor: details?.status?.color }}
            >
              {handleStatusMessage(details?.status?.name)}
            </button>
          </ToolTip>
        ) : null}
        {details && 'status' in details ? (
          <ToolTip title="Next status">
            <button
              className="flex items-center justify-center w-6 h-6 text-xs text-white border-white rounded-md"
              style={{ backgroundColor: details?.status?.color }}
            >
              <MdArrowRight className="w-4 h-4" />
            </button>
          </ToolTip>
        ) : null}
      </div>
      <div>
        <ToolTip title="Set to complete">
          <button
            className="flex items-center justify-center w-6 h-6 text-xs border border-gray-300 rounded-md hover:border-green-300"
            onClick={() => setComplete('completed')}
          >
            <AiOutlineCheck className="hover:border-green-300" />
          </button>
        </ToolTip>
      </div>
    </section>
  );
}
