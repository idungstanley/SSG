import React, { useEffect, useMemo, useState } from 'react';
import { itemType } from '../../types';
import Tabs from './components/Tabs';

export interface ITab {
  id: number;
  label: string;
  icon: JSX.Element;
}

interface ISection {
  id: number;
  element: JSX.Element;
}

interface PilotProps {
  sections: ISection[];
  tabs: ITab[];
  activeItem: { id: string; type: itemType };
}

export default function Pilot({ sections, tabs }: PilotProps) {
  const [activeTabId, setActiveTabId] = useState(1);

  useEffect(() => {
    // reset active tab on unmount
    return () => setActiveTabId(1);
  }, []);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  return (
    <div>
      {/* tab items */}
      <Tabs
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />

      {/* main section depends of active tab */}
      {activeSection ? activeSection.element : null}
    </div>
  );
}
