import React from 'react';
import PropTypes from 'prop-types';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { Spinner } from '../../common';
import { classNames } from "../../utils";

export default function ComboBoxWithAvatar({
  label,
  onQueryChange,
  onChange,
  selectedKey,
  options,
  hasNextPage,
  fetchNextPage,
  isFetching,
}) {
  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: false,
    rootMargin: '0px 0px 800px 0px',
  });

  return (
    <Combobox as="div" value={selectedKey} onChange={onChange}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => onQueryChange(event.target.value)}
          displayValue={(selected) => (selected ? options.find((option) => option.id === selected)?.name : null)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {options.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <>
              {options.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option.id}
                  className={({ active }) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
                >
                  {({ active }) => (
                    <>
                      <div className="flex items-center">
                        {option.avatar}
                        <span className={classNames('ml-3 truncate', selectedKey === option.id && 'font-semibold')}>{option.name}</span>
                      </div>

                      {selectedKey === option.id && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}

              {(isFetching || hasNextPage) && (
                <div className="mx-auto mt-3 mb-6 w-6 justify-center" ref={sentryRef}>
                  <Spinner size={22} color="#0F70B7" />
                </div>
              )}
            </>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

ComboBoxWithAvatar.defaultProps = {
  options: [],
  hasNextPage: false,
  fetchNextPage: null,
  isFetching: false,
};

ComboBoxWithAvatar.propTypes = {
  label: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedKey: PropTypes.string.isRequired,
  options: PropTypes.array,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  isFetching: PropTypes.bool,
};
