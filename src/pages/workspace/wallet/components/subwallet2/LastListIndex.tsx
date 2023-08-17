import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import ListItem from '../../../../../components/tasks/ListItem';
import { List } from '../../../hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentWallet } from '../../../../../managers/Wallet';

interface LastListIndexProps {
  parentId: string;
  paddingLeft?: string | number;
}

export default function LastListIndex({ parentId, paddingLeft }: LastListIndexProps) {
  const { showMenuDropdown, hub } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [lists, setLists] = useState<List[]>();

  useEffect(() => {
    if (activeItemId || parentId) {
      const currentEntity = findCurrentWallet(parentId || (activeItemId as string), hub);
      const listsData = currentEntity.lists;
      setLists(listsData);
    }
  }, [activeItemId, parentId]);

  return lists ? (
    <section>
      {lists.map((list) => (
        <div key={list.id}>
          <ListItem paddingLeft={Number(paddingLeft) + 15} list={list} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </section>
  ) : null;
}
