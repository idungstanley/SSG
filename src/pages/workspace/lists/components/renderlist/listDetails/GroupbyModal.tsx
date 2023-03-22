import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { AiOutlineStop } from 'react-icons/ai';
import { RiCheckboxBlankFill, RiFlag2Line } from 'react-icons/ri';
import { BsLayers } from 'react-icons/bs';
import { CgArrowsScrollV } from 'react-icons/cg';
import { TiTags } from 'react-icons/ti';
import { CiCalendarDate } from 'react-icons/ci';
import { PlusIcon } from '@heroicons/react/24/solid';

const groupings = [
  {
    id: 0,
    category: 'None',
    icon: <AiOutlineStop className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 1,
    category: 'Status (default)',
    icon: <RiCheckboxBlankFill className="w-5 text-gray-400 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 2,
    category: 'Assignee',
    icon: <CgArrowsScrollV className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 3,
    category: 'Priority',
    icon: <RiFlag2Line className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 4,
    category: 'Tags',
    icon: <TiTags className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 5,
    category: 'Due date',
    icon: <CiCalendarDate className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  },
  {
    id: 6,
    category: 'Custom fields',
    icon: <PlusIcon className="w-5 text-gray-700 h-5" aria-hidden="true" />,
    handleClick: () => ({})
  }
];

export default function GroupbyModal() {
  const [selected, setSelected] = useState(groupings[1]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 px-4">
          <Listbox.Button className="relative z-10 w-full cursor-pointer rounded-md p-2">
            <div className="flex items-center gap-1 bg-blue-100 rounded p-2 text-blue-600 cursor-pointer hover:text-blue-800">
              <span>
                <BsLayers />
              </span>
              <span className="flex items-center">
                <p className="text-blue-700">Group by:</p>
                {selected?.category}
              </span>
            </div>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 z-20 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {groupings?.map((grouped, groupedIdx) => (
                <Listbox.Option
                  key={groupedIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 hover:bg-gray-200 hover:rounded-md ${
                      active ? 'bg-gray-00 text-blue-600' : 'text-gray-900'
                    }`
                  }
                  value={grouped}
                  onClick={grouped.handleClick}
                >
                  {({ selected }) => (
                    <section className="flex item-center justify-start space-x-2">
                      <span>{grouped.icon}</span>
                      <span className={`block ${selected ? 'font-medium text-sm' : 'font-normal text-sm'}`}>
                        {grouped.category}
                      </span>
                      {selected ? (
                        <span className="pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-7" aria-hidden="true" />
                        </span>
                      ) : null}
                    </section>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
