import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveStatusManagementTabId } from '../../features/workspace/workspaceSlice';
import { STORAGE_KEYS } from '../../app/config/dimensions';

export const HubManagerOptions = [
  {
    id: 1,
    name: 'Custom',
    isVisible: false
  },
  {
    id: 2,
    name: 'Advance',
    isVisible: false
  },
  {
    id: 3,
    name: 'Content',
    isVisible: false
  },
  {
    id: 4,
    name: 'Kanban',
    isVisible: false
  },
  {
    id: 5,
    name: 'Marketing',
    isVisible: false
  },
  {
    id: 6,
    name: 'Normal',
    isVisible: false
  },
  {
    id: 5,
    name: 'Marketing',
    isVisible: false
  }
];
export default function StatusManagementSubTab() {
  const dispatch = useAppDispatch();
  const { activeStatusManagementTabId } = useAppSelector((state) => state.workspace);
  const handleClick = (id: number) => {
    dispatch(setActiveStatusManagementTabId(id));
  };
  const pilotWidth = JSON.parse(localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) || '""') as number;

  return (
    <section>
      <div className={`grid gap-4 p-2 ${pilotWidth < 400 ? 'sm:grid-cols-3' : 'md:grid-cols-4'}`}>
        {HubManagerOptions.map((item, index) => (
          <div
            key={index}
            className={`border items-center flex gap-4 w-auto p-2 h-6 rounded-full ${
              activeStatusManagementTabId === item.id ? 'text-white bg-alsoit-purple-300' : ''
            }`}
            onClick={() => handleClick(item.id)}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
