import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemActionForSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { Input } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  useCreateFolder,
  useRenameItem,
} from '../../../../features/explorer/explorerActionsService';

export default function CreateOrRenameItemSlideOver() {
  const dispatch = useDispatch();

  const { itemActionForSideOver } = useAppSelector((state) => state.slideOver);

  const isCreateAction = itemActionForSideOver?.action === 'create';

  const [itemName, setItemName] = useState(itemActionForSideOver?.name || '');

  useEffect(() => {
    setItemName(itemActionForSideOver?.name || '');
  }, [itemActionForSideOver]);

  const { mutate: onRename } = useRenameItem();
  const { mutate: onCreate } = useCreateFolder(itemActionForSideOver?.id || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreateAction) {
      onCreate({
        folderName: itemName,
        parentId: itemActionForSideOver.id,
      });
    } else {
      if (itemActionForSideOver) {
        onRename({
          type: 'folder',
          id: itemActionForSideOver.id,
          name: itemName,
        });
      }
    }
    onClose();
  };

  const onClose = () => dispatch(setItemActionForSideOver(null));

  return (
    <Transition.Root show={!!itemActionForSideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0  overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 top-20 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {isCreateAction
                            ? 'Create new folder'
                            : `Rename folder`}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="py-6 w-full space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 space-y-1 h-full flex flex-col justify-between sm:space-y-0"
                      >
                        <Input
                          label={`Folder name`}
                          placeholder={`Folder name`}
                          name="name"
                          value={itemName}
                          type="text"
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="p-2 text-base text-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
                        >
                          {isCreateAction ? 'Create' : 'Rename'}
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
