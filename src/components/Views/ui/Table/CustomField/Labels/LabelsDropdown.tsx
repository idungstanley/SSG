import React, { useState, useRef, useEffect } from 'react';
import { cl } from '../../../../../../utils';
import { Dialog, Transition } from '@headlessui/react';
import { useAbsolute } from '../../../../../../hooks/useAbsolute';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { IField, Options } from '../../../../../../features/list/list.interfaces';
import {
  setEditCustomProperty,
  setEntityForCustom,
  setNewCustomPropertyDetails
} from '../../../../../../features/task/taskSlice';
import { setActiveTabId } from '../../../../../../features/workspace/workspaceSlice';
import {
  useClearEntityCustomFieldValue,
  useUpdateEntityCustomFieldValue
} from '../../../../../../features/list/listService';
import { pilotTabs } from '../../../../../../app/constants/pilotTabs';
import { Task } from '../../../../../../features/task/interface.tasks';

interface dropdownProps {
  optionsFromField:
    | {
        id: string;
        color: string;
        name: string;
      }[]
    | undefined;
  allOptions: Options | undefined;
  currentProperty: IField;
  taskId: string;
  task?: Task;
  activeColumn?: boolean[];
}

function LabelsDropdown({ optionsFromField, allOptions, currentProperty, taskId, task, activeColumn }: dropdownProps) {
  const dispatch = useAppDispatch();
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);
  const { mutate: onClear } = useClearEntityCustomFieldValue();

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { updateCords, KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 160);

  const valueIds = optionsFromField?.map((obj) => ({ value: obj.id }));

  const filteredOptions = allOptions?.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase()));

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleEditCustom = () => {
    dispatch(setEditCustomProperty(currentProperty));
    dispatch(setActiveTabId(pilotTabs.TEMPLATES));
    dispatch(setEntityForCustom({ id: undefined, type: undefined }));
    dispatch(
      setNewCustomPropertyDetails({ type: 'Multi Label', name: currentProperty.name, color: currentProperty.color })
    );
    setIsOpen(false);
  };

  const handleClick = (option: { id: string; color: string; name: string }) => {
    const updatedValueIds = valueIds ? [...valueIds, { value: option.id }] : [{ value: option.id }];
    if (currentProperty)
      onUpdate({
        taskId,
        value: updatedValueIds,
        fieldId: currentProperty.id
      });
    closeModal();
  };

  const handleClearField = () => {
    if (currentProperty)
      onClear({
        taskId,
        fieldId: currentProperty.id
      });
    closeModal();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsOpen(!!containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div className="w-full h-full flex items-center justify-center focus:ring-0" ref={containerRef} tabIndex={0}>
      <div className="w-full">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-full focus:outline-none"
        >
          <div ref={relativeRef} className="w-full">
            {optionsFromField?.length ? (
              <div className="w-full flex flex-wrap justify-center gap-1 items-center p-1">
                {optionsFromField?.map((value) => {
                  return (
                    <div
                      key={value.id}
                      className={cl(
                        value.color ? 'text-white' : 'border-2 border-gray-500',
                        'rounded p-0.5 max-w-full'
                      )}
                      style={{ backgroundColor: value.color }}
                    >
                      <h3 className="text-alsoit-text-md max-w-full truncate">{value.name}</h3>
                    </div>
                  );
                })}
              </div>
            ) : (
              '-'
            )}
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords, maxWidth: '195px' }} className="fixed overflow-y-auto max-w-full">
            <div
              className="flex flex-col items-center justify-center p-4 text-center bg-white border rounded-xl shadow-lg outline-none h-fit"
              style={{ maxWidth: '195px' }}
            >
              <div className="flex items-center max-w-full">
                <SearchIcon />
                <input
                  onChange={handleSearchChange}
                  value={searchValue}
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  className="h-4 border-0 ring-0 outline-0 focus:ring-0 focust:outline-0 focus:border-0 w-11/12"
                />
              </div>

              <div className="w-full pt-3 space-y-2">
                {optionsFromField?.length ? (
                  <button
                    onClick={handleClearField}
                    className={cl('text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate')}
                    style={{ backgroundColor: 'white', maxWidth: '195px' }}
                  >
                    -
                  </button>
                ) : null}

                {Array.isArray(filteredOptions)
                  ? filteredOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleClick(option)}
                        className={cl(
                          'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate',
                          option.color ? 'text-white' : ''
                        )}
                        style={{ backgroundColor: option.color, maxWidth: '195px' }}
                      >
                        {option.name}
                      </button>
                    ))
                  : null}
                <button
                  className={cl(
                    'text-gray-700 py-2 bg-alsoit-purple-50 border w-full text-center block px-4 text-sm font-semibold hover:text-alsoit-purple-300'
                  )}
                  onClick={handleEditCustom}
                  style={{ maxWidth: '195px' }}
                >
                  Add/Edit Options
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default LabelsDropdown;
