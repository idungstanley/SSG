import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { getListServices } from '../../../../../features/list/listService';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';
import ListItem from '../../../../../components/tasks/ListItem';

interface LastListIndexProps {
  finalParentId: string;
}

export default function LastListIndex({ finalParentId }: LastListIndexProps) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { toggleArchiveList } = useAppSelector((state) => state.list);

  const { data: dataList } = getListServices({
    walletId: finalParentId,
    Archived: toggleArchiveList,
  });
  return dataList?.data.lists != null ? (
    <section>
      {dataList?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
          <ListItem paddingLeft="100" list={list} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </section>
  ) : null;
}
