import React from 'react';
import ListViewSettingsModal from '../../../../../tasks/TaskSettingsModal/ViewsModal/ListViewSettingsModal';
import Button from '../../../../../../../components/Buttons/Button';
import Icons from '../../../../../../../components/Icons/Icons';
import List from '../../../../../../../assets/icons/list.svg';

export default function ListViews({ viewsList }: { viewsList: string }) {
  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="flex">
        <Button active={true}>
          <Icons src={List} />
          <span className="font-bold" style={{ fontSize: '13px' }}>
            {viewsList}
          </span>
          <span className="group cursor-pointer gap-2">
            <ListViewSettingsModal
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
        </Button>
        {/* </span> */}
      </span>
    </div>
  );
}
