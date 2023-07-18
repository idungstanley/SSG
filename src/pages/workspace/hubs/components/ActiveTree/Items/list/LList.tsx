/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import ListItem from '../../../../../../../components/tasks/ListItem';
import { List } from '../../activetree.interfaces';
import { useAppSelector } from '../../../../../../../app/hooks';
import { IList } from '../../../../../../../features/hubs/hubs.interfaces';
import { DragOverlay } from '@dnd-kit/core';
import OverlayList from '../../../../../../../components/tasks/OverlayList';
export default function LList({
  list,
  leftMargin,
  paddingLeft
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
}) {
  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? list.find((i: IList) => i.id === draggableItemId) : null;
  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <OverlayList list={draggableItem} />
        </DragOverlay>
      ) : null}
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <ListItem list={list} paddingLeft={paddingLeft} parentId={list.parent_id || list.hub_id || list.wallet_id} />
        </div>
      ))}
    </>
  );
}
