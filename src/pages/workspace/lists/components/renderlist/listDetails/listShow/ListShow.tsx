import React from 'react';
import ShowHideSettings from '../../../../../tasks/TaskSettingsModal/ShowSettingsModal/ShowHideSettings';

export default function ListShow({ changeViews }: { changeViews: string }) {
  return (
    <div className="flex items-center justify-start space-x-1">
      <span className="group cursor-pointer gap-2">
        <ShowHideSettings
          scrollByEachGroup="Scroll By Each Group"
          splitSubTask="Split Sub Task"
          verticalGridLines="Property Vertical Grid Line"
          entityLocation="Entity Location"
          subTaskParentsNames="Subtask Parent Names"
          closedSubtask="Closed Subtask"
          TaskInMultipleLists="Task In Multiple Lists"
          subTaskInMultipleLists="Subtask In Multiple Lists"
          emptyStatuses="Empty Statuses"
        />
      </span>
    </div>
  );
}
