import React, { useRef, useState } from 'react';
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
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';

function Disclosures({ item }: { item?: ICheckListRes[] | undefined }) {
  const dispatch = useAppDispatch();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
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

  return item ? (
    <div className="w-full">
      {item?.length > 0
        ? item?.map((checklist: ICheckListRes) => {
            const done = checklist.items.filter((e: { is_done: number }) => e.is_done);
            return (
              <div key={checklist.id} className="w-full">
                <div className="group flex items-center p-1 cursor-pointer w-full">
                  <div className="w-1/2 flex items-center p-1">
                    <div onClick={() => handleItemClick(checklist.id)} className=" border-solid border-2 rounded-full">
                      <BiCaretRight
                        className={
                          openedDisclosureId.includes(checklist.id) ? 'rotate-90 transform w-3 h-3' : 'w-3 h-3'
                        }
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
                      <div onClick={(e) => setAnchor(e.currentTarget)}>
                        <ThreeDotIcon />
                      </div>
                      <ChecklistModal
                        options={completeOptions}
                        checklistId={checklist.id}
                        anchor={anchor}
                        setAnchor={setAnchor}
                      />
                    </div>
                  </div>
                  {openedDisclosureId.includes(checklist.id) && (
                    <div className="w-2/4 flex justify-between">
                      <div className="w-1/2 flex justify-center">Assignee</div>
                      <div className="w-1/2 flex justify-center">Tags</div>
                    </div>
                  )}
                </div>

                {openedDisclosureId.includes(checklist.id) && (
                  <div className="w-full">
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
