import ListViews from './listDetails/listViews/ListViews';
import ListShow from './listDetails/listShow/ListShow';
import ListSubtasks from './listDetails/listSubtask/ListSubtasks';
import ListGraphs from './listDetails/listGraphs/ListGraphs';

interface ListNavProps {
  navName?: string | null;
  viewsList?: string;
  viewsSubtasks?: string;
  viewsList2?: string;
  viewsList3?: string;
  viewsList4?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
  viewsGraphs?: string;
}

function ListNav({ viewsList, changeViews, viewsSubtasks, viewsGraphs }: ListNavProps) {
  return (
    <>
      <nav className="flex items-center justify-between overflow-hidden bg-white">
        <section className="flex items-center justify-start">
          <div className="flex items-center">
            <ListViews viewsList={viewsList as string} />
            <ListShow changeViews={changeViews as string} />
            {viewsSubtasks ? <ListSubtasks subtasksTitle={viewsSubtasks as string} /> : null}
            {viewsGraphs ? <ListGraphs graphsTitle={viewsGraphs as string} /> : null}
          </div>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
