import React from 'react';
import ListViews from './listDetails/listViews/ListViews';
import ListShow from './listDetails/listShow/ListShow';
import ListSubtasks from './listDetails/listSubtask/ListSubtasks';

interface ListNavProps {
  navName?: string | null;
  viewsList?: string;
  viewsSubtasks: string;
  viewsList2?: string;
  viewsList3?: string;
  viewsList4?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
}

function ListNav({ viewsList, changeViews, viewsSubtasks }: ListNavProps) {
  return (
    <>
      <nav
        className="flex items-center justify-between overflow-hidden bg-white border-b border-gray-200 h-14"
        style={{ padding: '1px 15px 2px 15px', height: '50px' }}
      >
        <section className="flex items-center justify-start">
          <div className="flex items-center">
            <ListViews viewsList={viewsList as string} />
            <ListShow changeViews={changeViews as string} />
            <ListSubtasks subtasksTitle={viewsSubtasks as string} />
          </div>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
