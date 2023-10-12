import ListNav from '../../../../pages/workspace/lists/components/renderlist/ListNav';

export function ChangeViewInsights() {
  return (
    <div>
      <ListNav viewsList="List" changeViews="Show" viewsGraphs="Show Graphs" />
    </div>
  );
}
