import React from 'react';
import ListViewSettingsModal from '../../../../../tasks/TaskSettingsModal/ViewsModal/ListViewSettingsModal';

export default function ListViews({ viewsList }: { viewsList: string }) {
  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="group cursor-pointer gap-2">
        <ListViewSettingsModal
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
