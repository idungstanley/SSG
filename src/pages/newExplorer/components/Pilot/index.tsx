import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SideOver from '../../../../components/SideOver';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  EyeIcon,
  InformationCircleIcon,
  LockClosedIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '../../../../utils';

const tabs = [
  {
    id: 0,
    label: 'Communication',
    icon: <SignalIcon className="w-6 h-6 text-gray-300 cursor-pointer" />,
  },
  {
    id: 2,
    label: 'Logs',
    icon: <ClockIcon className="w-6 h-6 text-gray-300 cursor-pointer" />,
  },
  {
    id: 3,
    label: 'Permissions',
    icon: <LockClosedIcon className="w-6 h-6 text-gray-300 cursor-pointer" />,
  },
  {
    id: 4,
    label: 'Information',
    icon: (
      <InformationCircleIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
    ),
  },
  {
    id: 5,
    label: 'Watchers',
    icon: <EyeIcon className="w-6 h-6 text-gray-300 cursor-pointer" />,
  },
  {
    id: 6,
    label: 'Comments',
    icon: (
      <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
    ),
  },
];

export default function Pilot() {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowPilotSideOver({ show: false }));

  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <SideOver show={pilotSideOver.show} onClose={onClose} title="Pilot">
      {/* navigation */}
      <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
    </SideOver>
  );
}

interface NavProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

function Nav({ activeTabId, setActiveTabId }: NavProps) {
  return (
    <nav
      className="flex gap-4 flex-wrap w-full border-b pb-5"
      aria-label="Tabs"
    >
      {tabs.map((tab) => (
        <span
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          className={classNames(
            tab.id === activeTabId
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
            'px-3 py-2 font-medium text-sm rounded-md cursor-pointer flex flex-grow justify-center border transition'
          )}
          aria-current={tab.id === activeTabId ? 'page' : undefined}
        >
          {tab.label}
        </span>
      ))}
    </nav>
  );
}
