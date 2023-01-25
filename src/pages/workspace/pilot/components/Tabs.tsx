import React from 'react';
import communicationIcon from '../../../../assets/branding/communication.png';
import logsIcon from '../../../../assets/branding/logs.png';
import detailIcon from '../../../../assets/branding/detail.png';
import automationIcon from '../../../../assets/branding/automation.png';
import propertiesIcon from '../../../../assets/branding/properties-icon.png';
import permissionIcon from '../../../../assets/branding/permission.png';
import { classNames } from '../../../../utils';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
const pilotOptions = [
  {
    id: 0,
    name: 'communication',
    source: communicationIcon,
  },
  {
    id: 1,
    name: 'Logs',
    source: logsIcon,
  },
  {
    id: 2,
    name: 'Permissions',
    source: permissionIcon,
  },
  {
    id: 3,
    name: 'Properties',
    source: propertiesIcon,
  },
  {
    id: 4,
    name: 'Details',
    source: detailIcon,
  },
  {
    id: 5,
    name: 'Automation',
    source: automationIcon,
  },
];

interface TabProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}
function Tab({ activeTabId, setActiveTabId }: TabProps) {
  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };
  return (
    <div className="gap-4 pb-1 border w-96" aria-label="Tabs">
      <div className="flex items-center h-8 px-2">
        <HiChevronDoubleRight />
        <BsThreeDotsVertical />
      </div>
      <div className="flex flex-wrap divide-x">
        {pilotOptions.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={classNames(
              item.id === activeTabId
                ? 'bg-gray-300 text-black'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              'px-3 relative py-2 font-medium h-fit gap-2 flex-grow cursor-pointer flex justify-center border-y-2 border transition'
            )}
            aria-current={item.id === activeTabId ? 'page' : undefined}
          >
            {item.id === activeTabId && (
              <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
            )}
            <img src={item.source} alt="" className="w-4 h-4" />
            <p className="text-xs">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tab;
