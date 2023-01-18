import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import Chat from '../../components/Chat';
import Watchers from '../../components/Watchers';
import Comments from '../../components/Comments';
import ShareItemModal from '../../components/ShareItemModal';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAppDispatch } from '../../app/hooks';
import { setDraggableId } from '../../features/explorer/explorerSlice';

export default function NewExplorerPage() {
  const dispatch = useAppDispatch();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const onDragStart = (e: DragStartEvent) => {
    dispatch(setDraggableId(e.active.id as string));
  };

  const onDragEnd = (e: DragEndEvent) => {
    dispatch(setDraggableId(null));

    console.log(e);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <main className="grid grid-cols-mainLayout w-full h-full">
          {/* sidebar */}
          <Sidebar />

          {/* header */}
          <section className="grid grid-rows-mainContent">
            <Header />

            <div className="grid grid-rows-mainContent">
              {/* Breadcrumb */}
              <BreadcrumbSection />

              {/* files list & file preview */}
              <Main />
            </div>
          </section>
        </main>
      </DndContext>
      <CreateOrRenameItemSlideOver />
      <Chat />
      <Watchers />
      <Comments />
      <ShareItemModal />
    </>
  );
}
