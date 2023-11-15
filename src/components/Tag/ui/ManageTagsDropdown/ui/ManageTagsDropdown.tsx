import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { Tag } from '../../../../../features/task/interface.tasks';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { useAssignTag, useMultipleAssignTag, useTags } from '../../../../../features/workspace/tags/tagService';
import { TagItem } from './TagItem';
import { SearchAndAddNewTag } from './SearchAndAddNewTag';
import TaskTag from '../../TaskTag';
import TagIcon from '../../../../../assets/icons/TagIcon';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { setAssignTag } from '../../../../../features/task/checklist/checklistSlice';

interface ManageTagsDropdownProps {
  tagsArr: Tag[];
  entityId: string;
  entityType: string;
  icon?: React.ReactNode;
}

export function ManageTagsDropdown({ tagsArr, entityId, entityType, icon }: ManageTagsDropdownProps) {
  const dispatch = useAppDispatch();
  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const [searchValue, setSearchValue] = useState('');
  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  const { data: tags } = useTags();
  const { mutate: onAssign } = useAssignTag(entityId, entityType);
  const { mutate: onMultipleAssign } = useMultipleAssignTag();

  const newTags = tags ? tags.filter((i) => !tagsArr.map((j) => j.id).includes(i.id)) : [];
  const filteredTags = newTags.filter((tag) => tag.name.toLowerCase().includes(searchValue.toLowerCase()));

  const onClickAssign = (tag: Tag) => {
    dispatch(setAssignTag(tag));
    if (selectedTasksArray.length) {
      onMultipleAssign({ tagId: tag.id, entityIds: selectedTasksArray });
    } else {
      onAssign({ tagId: tag.id, entityId, entityType });
    }
  };

  const handleClose = () => {
    setShowSelectDropdown(null);
  };

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div onClick={(event) => setShowSelectDropdown(event.currentTarget)}>
        {icon ? (
          <button type="button">
            <span ref={relativeRef}>{icon}</span>
          </button>
        ) : (
          <button
            type="button"
            className="p-1 border rounded-md bg-transparent text-gray-400 hover:text-gray-700 bg-white"
          >
            <span ref={relativeRef}>
              <TagIcon className="w-3 h-3" />
            </span>
          </button>
        )}
      </div>

      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={showSelectDropdown}>
        <div style={{ ...cords }}>
          <div className="flex-col border bg-white px-2 w-60 h-fit py-1 outline-none flex items-start text-left rounded-md shadow-lg divide-y divide-gray-100 focus:outline-none">
            {/* task tags */}
            {tagsArr.length ? (
              <div className="flex flex-wrap items-center justify-start gap-3 py-2">
                {tagsArr.map((tag) => (
                  <TaskTag key={tag.id} tag={tag} entity_id={entityId} entity_type={entityType} />
                ))}
              </div>
            ) : null}

            <SearchAndAddNewTag
              entityId={entityId}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              entityType={entityType}
            />

            {/* new tags */}
            {filteredTags.length ? (
              filteredTags.map((tag) => (
                <TagItem
                  entityId={entityId}
                  key={tag.id}
                  tag={tag}
                  onClick={() => {
                    onClickAssign(tag);
                  }}
                  entityType={entityType}
                />
              ))
            ) : (
              <p className="p-1 py-3">Press Enter to create a new tag</p>
            )}
          </div>
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
