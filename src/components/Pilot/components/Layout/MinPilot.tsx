import { IPilotSection, IPilotTab } from '../../../../types';
import React from 'react';
import { cl } from '../../../../utils';
import MinHeader from '../Header/MinHeader';
import Menu from '../HotKeys/components/Dropdown';
import MinHotkeysList from '../HotKeys/MinHotKeys';
import MinTabs from '../Tabs/MinTabs';

interface MinPilotProps {
  activeTabId: number | null;
  featureTabs: IPilotTab[];
  setActiveTabId: (i: number | null) => void;
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

export default function MinPilot({
  activeTabId,
  featureTabs,
  setActiveTabId,
  activeSection,
  setShowModal,
  showModal
}: MinPilotProps) {
  return (
    <div onMouseLeave={() => (activeTabId ? setActiveTabId(null) : undefined)} className="border-l relative divide-y">
      <div
        style={{
          transform: `translateX(${activeTabId ? -13 : 100}%)`
        }}
        className={cl(
          activeTabId ? 'opacity-100' : 'opacity-100',
          'z-20 bg-white flex flex-col w-96 border-2 fixed top-10 bottom-0 right-0 transform transition-all duration-500 p-2'
        )}
      >
        {activeSection?.element}
      </div>

      <MinHeader setActiveTabId={setActiveTabId}>
        <Menu setShowModal={setShowModal} />
      </MinHeader>

      <MinHotkeysList
        tabs={featureTabs}
        setShowModal={setShowModal}
        showModal={showModal}
        setActiveTabId={setActiveTabId}
        activeTabId={activeTabId}
      />

      <MinTabs tabs={featureTabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
    </div>
  );
}
