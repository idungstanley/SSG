import { useState, useEffect } from 'react';
import { Tag, TaskId } from '../../../features/task/interface.tasks';
import { TagItem } from './TagItem';
import { UnassignTag } from './UnassignTag';

interface TagListProps {
  entityId: TaskId;
  tags: Tag[];
  defaultBg?: boolean;
  entityType: string;
}

export function TagList({ entityId, tags, defaultBg, entityType }: TagListProps) {
  const [tagArr, setTagArr] = useState<Tag[]>([]);
  const [tagLen, setTagLen] = useState<null | number>(null);

  useEffect(() => {
    if (tags.length > 3) {
      const truncatedArr = tags.slice(0, 3);
      setTagArr(truncatedArr);
      setTagLen(tags.length - 3);
    } else {
      setTagArr(tags);
      setTagLen(null);
    }
  }, [tags]);

  if (!tagArr.length) {
    return null;
  }

  return (
    <>
      {tagArr.map((tag) => (
        <TagItem defaultBg={defaultBg} key={tag.id} entityId={entityId} id={tag.id} name={tag.name} color={tag.color}>
          <UnassignTag entityId={entityId} tagId={tag.id} entityType={entityType} />
        </TagItem>
      ))}
      {tagLen !== null && <span className="bg-gray-300 p-1 rounded-full">+{tagLen}</span>}
    </>
  );
}
