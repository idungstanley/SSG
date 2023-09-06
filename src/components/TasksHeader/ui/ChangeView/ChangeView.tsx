import ListNav from '../../../../pages/workspace/lists/components/renderlist/ListNav';

export function ChangeView() {
  return (
    <div>
      <ListNav viewsList="List" viewsSubtasks="Subtasks" changeViews="Show" />
    </div>
  );
}
