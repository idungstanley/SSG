// import { Dialog, Transition } from '@headlessui/react';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { IField, Options } from '../../../../../../features/list/list.interfaces';
import {
  useClearEntityCustomFieldValue,
  useUpdateEntityCustomFieldValue
} from '../../../../../../features/list/listService';
import { cl } from '../../../../../../utils';
import {
  setEditCustomProperty,
  setEntityForCustom,
  setNewCustomPropertyDetails
} from '../../../../../../features/task/taskSlice';
import { setActiveTabId } from '../../../../../../features/workspace/workspaceSlice';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { pilotTabs } from '../../../../../../app/constants/pilotTabs';
import { Task } from '../../../../../../features/task/interface.tasks';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';

interface DropdownModalProps {
  field: {
    options: Options;
    id: string;
    activeProperty:
      | {
          id: string;
          color: string;
          name: string;
        }
      | undefined;
  };
  taskId: string;
  currentProperty: IField;
  activeColumn?: boolean[];
  task?: Task;
}

export default function DropdownField({ field, taskId, currentProperty, activeColumn, task }: DropdownModalProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<HTMLElement | null>(null);
  const { options } = field;
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeOption, setActiveOption] = useState<
    | {
        id: string;
        color: string;
        name: string;
      }
    | undefined
  >(field.activeProperty);
  const filteredOptions = options?.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase()));
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);
  const { mutate: onClear } = useClearEntityCustomFieldValue();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function closeModal() {
    setIsOpen(null);
  }

  const handleClick = (option: { id: string; color: string; name: string }) => {
    setActiveOption(option);

    if (field)
      onUpdate({
        taskId,
        value: [{ value: option.id }],
        fieldId: field.id
      });
    closeModal();
  };

  const handleEditCustom = () => {
    dispatch(setEditCustomProperty(currentProperty));
    dispatch(setActiveTabId(pilotTabs.TEMPLATES));
    dispatch(setEntityForCustom({ id: undefined, type: undefined }));
    dispatch(
      setNewCustomPropertyDetails({
        type: 'Single Label',
        name: currentProperty.name,
        color: '',
        id: currentProperty.id
      })
    );
    setIsOpen(null);
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
      setIsOpen(null);
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
    <div ref={containerRef} tabIndex={0} className="w-full h-full flex items-center justify-center focus:ring-0">
      <div
        className={cl('flex items-center justify-center w-full h-full', activeOption?.color && 'text-white')}
        style={{ backgroundColor: activeOption?.color }}
        onClick={(e) => setIsOpen(e.currentTarget)}
      >
        <button type="button" className="flex items-center justify-center w-full focus:outline-none">
          <div>{activeOption?.name ? activeOption?.name : '-'}</div>
        </button>
      </div>

      <AlsoitMenuDropdown anchorEl={isOpen} handleClose={() => setIsOpen(null)}>
        <div
          className="flex flex-col items-center justify-center p-4 text-center outline-none h-fit"
          style={{ maxWidth: '195px' }}
        >
          <div className="flex items-center max-w-full">
            <SearchIcon className="w-3 h-3" />
            <input
              onChange={handleSearchChange}
              value={searchValue}
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="w-11/12 h-4 border-0 ring-0 outline-0 focus:ring-0 focust:outline-0 focus:border-0"
            />
          </div>
          <div className="w-full pt-3 space-y-2">
            {activeOption?.name ? (
              <button
                onClick={handleClearField}
                className={cl(
                  'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate rounded'
                )}
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
                      'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate rounded',
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
            >
              Add/Edit Options
            </button>
          </div>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
