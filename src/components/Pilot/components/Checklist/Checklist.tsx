import React from 'react';
import { VscChecklist } from 'react-icons/vsc';
import { setShowChecklistInput } from '../../../../features/task/checklist/checklistSlice';
import { useAppDispatch } from '../../../../app/hooks';
import ChecklistIndex from './ChecklistIndex';

export default function Checklists() {
  const dispatch = useAppDispatch();
  return (
    <section>
      <div className="border-2 flex items-center text-center py-1 bg-white">
        <VscChecklist className="w-4 h-4 ml-2" />
        <h1 className="text-base-xl mx-4">Checklists</h1>
        <button
          className="p-0.5 border-blue-400 border-solid border-2 rounded-lg text-xs"
          onClick={() => dispatch(setShowChecklistInput(true))}
        >
          ADD
        </button>
      </div>
      <div className="flex flex-col h-full bg-alsoit-purple-50 p-2 m-1 rounded-lg">
        <ChecklistIndex />
      </div>
    </section>
  );
}
