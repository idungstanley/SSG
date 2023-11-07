import { Menu as HeadMenu } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { BiDroplet } from 'react-icons/bi';
import { Tag, TagId } from '../../../../../features/task/interface.tasks';
import { useDeleteTag, useUpdateTag } from '../../../../../features/workspace/tags/tagService';
import { cl } from '../../../../../utils';
import { SelectColor } from './SelectColor';
import TagActions from './TagActions';
import { FaTags } from 'react-icons/fa';
import { Menu } from '@mui/material';

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleFocusOff = () => {
    if (tag.name !== name) updateTag({ name });
  };

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
    <>
      <div className="flex space-x-2 items-center text-left w-full">
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
              'block bg-transparent focus:ring-inset focus:ring-primary-300 w-fit rounded-md border-0 py-1 text-sm leading-6'
            )}
            placeholder=""
          />
        </button>

        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
          <HeadMenu as="div" className="relative inline-block text-left">
            <div>
              <HeadMenu.Button className="inline-flex justify-center rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <EllipsisVerticalIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" aria-hidden="true" />
              </HeadMenu.Button>
            </div>
          </HeadMenu>
        </div>
      </div>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <TagActions items={actionsConfig} />
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={showSelectColorDropdown}
        onClose={() => setShowSelectColorDropdown(false)}
        style={{ marginTop: '100px', marginLeft: '30px' }}
      >
        <SelectColor onClick={handleClickColor} color={color} />
      </Menu>
    </>
  );
}
