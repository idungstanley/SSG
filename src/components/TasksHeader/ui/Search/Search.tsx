import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setSearchValue } from '../../../../features/task/taskSlice';
import { useThrottle } from '../../../../hooks/useThrottle';

export function Search() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useThrottle(() => {
    if (inputRef.current) {
      const { value } = inputRef.current;
      dispatch(setSearchValue(value));
    }
  }, 500);

  return (
    <div className="relative border p-1 text-gray-500 items-center flex">
      <MagnifyingGlassIcon className="w-5 h-5" />

      <input
        onChange={onChange}
        ref={inputRef}
        type="text"
        className="block w-full h-5 alsoit-radius text-alsoit-gray-300-lg border-0 text-gray-700 ring-0 focus:ring-0 focus:outline-0 appearance-none"
        placeholder="Search task"
      />
      <EllipsisHorizontalIcon className="w-5 h-5" />
    </div>
  );
}
