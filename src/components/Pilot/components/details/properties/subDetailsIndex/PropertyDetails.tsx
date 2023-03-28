import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
// import SubTask from '../../../../../../../tasks/subtasks/create/SubTask';
import SubTask from '../../../../../../pages/workspace/subtasks/subtask1/SubTask';
import moment from 'moment';
// import Status from '../status/Status';
// import Priority from '../priority/Priority';
import CustomReference from '../customReference/CustomReference';
import EntitySettings from '../entitySettings/EntitySettings';
import Share from '../share/Share';
import Assignees from '../assignees/Assignees';
import Subscribers from '../subscribers/Subscribers';
import AvatarWithInitials from '../../../../../avatar/AvatarWithInitials';
import ToolTip from '../../../../../Tooltip';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { useAppSelector } from '../../../../../../app/hooks';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}
interface PropertyDetailsProps {
  Details: IHubDetails | undefined | ITaskFullList;
}
export default function PropertyDetails({ Details }: PropertyDetailsProps) {
  const [toggleSubTask, setToggleSubTask] = useState(false);

  const { activeItemName } = useAppSelector((state) => state.workspace);
  return (
    <>
      <div className="flex items-center justify-between p-2">
        {/* <section className="flex items-center space-x-3">
          <Status Details={Details} />
          <ToolTip tooltip="Priority">
            <Priority Details={Details} />
          </ToolTip>
        </section> */}
        <section className="z-0 flex items-center justify-center space-x-3">
          <CustomReference />
          <ToolTip tooltip="Share">
            <Share />
          </ToolTip>
          <EntitySettings />
        </section>
      </div>
      <section className="flex items-center mt-3 space-x-2">
        <ToolTip tooltip="Assignees">
          <Assignees />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <ToolTip tooltip="Subscribers">
          <Subscribers />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <AvatarWithInitials initials="DN" backgroundColour="blue" roundedStyle="rounded" height="h-5" width="w-5" />
      </section>
      <section className="p-2" key={Details?.id}>
        {/* tags */}
        <div id="tags" className="mt-2">
          <label className="text-xs text-gray-500">Tags</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            {/* <p> {groupTags(Details?.tags)}</p> */}
          </div>
        </div>
        {/* name */}
        <div id="entity name">
          <label className="text-xs text-gray-500">Title</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p className="capitalize">{activeItemName}</p>
          </div>
        </div>
        {/* description */}
        <div id="entity description" className="mt-5">
          <label className="text-xs text-gray-500">Description</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md h-20">
            <p>{Details?.description}</p>
          </div>
        </div>
        {/* created time */}
        <div id="created time" className="mt-2">
          <label className="text-xs text-gray-500">Created</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p>{moment(Details?.created_at).format('MMM DD, hh:mm a')}</p>
          </div>
        </div>
        {/* due date */}
        <div id="due date" className="mt-2">
          <label className="text-xs text-gray-500">Due Date</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p>Dec 31 2022</p>
          </div>
        </div>

        {/* create subtask */}
        <div id="create subtask" className="mt-2">
          <div
            className="flex p-0.5 items-center space-x-0.5 border border-gray-400 cursor-pointer w-20 rounded-md hover:bg-gray-400 hover:text-white"
            onClick={() => setToggleSubTask(!toggleSubTask)}
          >
            <AiOutlinePlus className="text-xs h-2.5" />
            <button className="text-xs text-gray-500  ">Subtask</button>
          </div>
        </div>
        <div className="mt-4">{toggleSubTask && <SubTask />}</div>
      </section>
    </>
  );
}
