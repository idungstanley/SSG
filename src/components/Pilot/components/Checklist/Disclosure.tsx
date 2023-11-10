import React, { useRef } from 'react';
import { BiCaretRight } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useEditChecklist } from '../../../../features/task/checklist/checklistService';
import { setEditChecklist, setOpenedDisclosureId } from '../../../../features/task/checklist/checklistSlice';
import ChecklistItem from './ChecklistItem';
import ChecklistModal from './ChecklistModal';
import { completeOptions } from './ModalOptions';
import { ICheckListRes } from '../../../../features/task/interface.tasks';
import { Spinner } from '../../../../common';
import { useMutation } from '@tanstack/react-query';

function Disclosures({ item }: { item?: ICheckListRes[] | undefined }) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { openedDisclosureId } = useAppSelector((state) => state.checklist);

  const handleItemClick = (id: string) => {
    dispatch(setOpenedDisclosureId(id));
  };

  const editChecklist = useMutation(useEditChecklist, {
    onSuccess: (data) => {
      dispatch(setEditChecklist(data.data.checklist));
    }
  });

  const handleEdit = async (id: string) => {
    await editChecklist.mutateAsync({
      checklist_id: id,
      name: inputRef.current?.innerText
    });
    inputRef.current?.blur();
  };

  const focusItem = () => {
    inputRef.current?.focus();
  };

  // const done = checklist.items.filter((e: { is_done: number }) => e.is_done);

  return item ? (
    <div>
      {item?.length > 0
        ? item?.map((checklist: ICheckListRes) => {
            const done = checklist.items.filter((e: { is_done: number }) => e.is_done);
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
          })
        : 'No Checklist created yet, click on the add button above to create one'}
    </div>
  ) : (
    <Spinner size={20} color={'blue'} />
  );
}

export default Disclosures;
