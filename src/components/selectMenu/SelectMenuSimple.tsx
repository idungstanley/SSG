import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { cl } from '../../utils';
import { expiresIn } from '../../features/shared/shared.interfaces';

interface IOption {
  id: string;
  name: string | expiresIn;
}

interface SelectMenuSimpleProps {
  options: IOption[];
  selectedId?: string;
  label?: string;
  onChange: (value: string) => void;
}

export default function SelectMenuSimple({ options, selectedId, label, onChange }: SelectMenuSimpleProps) {
  const [processedOptions, setProcessedOptions] = useState<IOption[]>([]);

  useEffect(() => {
    setProcessedOptions([...options]);
  }, [options]);

  if (processedOptions.length === 0) {
    return null;
  }

  const onSelect = (val: string | IOption) => {
    const value = val as IOption;
    onChange(value.id);
  };

  return (
    <Listbox value={selectedId} onChange={onSelect}>
      {({ open }) => (
        <>
          {label && <Listbox.Label className="block mb-1 text-sm font-medium text-gray-700">{label}</Listbox.Label>}
          <div className="relative">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              <span className="block truncate">{processedOptions.find((item) => item.id === selectedId)?.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {processedOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      cl(
                        active ? 'text-white bg-primary-600' : 'text-gray-900',
                        'cursor-pointer select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={option}
                  >
                    {({ active }) => (
                      <>
                        <span
                          className={cl(selectedId === option.id ? 'font-semibold' : 'font-normal', 'block truncate')}
                        >
                          {option.name}
                        </span>

                        {selectedId === option.id ? (
                          <span
                            className={cl(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
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
        </>
      )}
    </Listbox>
  );
}
