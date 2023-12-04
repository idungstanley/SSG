import ListViews from './listDetails/listViews/ListViews';
import ListShow from './listDetails/listShow/ListShow';
import ListSubtasks from './listDetails/listSubtask/ListSubtasks';
import ListGraphs from './listDetails/listGraphs/ListGraphs';
import ListShowGraphs from './listDetails/listShowGraphs/ListShowGraphs';

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
  changeViewsInsights?: string;
}

function ListNav({ viewsList, changeViews, viewsSubtasks, changeViewsInsights, viewsGraphs }: ListNavProps) {
  return (
    <>
      <nav className="flex items-center justify-between overflow-hidden bg-white">
        <section className="flex items-center justify-start">
          <div className="flex items-center">
            <div className="flex items-center mr-12">
              <ListViews viewsList={viewsList as string} />
              {changeViews ? <ListShow changeViews={changeViews as string} /> : null}
              {viewsSubtasks ? <ListSubtasks subtasksTitle={viewsSubtasks as string} /> : null}
            </div>

            <div className="flex items-center ml-12">
              {changeViewsInsights ? <ListShowGraphs /> : null}
              {viewsGraphs ? <ListGraphs graphsTitle={viewsGraphs as string} /> : null}
            </div>
          </div>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
