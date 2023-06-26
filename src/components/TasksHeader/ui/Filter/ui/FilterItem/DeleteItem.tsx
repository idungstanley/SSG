import { TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setFilterFields } from '../../../../../../features/task/taskSlice';
import { FilterId } from '../../types/filters';

interface DeleteItemProps {
  id: FilterId;
}

export function DeleteItem({ id }: DeleteItemProps) {
  const dispatch = useAppDispatch();
  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const onDelete = () => dispatch(setFilterFields(filters.filter((i) => i.id !== id)));

  return (
    <button type="button" onClick={onDelete}>
      <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
    </button>
  );
}
