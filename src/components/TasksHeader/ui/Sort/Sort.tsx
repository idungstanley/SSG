import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TaskKey } from '../../../../features/task/interface.tasks';
import { setSortType } from '../../../../features/task/taskSlice';
import Button from '../../../Buttons/Button';
import Icons from '../../../Icons/Icons';
import GroupBy from '../../../../assets/icons/layers.svg';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';

type Key = Extract<TaskKey, 'status' | 'assignees' | 'priority'>;
type Option = Record<Key, { icon: JSX.Element }>;

const options: Option = {
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

interface ISortProps {
  isSplitSubtasks?: boolean;
}

export function Sort({ isSplitSubtasks }: ISortProps) {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector((state) => state.task);

  const setOption = (i: TaskKey) => dispatch(setSortType(i));

  return (
    <Listbox value={sortType} onChange={setOption}>
      <div className="relative">
        <Listbox.Button className="relative w-full rounded-md outline-none cursor-pointer">
          <Button active={isSplitSubtasks ? false : true} withoutBg={isSplitSubtasks}>
            <Icons src={GroupBy} />
            {!isSplitSubtasks ? (
              <>
                <p className="block truncate">
                  Group by: <span className="capitalize">{sortType}</span>
                </p>
                <ArrowDownFilled active={true} />
              </>
            ) : null}
          </Button>
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
                      {options[option as Key].icon}

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
