import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { BiDroplet } from 'react-icons/bi';
import { Tag, TagId } from '../../../../../features/task/interface.tasks';
import { useDeleteTag, useUpdateTag } from '../../../../../features/workspace/tags/tagService';
import { cl } from '../../../../../utils';
import { SelectColor } from './SelectColor';
import TagActions from './TagActions';
import { FaTags } from 'react-icons/fa';

interface TagItemProps {
  tag: Tag;
  onClick: (i: TagId) => void;
  entityId: string;
  entityType: string;
}

export function TagItem({ tag, onClick, entityId, entityType }: TagItemProps) {
  const { id, name: initialName, color: initialColor } = tag;
  const { mutate: onDelete } = useDeleteTag(entityId, entityType);
  const { mutate: onUpdate } = useUpdateTag(entityId, entityType);

  const [color, setColor] = useState(initialColor);
  const [name, setName] = useState(initialName);

  const [showSelectColorDropdown, setShowSelectColorDropdown] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const updateTag = (data: { name?: string; color?: string }) => {
    setIsEditable(false);
    onUpdate({
      id,
      name: data.name?.trim(),
      color: data.color
    });
  };

  const actionsConfig = [
    {
      name: 'Assign Tag',
      onClick: () => onClick(id),
      icon: <FaTags className="w-4 h-4" />
    },
    {
      name: 'Delete',
      onClick: () => onDelete({ tagId: id }),
      icon: <TrashIcon className="w-4 h-4" />
    },
    {
      name: 'Edit',
      onClick: () => setIsEditable(true),
      icon: <PencilIcon className="w-4 h-4" />
    },
    {
      name: 'Change color',
      onClick: () => setShowSelectColorDropdown(true),
      icon: <BiDroplet className="w-4 h-4" />
    }
  ];

  const handleFocusOff = () => updateTag({ name });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      updateTag({ name });
    }
  };

  const handleClickColor = (i: string) => {
    setColor(i);

    updateTag({ color: i });

    setShowSelectColorDropdown(false);
  };

  return (
    <div className="flex space-x-2 items-center py-2 text-left px-3 w-full">
      <button type="button">
        <input
          onChange={(e) => setName(e.target.value)}
          onBlur={handleFocusOff}
          onKeyDown={handleKeyDown}
          required
          value={name}
          autoFocus={isEditable}
          minLength={2}
          type="text"
          className={cl(
            `text-${color}-700`,
            'block bg-transparent focus:shadow-sm focus:ring-1 focus:ring-inset focus:ring-primary-300 w-fit rounded-md border-0 py-1.5 text-sm leading-6'
          )}
          placeholder=""
        />
      </button>

      <TagActions items={actionsConfig} />

      <SelectColor show={showSelectColorDropdown} onClick={handleClickColor} color={color} />
    </div>
  );
}
