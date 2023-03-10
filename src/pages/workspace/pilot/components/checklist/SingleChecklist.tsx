import React, { useState, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { GrDrag } from 'react-icons/gr';
import { BiCaretRight } from 'react-icons/bi';
import ChecklistModal from './components/ChecklistModal';
import { completeOptions } from './ModalOptions';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { UseUpdateChecklistService } from '../../../../../features/task/checklist/checklistService';
import { setTriggerChecklistUpdate } from '../../../../../features/task/checklist/checklistSlice';
import ChecklistItem from './components/ChecklistItem';
import { useSortable } from '@dnd-kit/sortable';
import { ICheckListRes } from '../../../../../features/task/interface.tasks';

function SingleChecklist({ item, id }: { item: ICheckListRes; id: string }) {
  const dispatch = useAppDispatch();
  const [checklistName, setChecklistName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [checklistId, setChecklistId] = useState<string>('');

  const { triggerChecklistUpdate } = useAppSelector((state) => state.checklist);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const handleEdit = (id: string) => {
    setChecklistName(inputRef.current!.innerText);
    dispatch(setTriggerChecklistUpdate(true));
    setChecklistId(id);
    inputRef.current!.blur();
  };

  UseUpdateChecklistService({
    checklist_id: checklistId,
    name: checklistName,
    triggerUpdate: triggerChecklistUpdate
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined
  };

  const done = item.items.filter((e: { is_done: number }) => e.is_done);

  const focusItem = () => {
    inputRef.current?.focus();
  };

  return (
    <div style={style}>
      <Disclosure key={item.id}>
        {({ open }) => (
          <div style={style}>
            <div className="group flex items-center border-2 border-t-0 p-1 hover:text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span
                className="text-gray-200 justify-center cursor-move opacity-0 group-hover:opacity-100"
                ref={setNodeRef}
                {...attributes}
                {...listeners}
              >
                <GrDrag className="text-base text-gray-200 opacity-30 w-4 h-4" />
              </span>
              <span className="px-5 flex items-center">
                <Disclosure.Button>
                  <div className="mx-1">
                    <BiCaretRight className={open ? 'rotate-90 transform w-4 h-4' : ''} />
                  </div>
                </Disclosure.Button>
                <div
                  suppressContentEditableWarning={true}
                  ref={inputRef}
                  contentEditable={true}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleEdit(item.id) : null)}
                  className="cursor-text"
                >
                  {item.name}
                </div>
                <label>
                  ({done.length}/{item.items.length})
                </label>
              </span>
              <div className="opacity-0 group-hover:opacity-100">
                <ChecklistModal options={completeOptions} checklistId={item.id} focus={focusItem} />
              </div>
            </div>
            <Disclosure.Panel className="ml-6">
              <ChecklistItem Item={item.items} checklistId={item.id} />
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

export default SingleChecklist;
