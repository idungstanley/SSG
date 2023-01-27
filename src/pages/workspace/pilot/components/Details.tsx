import React, { useState } from 'react';
import { AiOutlineContacts, AiTwotoneEye } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdAddToPhotos, MdDragIndicator } from 'react-icons/md';
import { useAppSelector } from '../../../../app/hooks';
import SubDetails from './subDetails/subDetailsType/tasks/SubDetails';
import AddTo from './addTo/AddTo';
import DetailsIndex from './subDetails/DetailsIndex';
import { getOneTaskServices } from '../../../../features/task/taskService';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../features/list/listService';

const DetailOptions = [
  {
    id: 0,
    label: 'details',
    icon: <BiMessageAltDetail />,
    // element: <SubDetails />,
  },
  {
    id: 1,
    label: 'addTo',
    icon: <MdAddToPhotos />,
    // element: <AddTo />,
  },
];
export default function Details() {
  const { showPilot, activeItemId, activeItemType } = useAppSelector(
    (state) => state.workspace
  );
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const [activeId, setActiveId] = useState<number>(5);

  const { data: task } = getOneTaskServices({ task_id: currentTaskIdForPilot });
  const { data: hub } = UseGetHubDetails({
    activeItemId,
    activeItemType,
  });
  const { data: wallet } = UseGetWalletDetails({
    activeItemId,
    activeItemType,
  });
  const { data: list } = UseGetListDetails({
    activeItemId,
    activeItemType,
  });
  return (
    <section>
      <div className={`flex ${showPilot ? 'flex-row' : 'flex-col'}`}>
        {DetailOptions.map((item) => (
          <section className="flex flex-col w-full" key={item.id}>
            <div
              className="relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition border cursor-pointer group hover:text-gray-700 hover:bg-gray-50 border-y-2"
              onClick={() => setActiveId(item.id)}
            >
              <span
                className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? 'block' : 'hidden'
                }`}
              >
                <MdDragIndicator />
              </span>
              <span>{item.icon}</span>
            </div>
            {/* {activeId === item.id && (
              <div className="w-full">{item.element}</div>
            )} */}
          </section>
        ))}
      </div>
      <div className="w-full p-3">
        <DetailsIndex
          taskDetails={task?.data.task}
          hubDetails={hub?.data.hub}
          walletDetails={wallet?.data.wallet}
          listDetails={list?.data.list}
        />
      </div>
    </section>
  );
}
