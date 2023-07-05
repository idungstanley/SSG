import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { useList } from '../../../../../features/list/listService';
import { columnsHead, listColumnProps } from '../../../../../pages/workspace/tasks/component/views/ListColumns';
import { BsCheck2 } from 'react-icons/bs';
import { hideTaskColumns } from '../../../../../features/task/taskSlice';

const unique = (arr: listColumnProps[]) => [...new Set(arr)];
export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};
function ShowHide() {
  const dispatch = useAppDispatch();
  const { listIdForCustom } = useAppSelector((state) => state.task);
  const [colums, setColumns] = useState<listColumnProps[]>();

  const { data } = useList(listIdForCustom);

  useEffect(() => {
    if (!data) {
      return;
    }

    const customFieldNames = data.custom_fields.map((i) => ({
      value: i.name,
      id: i.id,
      field: i.type,
      hidden: false
    }));

    const newColumns = unique([...columnsHead, ...customFieldNames]);
    // dispatch(getTaskColumns(newColumns));
    setColumns(newColumns);
  }, [data]);
  return (
    <div>
      {colums?.map((listItem) => (
        <div key={listItem.field}>
          <div
            className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 z-30 w-full"
            onClick={() => dispatch(hideTaskColumns(listItem.field))}
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
        </div>
      ))}
    </div>
  );
}

export default ShowHide;
