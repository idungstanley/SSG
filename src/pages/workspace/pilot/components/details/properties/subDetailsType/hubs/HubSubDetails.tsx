import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import moment from 'moment';

interface DetailsIndexProps {
  hubDetails: any;
}
export default function HubSubDetails({ hubDetails }: DetailsIndexProps) {
  console.log(hubDetails);
  const [toggleSubTask, setToggleSubTask] = useState(false);
  console.log(hubDetails);
  return (
    <>
      <section className="p-2" key={hubDetails?.id}>
        {/* name */}
        <div id="entity name">
          <label className="text-xs text-gray-500">Title</label>
          <div className="p-1 bg-gray-100 border border-white rounded-md">
            <p>{hubDetails?.name}</p>
          </div>
        </div>
        {/* description */}
        <div id="entity description" className="mt-5">
          <label className="text-xs text-gray-500">Description</label>
          <div className="h-20 p-1 bg-gray-100 border border-white rounded-md">
            <p>{hubDetails?.description}</p>
          </div>
        </div>
        {/* created time */}
        <div id="created time" className="mt-2">
          <label className="text-xs text-gray-500">Created</label>
          <div className="p-1 bg-gray-100 border border-white rounded-md">
            <p>{moment(hubDetails?.created_at).format('MMM DD, hh:mm a')}</p>
          </div>
        </div>
        {/* due date */}
        <div id="due date" className="mt-2">
          <label className="text-xs text-gray-500">Due Date</label>
          <div className="p-1 bg-gray-100 border border-white rounded-md">
            <p>Dec 31 2022</p>
          </div>
        </div>
        {/* tags */}
        <div id="tags" className="mt-2">
          <label className="text-xs text-gray-500">Tags</label>
          <div className="p-1 bg-gray-100 border border-white rounded-md">
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
            <button className="text-xs text-gray-500 ">Subtask</button>
          </div>
        </div>
        {/* <div className="mt-4">{toggleSubTask && <SubTask />}</div> */}
      </section>
    </>
  );
}