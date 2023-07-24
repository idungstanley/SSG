import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { getListServices } from '../../../../../features/list/listService';
import ListItem from '../../../../../components/tasks/ListItem';
import { IList } from '../../../../../features/hubs/hubs.interfaces';

interface LastListIndexProps {
  finalParentId: string;
  paddingLeft?: string | number;
}

export default function LastListIndex({ finalParentId, paddingLeft }: LastListIndexProps) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { toggleArchiveList } = useAppSelector((state) => state.list);

  const { data: dataList } = getListServices({
    walletId: finalParentId,
    Archived: toggleArchiveList
  });
  return dataList?.data.lists != null ? (
    <section>
      {dataList?.data.lists.map((list: IList) => (
        <div key={list.id}>
          <ListItem paddingLeft={Number(paddingLeft) + 15} list={list} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </section>
  ) : null;
}
