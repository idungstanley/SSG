import { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { Tag, TagId } from '../../../../../features/task/interface.tasks';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { useAssignTag, useTags } from '../../../../../features/workspace/tags/tagService';
// import { TagList } from '../../TagList';
import { TagItem } from './TagItem';
import { SearchAndAddNewTag } from './SearchAndAddNewTag';
import TaskTag from '../../TaskTag';
import TagIcon from '../../../../../assets/icons/TagIcon';
import AlsoitMenuDropdown from '../../../../DropDowns';

interface ManageTagsDropdownProps {
  tagsArr: Tag[];
  entityId: string;
  entityType: string;
}

export function ManageTagsDropdown({ tagsArr, entityId, entityType }: ManageTagsDropdownProps) {
  const { data: tags } = useTags();
  const { mutate: onAssign } = useAssignTag(entityId);
  const [searchValue, setSearchValue] = useState('');

  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  const newTags = tags ? tags.filter((i) => !tagsArr.map((j) => j.id).includes(i.id)) : [];
  const filteredTags = newTags.filter((tag) => tag.name.toLowerCase().includes(searchValue.toLowerCase()));

  const onClickAssign = (id: TagId) => {
    onAssign({ tagId: id, entityId: entityId, entityType: entityType });
  };

  const handleClose = () => {
    setShowSelectDropdown(null);
  };

  const onClickOpenDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={(event) => {
            setShowSelectDropdown(event.currentTarget);
            onClickOpenDropdown(event);
          }}
          className="p-1 border rounded-md bg-transparent text-gray-400 hover:text-gray-700 bg-white"
        >
          <span ref={relativeRef}>
            <TagIcon className="w-3 h-3" />
          </span>
        </button>
      </div>

      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={showSelectDropdown}>
        <div style={{ ...cords }} className="">
          <div className="flex-col pr-5 border bg-white px-2 w-72 h-fit py-1 outline-none flex items-start text-left rounded-md shadow-lg divide-y divide-gray-100 focus:outline-none">
            {/* task tags */}
            {tagsArr.length ? (
              <div className="flex flex-wrap items-center py-2">
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <TaskTag tags={tagsArr} entity_id={entityId} entity_type="task" />
                </div>
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
                  onClick={(id) => onClickAssign(id)}
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
