import { IPilotSection, IPilotTab } from '../../../../types';
import React from 'react';
import { cl } from '../../../../utils';
import MinHotkeysList from '../HotKeys/MinHotKeys';
import MinTabs from '../Tabs/MinTabs';
import Header from '../Header';
import { PrinterIcon, ShareIcon } from '@heroicons/react/24/outline';

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

      <Header
        isMinified
        setActiveTabId={setActiveTabId}
        additionalNavItems={
          <>
            <ShareIcon className="w-4 h-4" />

            <PrinterIcon className="w-4 h-4" />

            <Header.Menu setShowModal={setShowModal} />
          </>
        }
      />

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
