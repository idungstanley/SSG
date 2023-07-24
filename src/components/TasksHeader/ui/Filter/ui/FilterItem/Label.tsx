import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setFilterOption } from '../../../../../../features/task/taskSlice';
import { cl } from '../../../../../../utils';

interface LabelProps {
  disabled?: boolean;
  isButton?: boolean;
}

export function Label({ disabled, isButton }: LabelProps) {
  const dispatch = useAppDispatch();
  const {
    filters: { option }
  } = useAppSelector((state) => state.task);

  const onToggle = () => dispatch(setFilterOption(option === 'and' ? 'or' : 'and'));

  return isButton ? (
    <button
      disabled={disabled}
      onClick={!disabled ? onToggle : undefined}
      className={cl(
        disabled ? 'bg-gray-100 text-gray-400' : 'bg-white',
        'relative w-12 flex justify-center uppercase cursor-pointer whitespace-nowrap rounded-lg border py-2 text-left shadow-sm'
      )}
    >
      {option}
    </button>
  ) : (
    <p className="block w-12">Where</p>
  );
}
