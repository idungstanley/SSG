import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { cl } from '../../utils';
import Tabs from './components/Tabs';
import { IPilotSection, IPilotTab } from '../../types';
import Menu from './components/HotKeys';
import { Modal } from './components/HotKeys/components/Modal';
import HotkeysList from './components/HotKeys/components/ItemsList';
import Header from './components/Header';

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const dispatch = useAppDispatch();
  const { sections, tabs } = pilotConfig;
  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const [activeTabId, setActiveTabId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeHotkeyIds, setActiveHotkeyIds] = useState<number[]>([]);

  useEffect(() => {
    // reset active tab and current item id on unmount
    return () => {
      setActiveTabId(1);
      dispatch(setShowPilotSideOver({ show: true }));
    };
  }, []);

  // find active section
  const activeSection = useMemo(() => sections.find((section) => section.id === activeTabId), [activeTabId]);

  return id ? (
    <>
      <div className={cl('relative p-2 border-l flex flex-col  gap-2 h-full', showFullPilot && 'w-134 min-w-134')}>
        <Header>
          <Menu setShowModal={setShowModal} />
        </Header>

        {showFullPilot ? (
          <>
            {/* hotkey items */}
            <HotkeysList
              tabs={tabs}
              setActiveTabId={setActiveTabId}
              activeHotkeyIds={activeHotkeyIds}
              activeTabId={activeTabId}
            />

            {/* tab items */}
            <Tabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

            {/* main section depends of active tab */}
            {activeSection ? activeSection.element : null}
          </>
        ) : null}
      </div>

      <Modal
        activeHotkeyIds={activeHotkeyIds}
        setActiveHotkeyIds={setActiveHotkeyIds}
        setShowModal={setShowModal}
        showModal={showModal}
        tabs={tabs}
      />
    </>
  ) : null;
}
