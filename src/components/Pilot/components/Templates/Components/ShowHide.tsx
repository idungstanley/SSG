import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { BsCheck2 } from 'react-icons/bs';
import { hideTaskColumns } from '../../../../../features/task/taskSlice';

function ShowHide() {
  const dispatch = useAppDispatch();
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  return (
    <div>
      {hideTask.length
        ? hideTask.map((listItem) => {
            return (
              <div key={listItem.field}>
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
              </div>
            );
          })
        : taskColumns?.map((listItem) => (
            <div key={listItem.field}>
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
            </div>
          ))}
    </div>
  );
}

export default ShowHide;
