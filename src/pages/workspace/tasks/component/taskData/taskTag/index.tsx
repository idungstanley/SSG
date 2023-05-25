import React, { useState } from 'react';
import { tagItem, renderDataProps } from '../DataRenderFunc';
import { useAppSelector } from '../../../../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTagService, UseUnAssignTagService } from '../../../../../../features/workspace/tags/tagService';
import EditTagModal from '../../../../../../components/tags/EditTagModal';
import { IoCloseSharp } from 'react-icons/io5';

export default function TaskTag({ taskColField, task, checklist_itemId, entity_type }: renderDataProps) {
  const groupTags = (arr: tagItem[]) => {
    const { renameTagId, currentTaskIdForTag } = useAppSelector((state) => state.tag);
    const queryClient = useQueryClient();

    const unAssignTagMutation = useMutation(UseUnAssignTagService, {
      onSuccess: () => {
        queryClient.invalidateQueries();
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

    const [tagState, setTagState] = useState<string>('');

    const handleEditTagSubmit = async (e: React.FormEvent<HTMLFormElement>, currentTagId: string) => {
      e.preventDefault();
      await editTagNameMutation.mutateAsync({
        name: tagState,
        tag_id: currentTagId
      });
    };

    return (
      <div key={arr.length} className="flex items-center -mr-5 drop-shadow-xl">
        {arr.map((item: tagItem) => {
          return (
            <div key={item.id} className="">
              {Array.isArray(item) ? (
                <div className="">{groupTags(item)}</div>
              ) : (
                <>
                  {renameTagId == item.id && currentTaskIdForTag == task?.id ? (
                    <form onSubmit={(e) => handleEditTagSubmit(e, item.id)}>
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
                      className="flex items-center text-white p-0.5 h-4 text-center space-x-1 mr-1.5"
                      style={{
                        backgroundColor: `${item.color}`,
                        clipPath: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%)'
                      }}
                    >
                      <div className="flex items-center font-bold truncate">
                        <p className="pl-4" style={{ fontSize: '7px' }}>
                          {item.name.length > 10 ? item.name.slice(0, 5) : item.name}
                        </p>
                      </div>
                      <EditTagModal taskId={task?.id} tagId={item?.id} />
                      <button
                        className="pr-2 font-bold text-gray-300"
                        style={{ fontSize: '9px' }}
                        onClick={() =>
                          unAssignTagMutation.mutateAsync({
                            tagId: item.id,
                            currentTaskIdForTag: entity_type === 'checklist_item' ? checklist_itemId : task?.id,
                            entity_type: entity_type
                          })
                        }
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div> {groupTags(taskColField as tagItem[])}</div>
    </>
  );
}
