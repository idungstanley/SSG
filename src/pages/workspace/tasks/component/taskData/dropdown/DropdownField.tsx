import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { cl } from '../../../../../../utils';

interface DropdownModalProps {
  field: { properties: string; id: string; activeProperty: string };
  taskId: string;
}

const regex = /\w+/g;

export default function DropdownField({ field, taskId }: DropdownModalProps) {
  const ref = useRef<HTMLDivElement>(null);
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
    <Menu as="div" className="relative inline-block mt-2 text-left w-full">
      <div ref={ref}>
        <Menu.Button className="flex justify-center items-center focus:outline-none hover:text-gray-700 w-full">
          {activeOption}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          style={{
            left: (ref.current?.getBoundingClientRect().x ?? 0) + 40,
            bottom: window.innerHeight - (ref.current?.getBoundingClientRect().y ?? 0)
          }}
          className="px-2 w-fit h-fit py-1 fixed mt-2 rounded-md bg-white shadow-lg focus:outline-none"
        >
          <p className="uppercase whitespace-nowrap bg-white pr-10 font-thin text-xs text-gray-400 pb-3 border-b">
            select an option
          </p>
          <Menu.Items className="space-y-2 pt-3">
            {options?.map((option) => (
              <Menu.Item key={option}>
                <button
                  onClick={() => handleClick(option)}
                  className={cl(
                    option === activeOption && 'bg-gray-100',
                    'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {option}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}
