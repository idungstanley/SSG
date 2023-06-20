import { Tag, TaskId } from '../../../features/task/interface.tasks';
import { TagList } from './TagList';

interface TagsProps {
  entityId: TaskId;
  tags: Tag[];
  entityType: string;
}

export function Tags({ entityId, tags, entityType }: TagsProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      <TagList tags={tags} entityId={entityId} entityType={entityType} />
    </div>
  );
}
