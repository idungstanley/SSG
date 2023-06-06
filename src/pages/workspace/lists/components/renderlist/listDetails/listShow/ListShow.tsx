import React from 'react';
import { BiShow } from 'react-icons/bi';
import ShowHideSettings from '../../../../../tasks/TaskSettingsModal/ShowSettingsModal/ShowHideSettings';

export default function ListShow({ changeViews }: { changeViews: string }) {
  return (
    <div className="flex items-center justify-start space-x-1">
      <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm">
        <span>
          <BiShow className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
        </span>
        <span className="group  flex items-center text-sm  cursor-pointer gap-2 font-bold">
          {changeViews}
          <span className="">
            <ShowHideSettings
              scrollByEachGroup="Scroll By Each Group"
              splitSubTask="Split Sub Task"
              verticalGridLines="Vertical Gridlines"
              entityLocation="Entity Location"
              subTaskParentsNames="Subtask Parent Names"
              closedSubtask="Closed Subtask"
              TaskInMultipleLists="Task In Multiple Lista"
              subTaskInMultipleLists="Subtask In Multiple Lists"
              emptyStatuses="Empty Statuses"
            />
          </span>
        </span>
      </span>
    </div>
  );
}
