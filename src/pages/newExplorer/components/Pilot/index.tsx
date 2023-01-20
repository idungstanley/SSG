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
import {
  useGetExplorerFileOrFolder,
} from '../../../../features/explorer/explorerService';
import { OutputDateTime } from '../../../../app/helpers';

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

const sections = [
  {
    id: 0,
    element: <div></div>,
  },
  {
    id: 1,
    element: <div></div>,
  },
  {
    id: 2,
    element: <div></div>,
  },
  {
    id: 3,
    element: <div></div>,
  },
  {
    id: 4,
    element: <Information />,
  },
  {
    id: 5,
    element: <div></div>,
  },
  {
    id: 6,
    element: <div></div>,
  },
];

export default function Pilot() {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => {
    setActiveTabId(0);
    dispatch(setShowPilotSideOver({ show: false }));
  };

  const [activeTabId, setActiveTabId] = useState(0);

  const selectedSection = sections.find(
    (section) => section.id === activeTabId
  );

  return (
    <SideOver
      show={pilotSideOver.show}
      onClose={onClose}
      title="Pilot"
      disableGapForChildren
    >
      {/* navigation */}
      <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

      {/* main section depends of active tab */}
      {selectedSection ? selectedSection.element : null}
    </SideOver>
  );
}

function Information() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  const { data } = useGetExplorerFileOrFolder(type, id);

  const info = [
    {
      key: 'Last modified at',
      value: data && OutputDateTime(data.updated_at),
    },
    {
      key: 'Created at',
      value: data && OutputDateTime(data.created_at),
    },
  ];

  return (
    <div>
      {data ? (
        <div className="flex border-b flex-col justify-center text-sm font-medium divide-y divide-gray-200">
          {info.map((item) => (
            <div key={item.key} className="flex py-3 justify-between">
              <p className="text-gray-500">{item.key}</p>
              <span className="text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      ) : null}
      {/* {item.shared_by ? (
          <>
            <h3 className="py-2 font-medium text-gray-900">Shared by</h3>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">User name</dt>
              <dd className="text-gray-900">{item.shared_by.user.name}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">User email</dt>
              <dd className="text-gray-900">{item.shared_by.user.email}</dd>
            </div>
          </>
        ) : null} */}
    </div>
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
