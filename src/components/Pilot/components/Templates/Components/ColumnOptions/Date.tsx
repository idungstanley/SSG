import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import RoundedCheckbox from '../../../../../Checkbox/RoundedCheckbox';
import CalendarIcon from '../../../../../../assets/icons/CalendarIcon';

const items = [
  {
    id: 1,
    name: 'Short Text',
    onclick: () => null
  },
  {
    id: 2,
    name: 'Long Text',
    onclick: () => null
  },
  {
    id: 3,
    name: 'Email',
    onclick: () => null
  },
  {
    id: 4,
    name: 'Number',
    onclick: () => null
  },
  {
    id: 4,
    name: 'Website',
    onclick: () => null
  }
];

export default function DateOptions() {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="w-full">
        <Menu.Button className="inline-flex justify-center rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full">
          <div className="w-full flex items-center justify-between h-full">
            <div className="flex items-center">
              <span className="mx-1">
                <CalendarIcon active={false} />
              </span>
              <p className="text-alsoit-gray-300-lg text-alsoit-text-lg font-semibold">Date</p>
            </div>
            <ArrowRight />
          </div>
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
        <Menu.Items className="z-50 absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ml-24">
          <div className="w-full mt-2 flex justify-center">
            <h1 className="text-alsoit-text-lg font-semibold">DATE</h1>
          </div>
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    // onClick={item.onClick}
                    className={`${
                      active ? 'bg-alsoit-gray-50 text-gray-700' : 'text-gray-700'
                    } group flex gap-4 w-full items-center rounded-md px-2 py-2 text-alsoit-text-lg font-semibold`}
                  >
                    <RoundedCheckbox
                      onChange={() => null}
                      isChecked={false}
                      styles="w-3 h-3 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
                    />
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
