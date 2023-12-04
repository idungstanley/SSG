import { useEffect, useState } from 'react';
import { Capitalize } from '../../../../../../utils/NoCapWords/Capitalize';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setTaskRowFocus } from '../../../../../../features/task/taskSlice';

type Props = {
  fieldOptions: {
    title: string;
    callBack: () => void;
    icon: JSX.Element;
  }[];
  fieldType: string;
  taskId: string;
};

export function EmailWebsiteDropDown({ fieldOptions, fieldType, taskId }: Props) {
  const dispatch = useAppDispatch();

  const { taskRowFocus, KeyBoardSelectedTaskData } = useAppSelector((state) => state.task);

  const [mountGuard, setMountGuard] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' && focusedIndex === null) {
        setFocusedIndex(0);
      } else if (event.key === 'ArrowUp' && focusedIndex !== null && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown' && focusedIndex !== null && focusedIndex < fieldOptions.length - 1) {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
      }

      if (event.key === 'Enter' && focusedIndex !== null && focusedIndex < fieldOptions.length) {
        if (fieldOptions[focusedIndex].title === 'Copy') {
          setMountGuard(true);
        } else {
          fieldOptions[focusedIndex].callBack();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);
  useEffect(() => {
    if (focusedIndex) {
      fieldOptions[focusedIndex].callBack();
      dispatch(setTaskRowFocus(!taskRowFocus));
    }
  }, [mountGuard]);

  useEffect(() => {
    if (taskId === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(!taskRowFocus));
  }, [taskId, KeyBoardSelectedTaskData]);

  return (
    <div className="flex flex-col space-y-2 pt-1.5 pl-1 pb-0.5" style={{ width: '150px' }}>
      {fieldOptions.map((option, index) => (
        <button
          key={index}
          className={`flex w-full gap-2 items-center px-1 py-2 hover:bg-alsoit-gray-50 rounded ${
            focusedIndex === index ? 'bg-alsoit-gray-50' : ''
          }`}
          onClick={option.callBack}
        >
          {option.icon}
          <h1> {`${option.title} ${Capitalize(fieldType)}`}</h1>
        </button>
      ))}
    </div>
  );
}
