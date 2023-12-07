import React from 'react';
import { listColumnProps } from '../../../../../../pages/workspace/tasks/component/views/ListColumns';
import { useAppDispatch } from '../../../../../../app/hooks';
import { hideTaskColumns } from '../../../../../../features/task/taskSlice';
import { BsCheck2 } from 'react-icons/bs';

interface HeaderItemProps {
  listItem: listColumnProps;
}

function HeaderItem({ listItem }: HeaderItemProps) {
  const dispatch = useAppDispatch();
  return (
    <div key={listItem.field}>
      {listItem.value.toLowerCase() !== 'task' && (
        <div
          className="z-30 flex items-center w-full gap-3 py-2 pl-4 mt-0 capitalize cursor-pointer text-slate-600 hover:bg-gray-300"
          onClick={() => dispatch(hideTaskColumns(listItem.id))}
          key={listItem.field}
        >
          {!listItem.hidden ? (
            <p className="flex items-center justify-between w-11/12">
              <span>{listItem.value}</span>
              <span>
                <BsCheck2 />
              </span>
            </p>
          ) : (
            <p>{listItem.value}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderItem;
