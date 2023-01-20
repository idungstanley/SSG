import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowWatchersSideOver } from '../../features/general/slideOver/slideOverSlice';
import List from './components/List';
import AddNew from './components/AddNew';
import SideOver from '../../components/SideOver';

export default function Watchers() {
  const dispatch = useAppDispatch();
  const { watchersSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowWatchersSideOver({ show: false }));

  const item =
    watchersSideOver?.type && watchersSideOver?.id
      ? { type: watchersSideOver.type, id: watchersSideOver.id }
      : null;

  return (
    <SideOver show={watchersSideOver.show} onClose={onClose} title="Watchers">
      {item ? (
        <>
          <AddNew item={item} />
          <List item={item} />
        </>
      ) : null}
    </SideOver>
  );
}
