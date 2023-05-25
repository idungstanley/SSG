import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useAbsolute } from '../../../../../../hooks/useAbsolute';
import { cl } from '../../../../../../utils';

interface DropdownModalProps {
  field: { properties: string[]; id: string; activeProperty: string };
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
      <div className="flex w-full h-full items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center focus:outline-none hover:text-gray-700 w-full"
        >
          <div ref={relativeRef}>{activeOption}</div>
        </button>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex-col border px-2 w-fit h-fit py-1 rounded-md bg-white shadow-lg outline-none flex items-center justify-center text-center">
              <p className="uppercase whitespace-nowrap bg-white pr-10 font-thin text-xs text-gray-400 pb-3 border-b">
                select an option
              </p>
              <div className="space-y-2 pt-3 w-full">
                {properties?.map((option) => (
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
                ))}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
