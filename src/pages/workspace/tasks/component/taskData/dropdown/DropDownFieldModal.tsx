import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { cl } from '../../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { Task } from '../../../../../../features/task/interface.tasks';
import { setTaskRowFocus } from '../../../../../../features/task/taskSlice';
import { isArray } from '../../../../../../utils/typeGuards';

type field = {
  id: string;
  color: string;
  name: string;
};

type Props = {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  activeOption: field | undefined;
  handleClearField: () => void;
  filteredOptions: field[] | undefined;
  handleClick: (option: field) => void;
  handleEditCustom: () => void;
  task: Task;
};

export function DropDownFieldModal({
  activeOption,
  filteredOptions,
  handleClearField,
  handleClick,
  handleEditCustom,
  handleSearchChange,
  inputRef,
  searchValue,
  task
}: Props) {
  const dispatch = useAppDispatch();

  const { KeyBoardSelectedTaskData, taskRowFocus } = useAppSelector((state) => state.task);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && focusedIndex !== null && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown' && filteredOptions) {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, filteredOptions.length - 1)));
      }

      if (
        event.key === 'Enter' &&
        focusedIndex !== null &&
        isArray(filteredOptions) &&
        focusedIndex < filteredOptions.length
      ) {
        handleClick(filteredOptions[focusedIndex]);
      }
    };

    if (!isArray(filteredOptions) && btnRef.current) {
      btnRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);

  useEffect(() => {
    if (task.id === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(!taskRowFocus));
  }, [task, KeyBoardSelectedTaskData]);
  return (
    <div
      className="flex flex-col items-center justify-center p-4 text-center outline-none h-fit"
      style={{ maxWidth: '195px' }}
    >
      <div className="flex items-center max-w-full">
        <SearchIcon className="w-3 h-3" />
        <input
          onChange={handleSearchChange}
          value={searchValue}
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="w-11/12 h-4 border-0 ring-0 outline-0 focus:ring-0 focust:outline-0 focus:border-0"
        />
      </div>
      <div className="w-full pt-3 space-y-2">
        {activeOption?.name ? (
          <button
            onClick={handleClearField}
            className={cl('text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate rounded')}
            style={{ backgroundColor: 'white', maxWidth: '195px' }}
          >
            -
          </button>
        ) : null}

        {Array.isArray(filteredOptions)
          ? filteredOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleClick(option)}
                className={cl(
                  'text-gray-700 py-2 bg-white border w-full text-center block px-4 text-sm truncate rounded',
                  option.color ? 'text-white' : ''
                )}
                style={{ backgroundColor: option.color, maxWidth: '195px' }}
              >
                {option.name}
              </button>
            ))
          : null}
        <button
          ref={btnRef}
          tabIndex={0}
          className={cl(
            'text-gray-700 py-2 bg-alsoit-purple-50 border w-full text-center block px-4 text-sm font-semibold hover:text-alsoit-purple-300'
          )}
          onClick={handleEditCustom}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditCustom();
          }}
        >
          Add/Edit Options
        </button>
      </div>
    </div>
  );
}
