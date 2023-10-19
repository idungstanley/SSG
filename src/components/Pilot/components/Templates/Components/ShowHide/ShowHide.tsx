import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import HeaderItem from './HeaderItem';

function ShowHide() {
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  return (
    <div>
      {hideTask.length
        ? hideTask.map((listItem) => {
            return (
              <div key={listItem.field}>
                {listItem.value.toLowerCase() !== 'task' && <HeaderItem listItem={listItem} key={listItem.id} />}
              </div>
            );
          })
        : taskColumns?.map((listItem) => (
            <div key={listItem.field}>
              {listItem.value.toLowerCase() !== 'task' && <HeaderItem listItem={listItem} key={listItem.id} />}
            </div>
          ))}
    </div>
  );
}

export default ShowHide;
