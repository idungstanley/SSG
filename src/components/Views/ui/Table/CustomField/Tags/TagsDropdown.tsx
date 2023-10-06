import React, { useState, useRef } from 'react';
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
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import '../../../../../../styles/task.css';
import { UseGetAllTagsService } from '../../../../../../features/workspace/tags/tagService';

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
}

function TagsDropdown({ optionsFromField, allOptions, currentProperty, taskId }: dropdownProps) {
  const dispatch = useAppDispatch();
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 160);

  const { data: tagsData, status } = UseGetAllTagsService();

  const valueIds = optionsFromField?.map((obj) => ({ value: obj.id }));

  const filteredOptions = allOptions?.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase()));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleEditCustom = () => {
    dispatch(setEditCustomProperty(currentProperty));
    dispatch(setActiveTabId(10));
    dispatch(setEntityForCustom({ id: undefined, type: undefined }));
    dispatch(setNewCustomPropertyDetails({ type: 'Tags', name: currentProperty.name, color: currentProperty.color }));
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

  return (
    <div className="w-full">
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
                        'rounded p-4 max-w-full custom-property-tags'
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

export default TagsDropdown;
