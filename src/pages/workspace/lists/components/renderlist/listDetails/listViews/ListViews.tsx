import React from 'react';
import { BsListStars } from 'react-icons/bs';
import ListViewSettingsModal from '../../../../../tasks/TaskSettingsModal/ViewsModal/ListViewSettingsModal';
import Button from '../../../../../../../components/Buttons/Button';

export default function ListViews({ viewsList }: { viewsList: string }) {
  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="flex">
        {/* <span className="viewSettingsParent space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-primary-50 rounded-sm "> */}
        <Button active={true}>
          <span className="mt-1">
            <BsListStars className={'flex-shrink-0 w-5 h-4'} aria-hidden="true" />
          </span>
          <span className="group flex items-center text-sm  cursor-pointer gap-2 font-bold">
            {viewsList}
            <span>
              <ListViewSettingsModal
                list="List"
                table="Table"
                board="Board"
                calender="Calender "
                timeChart="TimeChart "
                map="Map "
                gantt="Gantt"
                team="Team"
              />
            </span>
          </span>
        </Button>
        {/* </span> */}
      </span>
    </div>
  );
}
