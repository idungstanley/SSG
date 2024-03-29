import { useState } from 'react';
import communicationIcon from '../../../../assets/branding/communication.png';
import automationIcon from '../../../../assets/branding/automation.png';
import compactArrowIcon from '../../../../assets/branding/compact-arrow.png';
import listIcon from '../../../../assets/branding/icon-and-list-arrow.png';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  setShowAddHotKeyDropdown,
  setShowPilot,
  setShowPilotIconView,
  setShowRemoveHotKeyDropdown
} from '../../../../features/workspace/workspaceSlice';
import { SiHotjar } from 'react-icons/si';
import { IoMdRemoveCircle } from 'react-icons/io';
import DetailsSubTab from './details/DetailsSubTab';
import CommunicationSubTab from './communication/CommunicationSubTab';
import TabDrag from './TabDrags';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Dropdown from '../../../../components/Dropdown';
import { MdAppRegistration, MdSecurity } from 'react-icons/md';
import { GiChecklist } from 'react-icons/gi';
import { BiDetail } from 'react-icons/bi';
import { pilotTabs } from '../../../../app/constants/pilotTabs';

export const pilotOptions = [
  {
    id: pilotTabs.CONNECT,
    name: 'Connect',
    source: communicationIcon,
    subTab: <CommunicationSubTab />,
    isVisible: false
  },
  {
    id: pilotTabs.LOGS,
    name: 'Logs',
    icon: <MdAppRegistration />,
    isVisible: false
  },
  {
    id: pilotTabs.PERMISSIONS,
    name: 'Permissions',
    icon: <MdSecurity />,
    isVisible: false
  },

  {
    id: pilotTabs.DETAILS,
    name: 'Details',
    icon: <BiDetail />,
    subTab: <DetailsSubTab />,
    isVisible: false
  },
  {
    id: pilotTabs.AUTOMATIONS,
    name: 'Automation',
    source: automationIcon,
    isVisible: false
  },
  {
    id: pilotTabs.CHECKLISTS,
    name: 'Checklist',
    icon: <GiChecklist />,
    isVisible: false
  }
];
function Tab() {
  const dispatch = useDispatch();
  const {
    showPilot,
    showPilotIconView,
    activeItemName,
    showRemoveHotKeyDropdown,
    showAddHotKeyDropdown,
    activeItemType
  } = useAppSelector((state) => state.workspace);

  const handleShowPilot = () => {
    if (showPilot) {
      dispatch(setShowPilot(false));
    } else {
      dispatch(setShowPilot(true));
    }
  };
  const handleShowPilotIconView = () => {
    if (showPilotIconView) {
      dispatch(setShowPilotIconView(false));
    } else {
      dispatch(setShowPilotIconView(true));
    }
  };
  const handleRemoveHotKeys = () => {
    dispatch(setShowAddHotKeyDropdown(false));
    dispatch(setShowRemoveHotKeyDropdown(showRemoveHotKeyDropdown ? false : true));
  };
  const handleAddHotKeys = () => {
    dispatch(setShowRemoveHotKeyDropdown(false));
    dispatch(setShowAddHotKeyDropdown(showAddHotKeyDropdown ? false : true));
  };
  const dropdownOptions = [
    {
      id: 'add_hotkeys',
      label: 'Add HotKeys',
      icon: <SiHotjar />,
      onClick: handleAddHotKeys
    },
    {
      id: 'remove_hotkeys',
      label: 'Remove HotKeys',
      icon: <IoMdRemoveCircle />,
      onClick: handleRemoveHotKeys
    }
  ];
  const idsFromLS: string[] = JSON.parse(localStorage.getItem('pilotSections') || '[]') as string[];

  const [items, setItems] = useState(pilotOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find((i) => i.id === active.id);
      const findOver = items.find((i) => i.id === over?.id);
      if (findActive && findOver) {
        setItems((items) => {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem('pilotSections', JSON.stringify([...sortArray.map((i) => i.id)]));
          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <div className="gap-4 pb-1 w-full" aria-label="Tabs" style={showPilot ? { width: '500px' } : { width: '48px' }}>
        <section className={`flex justify-between border-b items-center h-12 ${showPilot && 'pr-2'}`}>
          <div className="flex items-center">
            {activeItemName && showPilot && (
              <div id="entity" className="flex items-center py-2 pl-1 text-xs font-bold capitalize">
                <p className="text-gray-600">{activeItemType && activeItemType}</p>
                <p>:</p>
                <p className="pl-1 text-gray-500 capitalize">{activeItemName && activeItemName}</p>
              </div>
            )}
          </div>
          <div className={`flex items-center h-fit  ${showPilot ? 'flex-row py-2 space-x-1' : 'flex-col pr-4'}`}>
            <img
              src={compactArrowIcon}
              alt=""
              onClick={() => handleShowPilot()}
              className={`cursor-pointer w-3 h-3  ${
                showPilot ? 'translate-x-4 skew-y-3 ' : 'transform -rotate-180 mb-1'
              }`}
            />
            <Dropdown items={dropdownOptions} />
          </div>
        </section>
        <div className={`flex flex-wrap relative divide-y divide-x ${showPilotIconView ? 'flex-row' : 'flex-col'}`}>
          <SortableContext strategy={rectSortingStrategy} items={items}>
            {items.map((item) => (
              <TabDrag
                key={item.id}
                id={item.id}
                name={item.name}
                source={item.source}
                icon={item.icon}
                showPilot={showPilot}
                showPilotIconView={showPilotIconView}
                subTab={item.subTab}
              />
            ))}
          </SortableContext>
          {showPilot && (
            <span
              className={`z-10 text-xs flex w-8 justify-center items-center ${
                !showPilotIconView && 'absolute top-2 right-0'
              }`}
            >
              <img
                src={listIcon}
                alt=""
                onClick={() => handleShowPilotIconView()}
                className={`w-4 h-4 flex flex-col justify-between cursor-pointer items-center hover:text-green-500 ${
                  showPilotIconView ? 'text-green-500 transform -rotate-180' : ''
                }`}
              />
            </span>
          )}
        </div>
        <hr />
      </div>
    </DndContext>
  );
}

export default Tab;
