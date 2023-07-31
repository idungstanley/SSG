import React from 'react';
import ShowHideSettings from '../../../../../tasks/TaskSettingsModal/ShowSettingsModal/ShowHideSettings';
import Button from '../../../../../../../components/Buttons/Button';
import Show from '../../../../../../../assets/icons/Watchers.svg';
import Icons from '../../../../../../../components/Icons/Icons';

export default function ListShow({ changeViews }: { changeViews: string }) {
  return (
    <div className="flex items-center justify-start space-x-1">
      <Button active={false}>
        <span>
          <Icons src={Show} />
        </span>
        <p>{changeViews}</p>
        <span className="group cursor-pointer gap-2">
          <ShowHideSettings
            scrollByEachGroup="Scroll By Each Group"
            splitSubTask="Split Sub Task"
            verticalGridLines="Property Vertical Grid Line"
            entityLocation="Entity Location"
            subTaskParentsNames="Subtask Parent Names"
            closedSubtask="Closed Subtask"
            TaskInMultipleLists="Task In Multiple Lista"
            subTaskInMultipleLists="Subtask In Multiple Lists"
            emptyStatuses="Empty Statuses"
          />
        </span>
      </Button>
      {/* </span> */}
    </div>
  );
}
