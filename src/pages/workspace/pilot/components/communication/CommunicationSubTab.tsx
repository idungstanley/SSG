import React from 'react';
import { AiOutlineContacts } from 'react-icons/ai';
import { MdDragIndicator, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiWechatLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import ToolTip from '../../../../../components/Tooltip';
import { setActiveSubCommunicationTabId } from '../../../../../features/workspace/workspaceSlice';

const communicationOptions = [
  {
    id: 0,
    label: 'email',
    icon: <MdOutlineMarkEmailUnread />,
  },
  { id: 1, label: 'chat', icon: <RiWechatLine /> },
  {
    id: 2,
    label: 'contact',
    icon: <AiOutlineContacts />,
  },
];
export default function CommunicationSubTab() {
  const { showPilot, activeSubCommunicationTabId } = useAppSelector(
    (state) => state.workspace
  );
  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    dispatch(setActiveSubCommunicationTabId(id));
  };
  return (
    <div
      className={`flex bg-gray-400 pt-0.5 ${
        showPilot ? 'flex-row' : 'flex-col border'
      }`}
    >
      {communicationOptions.map((item) => (
        <ToolTip tooltip={item.label} key={item.id}>
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubCommunicationTabId && showPilot
                ? 'rounded-t-lg bg-white'
                : ''
            }`}
          >
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
                item.id === activeSubCommunicationTabId &&
                showPilot &&
                'rounded-t-lg bg-white'
              } ${
                item.id != activeSubCommunicationTabId &&
                showPilot &&
                'rounded-b-lg bg-gray-400'
              }`}
            >
              <span
                className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? 'block' : 'hidden'
                }`}
              >
                <MdDragIndicator />
              </span>
              <span
                className={`${!showPilot && 'text-xs'} ${
                  item.id === activeSubCommunicationTabId &&
                  !showPilot &&
                  'bg-green-500 p-2 rounded'
                }`}
              >
                {item.icon}
              </span>
            </div>
          </section>
        </ToolTip>
      ))}
    </div>
  );
}
