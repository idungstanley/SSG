import React, { useMemo } from 'react';
import { myWorkTabs } from '../homeDatas';

interface activeSelectedTab {
  id: string;
  content: JSX.Element;
}
export default function MyWorkTabs({ activeTab }: { activeTab: string }) {
  const activeSelectedTab = useMemo(
    () => myWorkTabs.find((tab) => tab.id == activeTab),
    [activeTab]
  ) as activeSelectedTab;

  return (
    <>
      <div>{activeSelectedTab.content}</div>
    </>
  );
}
