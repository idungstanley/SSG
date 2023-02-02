import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import SubTask from '../../../../../tasks/subtasks/create/SubTask';
import moment from 'moment';
import ToolTip from '../../../../../../../components/Tooltip';
import Status from '../status/Status';
import Priority from '../priority/Priority';
import CustomReference from '../customReference/CustomReference';
import EntitySettings from '../entitySettings/EntitySettings';
import Share from '../share/Share';
import Assignees from '../assignees/Assignees';
import Subscribers from '../subscribers/Subscribers';
import { AvatarWithInitials } from '../../../../../../../components';

interface PropertyDetailsProps {
  Details: any;
}
export default function PropertyDetails({ Details }: PropertyDetailsProps) {
  const [toggleSubTask, setToggleSubTask] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between p-2">
        <section className="flex items-center space-x-3">
          {/* <ToolTip tooltip="Status"> */}
          <Status Details={Details} />
          {/* </ToolTip> */}
          <ToolTip tooltip="Priority">
            <Priority />
          </ToolTip>
        </section>
        <section className="flex items-center justify-center space-x-3">
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
        <AvatarWithInitials
          initials="DN"
          backgroundColour="blue"
          roundedStyle="rounded"
          height="h-5"
          width="w-5"
        />
      </section>
      <section className="p-2" key={Details?.id}>
        {/* name */}
        <div id="entity name">
          <label className="text-xs text-gray-500">Title</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p className="capitalize">{Details?.name}</p>
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
        {/* tags */}
        <div id="tags" className="mt-2">
          <label className="text-xs text-gray-500">Tags</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p>Also workspace tag</p>
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
