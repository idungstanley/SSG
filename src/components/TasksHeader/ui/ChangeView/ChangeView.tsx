import ListNav from '../../../../pages/workspace/lists/components/renderlist/ListNav';

export function ChangeView() {
  return (
    <div>
      <ListNav viewsList="List" viewsList1="Subtasks" changeViews="Show" />
    </div>
  );
}
