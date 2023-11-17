import React, { useState } from 'react';
import { TagItem } from '../../../pages/workspace/tasks/component/taskData/DataRenderFunc';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTagService, UseUnAssignTagService } from '../../../features/workspace/tags/tagService';
import EditTagModal from '../../tags/EditTagModal';
import { IoCloseSharp } from 'react-icons/io5';
import { Menu } from '@mui/material';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { setUnassignTagChecklistItem } from '../../../features/task/checklist/checklistSlice';

interface taskTageProps {
  tag: TagItem;
  entity_id: string | undefined;
  entity_type: string | undefined;
}

export default function TaskTag({ tag, entity_id, entity_type }: taskTageProps) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { renameTagId, currentTaskIdForTag } = useAppSelector((state) => state.tag);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagState, setTagState] = useState<string>('');

  const unAssignTagMutation = useMutation(UseUnAssignTagService, {
    onSuccess: () => {
      if (entity_type === 'checklist_item') {
        dispatch(
          setUnassignTagChecklistItem({
            itemId: entity_id as string,
            tagId: tag.id
          })
        );
      } else {
        queryClient.invalidateQueries(['task']);
        queryClient.invalidateQueries(['sub-tasks']);
        queryClient.invalidateQueries(['checklist']);
      }
    }
  });

  const editTagNameMutation = useMutation(UseUpdateTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const handleEditTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagState(e.target.value);
  };

  const handleEditTagSubmit = async (e: React.FormEvent<HTMLFormElement>, currentTagId: string) => {
    e.preventDefault();
    await editTagNameMutation.mutateAsync({
      name: tagState,
      tag_id: currentTagId
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-2 -mr-5 drop-shadow-xl">
        {renameTagId === tag.id && currentTaskIdForTag === entity_id ? (
          <form onSubmit={(e) => handleEditTagSubmit(e, tag.id)}>
            <input
              type="text"
              value={tagState}
              onChange={(e) => handleEditTagChange(e)}
              name="tag"
              className="w-full h-10 text-gray-400"
            />
          </form>
        ) : (
          <div
            className="flex items-center text-white p-0.5 h-4 text-center space-x-1"
            style={{
              backgroundColor: `${tag.color}`,
              clipPath: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%)'
            }}
          >
            <div className="flex items-center font-bold truncate">
              <p className="pl-4" style={{ fontSize: '7px' }}>
                {tag.name.length > 10 ? tag.name.slice(0, 5) : tag.name}
              </p>
            </div>

            <div
              className="relative inline-block text-left"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}
            >
              <button type="button" className="flex text-sm font-bold">
                <AiOutlineEllipsis className="cursor-pointer" />
              </button>
            </div>
            <button
              className="pr-2 font-bold text-gray-300"
              style={{ fontSize: '9px' }}
              onClick={() =>
                unAssignTagMutation.mutateAsync({
                  tagId: tag.id,
                  currentTaskIdForTag: entity_id,
                  entity_type: entity_type
                })
              }
            >
              <IoCloseSharp />
            </button>
          </div>
        )}
      </div>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <EditTagModal taskId={entity_id} tag={tag} onClose={() => setAnchorEl(null)} />
      </Menu>
    </>
  );
}
