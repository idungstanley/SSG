import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import RoundedCheckbox from '../../../../../Checkbox/RoundedCheckbox';
import Email from '../../../../../../assets/branding/Email';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';

const items = [
  {
    id: 1,
    name: 'Email',
    onclick: () => null
  }
];

export default function EmailOptions() {
  const dispatch = useAppDispatch();
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="w-full">
        <Menu.Button className="inline-flex justify-center rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full">
          <div className="w-full flex items-center justify-between h-full">
            <div className="flex items-center">
              <span className="mx-1">
                <Email />
              </span>
              <p className="text-alsoit-gray-300-lg text-alsoit-text-lg font-semibold">Email</p>
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
            <h1 className="text-alsoit-text-lg font-semibold">EMAIL</h1>
          </div>
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, type: item.name }))
                    }
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
