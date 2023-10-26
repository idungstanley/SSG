import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import AddNewItem from '../taskColumn/AddNewItem';
import { useParams } from 'react-router-dom';
export default function TaskQuickAction() {
  const { createTaskFromTop } = useAppSelector((state) => state.list);

  const { listId } = useParams();

  return <>{createTaskFromTop && <AddNewItem listId={listId} />}</>;
}
