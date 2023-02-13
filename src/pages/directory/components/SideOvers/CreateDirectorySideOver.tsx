import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SideOver from '../../../../components/SideOver';
import { useCreateDirectory } from '../../../../features/directory/directoryActionService';
import { setShowCreateDirectorySlideOver } from '../../../../features/general/slideOver/slideOverSlice';

export default function Watchers() {
  const dispatch = useAppDispatch();
  const { showCreateDirectorySlideOver: show } = useAppSelector(
    (state) => state.slideOver
  );

  const { mutate: onCreate } = useCreateDirectory();

  const directoryNameRef = useRef<HTMLInputElement>(null);

  const onClose = () => dispatch(setShowCreateDirectorySlideOver(false));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = directoryNameRef.current?.value;

    if (name && name.length > 2) {
      onCreate({
        name: name.trim(),
      });

      directoryNameRef.current.value = '';

      onClose();
    }
  };
  return (
    <SideOver show={show} onClose={onClose} title="Directory">
      <form
        className="relative flex gap-3 items-center p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Directory name"
          ref={directoryNameRef}
          className="block w-full rounded-md border-gray-300 shadow-sm ring-0 focus:ring-0 sm:text-sm"
        />

        <button
          type="submit"
          className="inline-flex items-center cursor-pointer"
        >
          <PaperAirplaneIcon
            className="h-6 w-6 stroke-current text-indigo-600 inline-block"
            aria-hidden="true"
          />
        </button>
      </form>
    </SideOver>
  );
}
