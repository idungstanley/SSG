import React, { useState } from 'react';
import { List } from '../../activetree.interfaces';
import SearchListItem from '../../../../../../../components/tasks/SearchListItem';
import LineUpBrowseTask from '../../../../../home/body/lineUp/LineUpBrowseTask';
import { BROWSE_TASKS_FROM_HOME } from '../../../../../tasks/component/taskMenu/TaskMenu';

export default function SearchLList({
  list,
  leftMargin,
  paddingLeft,
  option
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
  option?: string;
}) {
  const [listId, setListId] = useState<string>('');

  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <div
            onClick={() => {
              !listId ? setListId(list.id) : setListId('');
            }}
          >
            <SearchListItem
              option={option}
              list={list}
              paddingLeft={paddingLeft}
              parentId={list.parent_id || list.hub_id || list.wallet_id}
            />
          </div>

          {listId === list.id && option === BROWSE_TASKS_FROM_HOME && <LineUpBrowseTask listId={list.id} />}
        </div>
      ))}
    </>
  );
}
