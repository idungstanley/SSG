import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { IField, Options } from '../../../../../../features/list/list.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useAbsolute } from '../../../../../../hooks/useAbsolute';
import { cl } from '../../../../../../utils';

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
}

export default function DropdownField({ field, taskId, currentProperty }: DropdownModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { options } = field;
  const { updateCords } = useAppSelector((state) => state.task);
  const [activeOption, setActiveOption] = useState<
    | {
        id: string;
        color: string;
        name: string;
      }
    | undefined
  >(field.activeProperty);
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  function closeModal() {
    setIsOpen(false);
  }

  const { cords, relativeRef } = useAbsolute(updateCords, 160);

  const handleClick = (option: { id: string; color: string; name: string }) => {
    setActiveOption(option);

    if (field)
      onUpdate({
        taskId,
        value: option.id,
        fieldId: field.id
      });
    closeModal();
  };

  return (
    <>
      <div
        className={cl('flex items-center justify-center w-full h-full', activeOption?.color && 'text-white')}
        style={{ backgroundColor: activeOption?.color }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-full focus:outline-none"
        >
          <div ref={relativeRef}>{activeOption?.name ? activeOption?.name : '-'}</div>
        </button>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex flex-col items-center justify-center px-2 py-1 text-center bg-white border rounded-md shadow-lg outline-none w-fit h-fit">
              <p className="pb-3 pr-10 text-xs font-thin text-gray-400 uppercase bg-white border-b whitespace-nowrap">
                select an option
              </p>
              <div className="w-full pt-3 space-y-2">
                {Array.isArray(options)
                  ? options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleClick(option)}
                        className={cl(
                          'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm',
                          option.color ? 'text-white' : ''
                        )}
                        style={{ backgroundColor: option.color }}
                      >
                        {option.name}
                      </button>
                    ))
                  : null}
                <button
                  className={cl(
                    'text-gray-700 py-2 bg-alsoit-purple-50 border w-full text-center block px-4 text-sm font-semibold hover:text-alsoit-purple-300'
                  )}
                >
                  Add/Edit Options
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
