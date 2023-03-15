import React, { useState, useRef } from 'react';
import { BiCaretRight } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { UseUpdateChecklistService } from '../../../../features/task/checklist/checklistService';
import { setOpenedDisclosureId, setTriggerChecklistUpdate } from '../../../../features/task/checklist/checklistSlice';
import ChecklistItem from './ChecklistItem';
import ChecklistModal from './ChecklistModal';
import { completeOptions } from './ModalOptions';
import { ICheckListRes } from '../../../../features/task/interface.tasks';

function Disclosures({ item: checklist }: { item: ICheckListRes }) {
  const dispatch = useAppDispatch();
  const [checklistName, setChecklistName] = useState<string | undefined>('');
  const [checklistId, setChecklistId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { triggerChecklistUpdate, openedDisclosureId } = useAppSelector((state) => state.checklist);

  const handleItemClick = (id: string) => {
    dispatch(setOpenedDisclosureId(id));
  };

  const handleEdit = (id: string) => {
    setChecklistName(inputRef.current?.innerText);
    dispatch(setTriggerChecklistUpdate(true));
    setChecklistId(id);
    inputRef.current?.blur();
  };

  UseUpdateChecklistService({
    checklist_id: checklistId,
    name: checklistName,
    triggerUpdate: triggerChecklistUpdate
  });

  const focusItem = () => {
    inputRef.current?.focus();
  };

  const done = checklist.items.filter((e: { is_done: number }) => e.is_done);

  return (
    <div>
      {checklist.map((e) => {
        return (
          <div key={checklist.id}>
            <div className="group flex items-center p-1 hover:text-gray-700 hover:bg-gray-200 cursor-pointer pl-2">
              <div
                onClick={() => handleItemClick(checklist.id)}
                className="border-gray-400 border-solid border-2 rounded-full"
              >
                <BiCaretRight
                  className={openedDisclosureId.includes(checklist.id) ? 'rotate-90 transform w-3 h-3' : 'w-3 h-3'}
                />
              </div>
              <div
                suppressContentEditableWarning={true}
                ref={inputRef}
                contentEditable={true}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEdit(checklist.id) : null)}
                style={{ backgroundColor: '#CAC9C9' }}
                className="cursor-text p-1 rounded mx-2 text-white text-sm"
              >
                {checklist.name.toUpperCase()}
              </div>
              <label>
                ({done.length}/{checklist.items.length})
              </label>
              <div className="mx-2">
                <ChecklistModal options={completeOptions} checklistId={checklist.id} focus={focusItem} />
              </div>
            </div>

            {openedDisclosureId.includes(checklist.id) && (
              <div className="w-10/12 m-auto">
                <ChecklistItem Item={checklist.items} checklistId={checklist.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Disclosures;
