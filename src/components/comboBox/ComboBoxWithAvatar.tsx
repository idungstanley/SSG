import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Combobox } from '@headlessui/react';
import { Spinner } from '../../common';
import { classNames } from '../../utils';

interface optionsDataType {
  id: string;
  name: string;
  avatar: string | JSX.Element;
}

interface ComboBoxWithAvatarTypes {
  label: string;
  onQueryChange: (value: string) => void;
  onChange: (value: string) => void;
  selectedKey: string;
  options: optionsDataType[];
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
}

export default function ComboBoxWithAvatar({
  label,
  onQueryChange,
  onChange,
  selectedKey,
  options,
  hasNextPage,
  fetchNextPage,
  isFetching,
}: ComboBoxWithAvatarTypes) {
  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: false,
    rootMargin: '0px 0px 800px 0px',
  });

  return (
    <Combobox as="div" value={selectedKey} onChange={onChange}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onQueryChange(event.target.value)
          }
          displayValue={(selected: string) =>
            options.find((option) => option.id === selected)?.name || ''
          }
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
          <ChevronUpDownIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        {options.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <>
              {options.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option.id}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active }) => (
                    <>
                      <div className="flex items-center">
                        {option.avatar}
                        <span
                          className={classNames(
                            'ml-3 truncate',
                            selectedKey === option.id
                              ? 'font-semibold'
                              : 'font-normal'
                          )}
                        >
                          {option.name}
                        </span>
                      </div>

                      {selectedKey === option.id && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}

              {(isFetching || hasNextPage) && (
                <div
                  className="flex justify-center mx-auto mt-3 mb-6"
                  ref={sentryRef}
                >
                  <Spinner size={8} color="#0F70B7" />
                </div>
              )}
            </>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
