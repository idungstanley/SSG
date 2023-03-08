import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Badge from '../Badge';
import { cl } from '../../utils';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export interface IOption {
  id: string | null;
  name: string;
  avatar?: JSX.Element;
  badge?: number | null;
}

interface SelectMenuWithAvatarProps {
  options: IOption[];
  selectedId: string | null;
  label?: string;
  onChange: (e: { id: string }) => void;
  showSelectPlaceholder?: boolean;
}

export default function SelectMenuWithAvatar({
  options,
  selectedId,
  label,
  onChange,
  showSelectPlaceholder = false
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

  interface IAvatar {
    id: string;
  }

  const handleChange = (e: string) => {
    const value: IAvatar = JSON.parse(JSON.stringify(e)) as IAvatar;
    onChange(value.id);
  };

  return (
    <Listbox value={selectedId} onChange={handleChange}>
      {({ open }) => (
        <>
          {label && <Listbox.Label className="block mb-1 text-sm font-medium text-gray-700">{label}</Listbox.Label>}
          <div className="relative">
            {item && (
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  {item?.avatar}
                  <span className="block mx-3 truncate">{item?.name}</span>
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
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
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
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {processedOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      cl(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-6 w-full flex-1'
                      )
                    }
                    value={option}
                  >
                    {() => (
                      <div className="flex justify-between flex-1 w-full">
                        <div className="flex">
                          {option.avatar}
                          <span
                            className={cl(
                              selectedId === option.id ? 'font-semibold' : 'font-normal',
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
