import { TrashIcon } from '@heroicons/react/24/outline';

interface DeleteItemProps {
  onClick: VoidFunction;
}

export function DeleteItem({ onClick }: DeleteItemProps) {
  return (
    <button type="button" onClick={onClick}>
      <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
    </button>
  );
}
