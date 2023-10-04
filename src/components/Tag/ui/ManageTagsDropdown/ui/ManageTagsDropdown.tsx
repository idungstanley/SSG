import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppSelector } from '../../../../../app/hooks';
import { Tag, TagId } from '../../../../../features/task/interface.tasks';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { useAssignTag, useTags } from '../../../../../features/workspace/tags/tagService';
// import { TagList } from '../../TagList';
import { TagItem } from './TagItem';
import { SearchAndAddNewTag } from './SearchAndAddNewTag';
import TaskTag from '../../TaskTag';
import TagIcon from '../../../../../assets/icons/TagIcon';

interface ManageTagsDropdownProps {
  tagsArr: Tag[];
  entityId: string;
  entityType: string;
}

export function ManageTagsDropdown({ tagsArr, entityId, entityType }: ManageTagsDropdownProps) {
  const { data: tags } = useTags();
  const { mutate: onAssign } = useAssignTag(entityId);
  const [searchValue, setSearchValue] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const newTags = tags ? tags.filter((i) => !tagsArr.map((j) => j.id).includes(i.id)) : [];
  const filteredTags = newTags.filter((tag) => tag.name.toLowerCase().includes(searchValue.toLowerCase()));

  const onClickAssign = (id: TagId) => {
    onAssign({ tagId: id, entityId: entityId, entityType: entityType });
  };

  const onClickOpenDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={onClickOpenDropdown}
          className="p-1 border rounded-md bg-transparent text-gray-400 hover:text-gray-700 bg-white"
        >
          <div ref={relativeRef}>
            <TagIcon className="w-3 h-3" />
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed">
            <div className="flex-col pr-5 border bg-white px-2 w-72 h-fit py-1 outline-none flex items-start text-left mt-2 rounded-md shadow-lg divide-y divide-gray-100 focus:outline-none">
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
        </Dialog>
      </Transition>
    </>
  );
}
