import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import Badge from '../Badge';
import { classNames } from '../../utils';

interface IOption {
  id: string | null;
  name: string;
  avatar?: JSX.Element;
  badge?: string;
}

interface SelectMenuWithAvatarProps {
  options: IOption[];
  selectedId?: string;
  label?: string;
  onChange: () => void;
  showSelectPlaceholder?: boolean;
}

export default function SelectMenuWithAvatar({
  options,
  selectedId,
  label,
  onChange,
  showSelectPlaceholder = false,
}: SelectMenuWithAvatarProps) {
  const [processedOptions, setProcessedOptions] = useState<IOption[]>([]);

  useEffect(() => {
    if (showSelectPlaceholder) {
      setProcessedOptions([...[{ id: null, name: 'Select...' }], ...options]);
    } else {
      setProcessedOptions(options);
    }
  }, [options]);

  const item = processedOptions.find((item) => item.id === selectedId);

  return (
    <Listbox value={selectedId} onChange={onChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            {item && (
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  {item?.avatar}
                  <span className="mx-3 block truncate">{item?.name}</span>
                  {item?.badge != null && (
                    <Badge
                      value={item.badge}
                      textColour="text-red-800"
                      backgroundColour="bg-red-100"
                      textSize="text-xs"
                      paddingHorizontal="px-3"
                    />
                  )}
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {processedOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-6 w-full flex-1'
                      )
                    }
                    value={option}
                  >
                    {() => (
                      <div className="flex flex-1 w-full justify-between">
                        <div className="flex">
                          {option.avatar}
                          <span
                            className={classNames(
                              selectedId === option.id
                                ? 'font-semibold'
                                : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {option.name}
                          </span>
                        </div>

                        {option.badge != null && (
                          <Badge
                            value={option.badge}
                            textColour="text-red-800"
                            backgroundColour="bg-red-100"
                            textSize="text-xs"
                            paddingHorizontal="px-3"
                          />
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
