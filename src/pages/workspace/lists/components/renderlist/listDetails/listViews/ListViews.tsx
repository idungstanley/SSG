import ViewsModal from '../../../../../tasks/TaskSettingsModal/ViewsModal/ViewsModal';

export default function ListViews({ viewsList }: { viewsList: string }) {
  return (
    <div className="flex items-center justify-start space-x-1">
      <span className="group cursor-pointer gap-2">
        <ViewsModal
          isActive={viewsList}
          list="List"
          table="Table"
          board="Board"
          calender="Calender"
          timeChart="TimeChart"
          map="Map"
          gantt="Gantt"
          team="Team"
        />
      </span>
    </div>
  );
}
