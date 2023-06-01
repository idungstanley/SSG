import ListNav from '../../../../pages/workspace/lists/components/renderlist/ListNav';

export function ChangeView() {
  return (
    <div>
      <ListNav
        viewsList="List"
        viewsList1="Table"
        viewsList2="Board"
        viewsList3="Calender"
        viewsList4="Map"
        changeViews="Show"
      />
    </div>
  );
}
