import React, { useMemo } from 'react';
import TodoTabs from './TodoTabs';

interface activeSelectedTab {
  id: string;
  content: JSX.Element;
}
export default function MyWorkTabs({ activeTab }: { activeTab: string }) {
  const tabs = [
    {
      id: 'todo',
      content: <TodoTabs />
    },
    {
      id: 'comments',
      content: <h1>comments</h1>
    },
    {
      id: 'done',
      content: <h1>done</h1>
    },
    {
      id: 'delegated',
      content: <h1>delegated</h1>
    }
  ];

  const activeSelectedTab = useMemo(() => tabs.find((tab) => tab.id == activeTab), [activeTab]) as activeSelectedTab;

  return (
    <>
      <div>{activeSelectedTab.content}</div>
    </>
  );
}
