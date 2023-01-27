import React from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  EyeIcon,
  InformationCircleIcon,
  LockClosedIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '../../../../../utils';

const tabs = [
  {
    id: 0,
    label: 'Details',
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
  {
    id: 1,
    label: 'Logs',
    icon: <ClockIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    label: 'Permissions',
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />,
  },
  {
    id: 4,
    label: 'Watchers',
    icon: <EyeIcon className="w-5 h-5" />,
  },
  {
    id: 5,
    label: 'Communication',
    icon: <SignalIcon className="w-5 h-5" />,
  },
];

interface NavProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

export default function Nav({ activeTabId, setActiveTabId }: NavProps) {
  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  return (
    <nav
      className="flex flex-wrap gap-1 w-full pb-5 border-b"
      aria-label="Tabs"
    >
      {tabs.map((tab) => (
        <span
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={classNames(
            tab.id === activeTabId
              ? 'bg-gray-100 text-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
            'flex cursor-pointer text-sm flex-grow items-center gap-2 px-3 py-2 fon justify-center border transition'
          )}
          aria-current={tab.id === activeTabId ? 'page' : undefined}
        >
          {tab.icon}
          {tab.label}
        </span>
      ))}
    </nav>
  );
}
