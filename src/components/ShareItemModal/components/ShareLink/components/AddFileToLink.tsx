import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import {
  IExplorerFile,
} from '../../../../../features/explorer/explorer.interfaces';
import { useGetSearchFiles } from '../../../../../features/explorer/explorerService';
import {
  useAddOrRemoveItemToOrFromLink,
  useGetShareLink,
} from '../../../../../features/shared/sharedService';
import { useDebounce } from '../../../../../hooks';
import { classNames } from '../../../../../utils';

interface AddFileToLinkProps {
  shareLinkId: string;
}

export default function AddFileToLink({ shareLinkId }: AddFileToLinkProps) {
  const { data } = useGetShareLink(shareLinkId);

  const { mutate: onAdd } = useAddOrRemoveItemToOrFromLink(shareLinkId);

  const selectedFiles = data?.shared_files;
  const selectedFileIds = selectedFiles?.map((i) => i.id);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { data: searchedFiles } = useGetSearchFiles(debouncedQuery);

  const filesWithoutSelected = searchedFiles?.filter(
    (i) => !selectedFileIds?.includes(i.id)
  );

  const filteredFiles =
    debouncedQuery === ''
      ? filesWithoutSelected
      : filesWithoutSelected?.filter((file) => {
          return file.display_name
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase());
        });

  const onSelect = (selectedFile: IExplorerFile | string) => {
    const file = selectedFile as IExplorerFile;

    onAdd({
      linkId: shareLinkId,
      itemId: file.id,
      type: 'file',
      action: 'add',
    });
  };

  return (
    <Combobox as="div" value={''} onChange={onSelect}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Add file to link
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          placeholder="enter file name"
          className="w-full h-10 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(file) => String(file)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </Combobox.Button>

        {filteredFiles && filteredFiles.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredFiles.map((file) => (
              <Combobox.Option
                key={file.id}
                value={file}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected ? 'font-semibold' : ''
                      )}
                    >
                      {file.display_name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
