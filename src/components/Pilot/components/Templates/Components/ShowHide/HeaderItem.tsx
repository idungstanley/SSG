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
          className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 z-30 w-full"
          onClick={() => dispatch(hideTaskColumns(listItem.id))}
          key={listItem.field}
        >
          {!listItem.hidden ? (
            <p className="flex w-11/12 justify-between items-center">
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
