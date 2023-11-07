import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiTrash } from 'react-icons/bi';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsDroplet } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { displayPrompt, setVisibility } from '../../features/general/prompt/promptSlice';
import { UseDeleteTagsService, useUpdateTag } from '../../features/workspace/tags/tagService';
import { setCurrentTaskIdForTag, setRenameTagId } from '../../features/workspace/tags/tagSlice';
import { TagItem } from '../../pages/workspace/tasks/component/taskData/DataRenderFunc';
import { Menu } from '@mui/material';
import { SelectColor } from '../Tag/ui/ManageTagsDropdown/ui/SelectColor';
import { EntityType } from '../../utils/EntityTypes/EntityType';

interface ItemsType {
  id: string;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
}

interface EditTagModalProps {
  tag: TagItem;
  taskId: string | null | undefined;
  onClose: () => void;
}

export default function EditTagModal({ tag, taskId, onClose }: EditTagModalProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { color: initialColor } = tag;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [color, setColor] = useState(initialColor);

  const { mutate: onUpdate } = useUpdateTag(tag.id, EntityType.task);
  const deleteTagMutation = useMutation(UseDeleteTagsService, {
    onSuccess: () => {
      dispatch(setVisibility(false));
      queryClient.invalidateQueries(['task']);
    }
  });

  const updateTag = (data: { name?: string; color?: string }) => {
    onUpdate({
      id: tag.id,
      name: data.name?.trim(),
      color: data.color
    });
  };

  const EditTagOptions: ItemsType[] = [
    {
      id: 'delete',
      title: 'Delete',
      handleClick: () => {
        onClose();
        dispatch(
          displayPrompt('Delete Tag', 'Would you like delete this tag from the workspace?', [
            {
              label: 'Delete tag',
              style: 'danger',
              callback: () => {
                deleteTagMutation.mutateAsync({
                  trigger: 1,
                  tag_id: tag.id
                });
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      },
      icon: <BiTrash />
    },
    {
      id: 'rename',
      title: 'Rename',
      handleClick: () => {
        dispatch(setRenameTagId(tag.id));
        dispatch(setCurrentTaskIdForTag(taskId));
      },
      icon: <HiOutlinePencil />
    },
    {
      id: 'change_color',
      title: 'Change Color',
      handleClick: () => null,
      icon: <BsDroplet />
    }
  ];

  const handleClickColor = (i: string) => {
    setColor(i);
    updateTag({ color: i });
    setAnchorEl(null);
  };

  return (
    <>
      <div className="w-48 p-1">
        {EditTagOptions.map((item) => (
          <div key={item.id}>
            {item.title !== 'Change Color' ? (
              <div className="p-2 cursor-pointer rounded-md hover:bg-gray-300" onClick={item.handleClick}>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  {item.icon}
                  <p>{item.title}</p>
                </div>
              </div>
            ) : (
              <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
                <div className="p-2 cursor-pointer rounded-md hover:bg-gray-300">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    {item.icon}
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)} style={{ marginLeft: '30px' }}>
        <SelectColor onClick={handleClickColor} color={color} />
      </Menu>
    </>
  );
}
