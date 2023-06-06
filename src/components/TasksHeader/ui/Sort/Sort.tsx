import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TaskKey } from '../../../../features/task/interface.tasks';
import { setSortType } from '../../../../features/task/taskSlice';

const options: Record<TaskKey, { icon: JSX.Element }> = {
  status: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  },
  assignees: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  },
  priority: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  }
};

export function Sort() {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector((state) => state.task);

  const setOption = (i: TaskKey) => dispatch(setSortType(i));

  return (
    <Listbox value={sortType} onChange={setOption}>
      <div className="relative">
        <Listbox.Button className="relative w-full p-2 text-left rounded-md outline-none cursor-pointer text-primary-500 bg-primary-100 focus:outline-none">
          <p className="block truncate">
            Group by: <span className="capitalize">{sortType}</span>
          </p>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span> */}
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {Object.keys(options).map((option) => (
              <Listbox.Option
                key={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-100 text-primary-500' : 'text-gray-500'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center w-full space-x-3">
                      {options[option as TaskKey].icon}

                      <span className={`block truncate capitalize ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option}
                      </span>
                    </div>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
