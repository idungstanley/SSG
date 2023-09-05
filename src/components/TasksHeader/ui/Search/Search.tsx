import { useState } from 'react';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setSearchValue } from '../../../../features/task/taskSlice';
import { useThrottle } from '../../../../hooks/useThrottle';

interface ISearchProps {
  isSplitSubtasks?: boolean;
}
export function Search({ isSplitSubtasks }: ISearchProps) {
  const dispatch = useAppDispatch();

  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useThrottle(() => {
    if (inputRef.current) {
      const { value } = inputRef.current;
      dispatch(setSearchValue(value));
    }
  }, 500);

  if (isSplitSubtasks) {
    return (
      <div className="searchHover group relative p-1 text-gray-500 items-center flex">
        <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowInput(!showInput)} />

        {showInput ? (
          <>
            <input
              onChange={onChange}
              ref={inputRef}
              type="text"
              className="block w-full h-5 alsoit-radius text-alsoit-gray-300-lg border-0 text-gray-700 ring-0 focus:ring-0 focus:outline-0 appearance-none"
              placeholder="Search subtask"
            />
            <EllipsisHorizontalIcon className="w-5 h-5 group-hover:text-primary-400" />
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="searchHover group relative border p-1 text-gray-500 items-center flex">
      <MagnifyingGlassIcon className="w-5 h-5" />

      <input
        onChange={onChange}
        ref={inputRef}
        type="text"
        className="block w-full h-5 alsoit-radius text-alsoit-gray-300-lg border-0 text-gray-700 ring-0 focus:ring-0 focus:outline-0 appearance-none"
        placeholder="Search task"
      />
      <EllipsisHorizontalIcon className="w-5 h-5 group-hover:text-primary-400" />
    </div>
  );
}
