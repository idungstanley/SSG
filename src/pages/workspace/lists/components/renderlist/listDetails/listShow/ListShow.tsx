import React from 'react';
import ShowHideSettings from '../../../../../tasks/TaskSettingsModal/ShowSettingsModal/ShowHideSettings';

export default function ListShow({ changeViews }: { changeViews: string }) {
  return (
    <div className="flex items-center justify-start space-x-1">
      <span className="gap-2 cursor-pointer group">
        <ShowHideSettings
          isActive={changeViews}
          scrollByEachGroup="Scroll By Each Group"
          splitSubtaskTwo="Split 2 level of subtasks"
          splitSubtaskThree="Split 3 level of subtasks"
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
