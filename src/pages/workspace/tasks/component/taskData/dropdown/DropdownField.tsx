import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { Property } from '../../../../../../features/list/list.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useAbsolute } from '../../../../../../hooks/useAbsolute';
import { cl } from '../../../../../../utils';

interface DropdownModalProps {
  field: { properties: Property; id: string; activeProperty: string };
  taskId: string;
}

export default function DropdownField({ field, taskId }: DropdownModalProps) {
  const { updateCords } = useAppSelector((state) => state.task);
  const [activeOption, setActiveOption] = useState<string>(field.activeProperty);
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const { cords, relativeRef } = useAbsolute(updateCords, 160);

  const { properties } = field;

  const handleClick = (option: string) => {
    setActiveOption(option);

    if (field)
      onUpdate({
        taskId,
        value: option,
        fieldId: field.id
      });

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-full focus:outline-none hover:text-gray-700"
        >
          <div ref={relativeRef}>{activeOption}</div>
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
                {Array.isArray(properties)
                  ? properties.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleClick(option)}
                        className={cl(
                          option === activeOption && 'bg-gray-100',
                          'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm hover:bg-gray-100 hover:text-gray-900'
                        )}
                      >
                        {option}
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
