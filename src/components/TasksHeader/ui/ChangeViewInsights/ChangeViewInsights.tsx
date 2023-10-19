import ListNav from '../../../../pages/workspace/lists/components/renderlist/ListNav';

export function ChangeViewInsights() {
  return (
    <div>
      <ListNav viewsList="List" changeViewsInsights="Show" viewsGraphs="Show Graphs" />
    </div>
  );
}
