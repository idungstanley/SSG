import { XMarkIcon } from '@heroicons/react/24/outline';
import { TagId, TaskId } from '../../../features/task/interface.tasks';
import { useUnassignTag } from '../../../features/workspace/tags/tagService';

interface UnassignTagProps {
  tagId: TagId;
  entityId: TaskId;
  entityType: string;
}

export function UnassignTag({ tagId, entityId, entityType }: UnassignTagProps) {
  const { mutate: onUnassign } = useUnassignTag(entityId);

  const onClickUnassign = () => {
    onUnassign({
      tagId,
      entityId,
      entityType
    });
  };

  return (
    <button
      onClick={onClickUnassign}
      className="absolute -right-3 -top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-300 opacity-0 group-hover:opacity-100"
    >
      <XMarkIcon className="w-3 h-3" />
    </button>
  );
}
