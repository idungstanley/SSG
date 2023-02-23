import React, { useMemo } from 'react';
import { IPilotTab } from '../../../../../../types';
import { cl } from '../../../../../../utils';

interface HotkeysListProps {
  activeHotkeyIds: number[];
  tabs: IPilotTab[];
  setActiveTabId: (i: number) => void;
  activeTabId: number;
}

export default function HotkeysList({
  activeHotkeyIds,
  tabs,
  setActiveTabId,
  activeTabId,
}: HotkeysListProps) {
  if (activeHotkeyIds.length === 0) {
    return null;
  }

  const hotkeys = useMemo(
    () => tabs.filter((i) => activeHotkeyIds.includes(i.id)),
    [activeHotkeyIds, tabs]
  );

  return (
    <div className="flex gap-2 h-fit w-full px-2 border-t py-4 border-b">
      {hotkeys.map((hotkey) => (
        <div
          onClick={() => setActiveTabId(hotkey.id)}
          title={hotkey.label}
          className={cl(
            activeTabId === hotkey.id
              ? 'bg-green-500 border-green-500'
              : 'bg-white border-gray-200',
            'flex items-center justify-center p-2 rounded-lg border border-opacity-0 hover:border-opacity-100 duration-200'
          )}
          key={hotkey.id}
        >
          {hotkey.icon}
        </div>
      ))}
    </div>
  );
}
