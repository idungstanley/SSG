/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import MenuDropdown from '../../../../../../../components/Dropdown/MenuDropdown';
import ListItem from '../../../../../../../components/tasks/ListItem';
import { getTaskListService } from '../../../../../../../features/task/taskService';
import { List } from '../../activetree.interfaces';

// interface IListDetails {
//   hub_id: string | null;
//   wallet_id: null | string;
//   parent_id: null | string;
//   archived_at: null | string;
//   deleted_at: null | string;
//   id: string;
//   name: string;
//   taskCount?: number;
//   updated_at: string;
//   created_at: string;
// }
export default function LList({
  list,
  leftMargin,
  paddingLeft
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
}) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  // const [listTaskDetails, getListTaskDetails] = useState<IListDetails[]>([]);

  const taskCountList = list.map((perList) => {
    const { data: listData } = getTaskListService({
      listId: perList.id as string | null | undefined,
      assigneeUserId: null
    });
    return listData?.pages[0]?.data.tasks.length;
  });

  const listDetails = list.map((perList, index) => {
    const taskCount = taskCountList[index];
    return { ...perList, taskCount };
  });
  // console.log(listTaskDetails);
  return (
    <>
      {listDetails.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <ListItem list={list} paddingLeft={paddingLeft} parentId={list.parent_id || list.hub_id || list.wallet_id} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </>
  );
}
