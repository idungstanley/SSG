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
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setShowPilot } from '../../../../features/workspace/workspaceSlice';
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
  const dispatch = useDispatch();
  const { showPilot } = useAppSelector((state) => state.workspace);
  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };
  const handleShowPilot = () => {
    if (showPilot) {
      dispatch(setShowPilot(false));
    } else {
      dispatch(setShowPilot(true));
    }
  };
  return (
    <div
      className={`gap-4 pb-1  ${
        showPilot ? 'w-96 border' : 'w-12'
      }`}
      aria-label="Tabs"
    >
      <div
        className={`flex items-center h-fit px-2 ${
          showPilot ? 'flex-row py-2' : 'flex-col gap-1'
        }`}
      >
        <HiChevronDoubleRight
          onClick={() => handleShowPilot()}
          className={`cursor-pointer ${
            showPilot ? '-rotate-180 translate-x-4 skew-y-3' : 'mb-1'
          }`}
        />
        <BsThreeDotsVertical />
      </div>
      <div
        className={`flex flex-wrap divide-x ${
          showPilot ? 'flex-row' : 'flex-col'
        }`}
      >
        {pilotOptions.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={classNames(
              item.id === activeTabId
                ? 'bg-gray-300 text-black'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              showPilot ? 'border-y-2 border gap-2' : 'py-3',
              'px-3 relative py-2 font-medium h-fit  flex-grow cursor-pointer flex justify-center transition'
            )}
            aria-current={item.id === activeTabId ? 'page' : undefined}
          >
            {item.id === activeTabId && (
              <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
            )}
            <img src={item.source} alt="" className="w-4 h-4" />
            <p className={`text-xs ${showPilot ? 'block' : 'hidden'}`}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tab;
