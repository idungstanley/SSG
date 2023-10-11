import React from 'react';
import { Tag } from '../../../../../../features/task/interface.tasks';
import { cl } from '../../../../../../utils';
import { FaTags } from 'react-icons/fa';
import '../../../../../../styles/task.css';

interface TagsProps {
  tags: Tag[];
}

function TagsWrapper({ tags }: TagsProps) {
  return (
    <div className="w-full">
      {tags.length ? (
        <div className="w-full flex flex-wrap justify-center gap-1 items-center p-1">
          {tags?.map((value) => {
            return (
              <div
                key={value.id}
                className={cl(
                  value.color ? 'text-white' : 'border-2 border-gray-500',
                  'rounded py-2 px-4 max-w-full custom-property-tags flex items-center'
                )}
                style={{ backgroundColor: value.color }}
              >
                <h3 className="text-alsoit-text-md max-w-full truncate">{value.name}</h3>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <FaTags className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

export default TagsWrapper;
