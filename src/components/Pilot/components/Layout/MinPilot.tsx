import { IPilotSection, IPilotTab } from '../../../../types';
import React from 'react';
import { cl } from '../../../../utils';
import MinHotkeysList from '../HotKeys/MinHotKeys';
import MinTabs from '../Tabs/MinTabs';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';

interface MinPilotProps {
  featureTabs: IPilotTab[];
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

export default function MinPilot({ featureTabs, activeSection, setShowModal, showModal }: MinPilotProps) {
  const { activeTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  return (
    <div
      onMouseLeave={() => (activeTabId ? dispatch(setActiveTabId()) : undefined)}
      className="relative h-full bg-white divide-y"
    >
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

      <Header isMinified menu={<Header.Menu setShowModal={setShowModal} />} />

      <MinHotkeysList tabs={featureTabs} setShowModal={setShowModal} showModal={showModal} />

      <MinTabs tabs={featureTabs} isMinified />
    </div>
  );
}
