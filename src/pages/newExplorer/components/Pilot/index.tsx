import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SideOver from '../../../../components/SideOver';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { SignalIcon } from '@heroicons/react/24/outline';

// const tabs = [
//   {
//     id: 0,
//     label: 'Communication',
//     icon: <SignalIcon className="w-6 h-6 text-gray-300 cursor-pointer" />,
//   },
// ];

export default function Pilot() {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowPilotSideOver({ show: false }));

  // const [activeTabId, setActiveTabId] = useState(0);

  return (
    <SideOver show={pilotSideOver.show} onClose={onClose} title="Pilot">
      <div></div>
      {/* <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={classNames(
              tab.current
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700',
              'px-3 py-2 font-medium text-sm rounded-md'
            )}
            aria-current={tab.current ? 'page' : undefined}
          >
            {tab.name}
          </a>
        ))}
      </nav> */}
    </SideOver>
  );
}
