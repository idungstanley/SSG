import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { cl } from '../../../../../../utils';

interface DropdownModalProps {
  field: { properties: string; id: string; activeProperty: string };
  taskId: string;
}

const regex = /\w+/g;

export default function DropdownField({ field, taskId }: DropdownModalProps) {
  const [activeOption, setActiveOption] = useState<string>(field.activeProperty);
  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const properties = field.properties.match(regex) as string[] | null;
  const options = properties ? [...properties] : [];

  const handleClick = (option: string) => {
    setActiveOption(option);

    if (field)
      onUpdate({
        taskId,
        value: option,
        fieldId: field.id
      });
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button className="flex justify-center items-center focus:outline-none hover:text-gray-700 w-full">
        {activeOption}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options?.map((option) => (
              <Menu.Item key={option}>
                <button
                  onClick={() => handleClick(option)}
                  className={cl(
                    option === activeOption && 'bg-gray-100',
                    'text-gray-700 text-left w-full block px-4 py-2 pr-20 text-sm hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {option}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
