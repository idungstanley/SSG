import React, { useState } from 'react';
import {
  setClickChecklistItemId,
  setOpenedDisclosureId,
  setShowChecklistItemInput,
  setToggleAssignChecklistItemId
} from '../../../../features/task/checklist/checklistSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  // useConvertChecklistToTask,
  useDeleteChecklist,
  useDeleteChecklistItem
} from '../../../../features/task/checklist/checklistService';
import AlsoitMenuDropdown from '../../../DropDowns';
import ActiveTreeSearch from '../../../ActiveTree/ActiveTreeSearch';

interface ChecklistModalProps {
  checklistId: string;
  checklistItemId?: string;
  options: {
    id: string;
    handleClick: () => void;
    name: string;
    icon: JSX.Element;
  }[];
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export default function ChecklistModal({
  options,
  checklistId,
  checklistItemId,
  anchor,
  setAnchor
}: ChecklistModalProps) {
  const dispatch = useAppDispatch();
  const [activeTree, setActiveTree] = useState<HTMLElement | null>(null);

  const { mutate: onChecklistDelete } = useDeleteChecklist(checklistId);
  const { mutate: onChecklistItemDelete } = useDeleteChecklistItem(checklistId, checklistItemId as string);
  // const { mutate: convertToTask } = useConvertChecklistToTask(checklistId);

  const { openedDisclosureId, clickedChecklistId } = useAppSelector((state) => state.checklist);

  const handleDelChecklist = () => {
    onChecklistDelete({
      query: checklistId
    });
  };

  const handleChecklistItemDel = () => {
    onChecklistItemDelete({
      query: checklistId,
      itemId: checklistItemId
    });
  };

  const handleConvertToTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveTree(e.currentTarget);
  };

  const handleOptions = (option: { name: string; id: string }, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (option.name === 'Delete Checklist') {
      handleDelChecklist();
      setAnchor(null);
    } else if (option.name === 'Delete Item') {
      handleChecklistItemDel();
    } else if (option.name === 'Assign to' || option.name === 'Unassign') {
      dispatch(setToggleAssignChecklistItemId(checklistItemId));
      dispatch(setClickChecklistItemId(checklistItemId));
    } else if (option.id === 'convert_to_task') {
      handleConvertToTask(e);
    } else if (option.id === 'new_item') {
      setAnchor(null);
      dispatch(setShowChecklistItemInput(true));
      if (!openedDisclosureId.includes(clickedChecklistId)) {
        dispatch(setOpenedDisclosureId(clickedChecklistId));
      }
    }
  };

  return (
    <AlsoitMenuDropdown handleClose={() => setAnchor(null)} anchorEl={anchor}>
      <div>
        {options.map((option) => {
          return (
            <div key={option.id} className="flex items-center text-gray-600 hover:bg-gray-300">
              <button
                type="button"
                className="flex items-center w-11/12 px-4 py-2 space-x-2 text-sm text-left"
                onClick={(e) => {
                  handleOptions(option, e);
                }}
              >
                <span className="w-4 h-4">{option.icon}</span>
                <p>{option.name}</p>
              </button>
            </div>
          );
        })}
      </div>
      <AlsoitMenuDropdown handleClose={() => setActiveTree(null)} anchorEl={activeTree}>
        <div style={{ width: '170px' }}>
          <ActiveTreeSearch option={'convert_checklist'} checklistId={checklistId} />
        </div>
      </AlsoitMenuDropdown>
    </AlsoitMenuDropdown>
  );
}
