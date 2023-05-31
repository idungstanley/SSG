import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../common';
import { useGetItemHistory } from '../../../../features/general/history/historyService';
import { OutputDateTime } from '../../../../app/helpers';
import SectionArea from '../SectionArea';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { BsFilter, BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiFillPlusCircle } from 'react-icons/ai';
import moment from 'moment';

export default function History() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  // ! implement pagination
  const { data: logs, status } = useGetItemHistory({ type, id });
  console.log(logs);

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-1/5">
          <SectionArea label="Logs" icon={<DocumentTextIcon className="w-4 h-4" />} />
        </div>
        <div className="flex items-center relative">
          <input type="text" className="rounded-2xl w-64 h-7 border-purple-500 px-6 text-xs" placeholder="Search..." />
          <BiSearch className="w-4 h-4 absolute left-2" />
        </div>
        <div className="flex space-x-2 items-center bg-gray-200 h-5 border-purple-500 rounded-lg px-1">
          <BsFilter />
          <span className="capitalize text-xs">filter</span>
        </div>
        <BsThreeDots />
      </div>
      <div className="relative h-full w-full mt-2">
        {/* status checking */}
        {status === 'error' ? (
          <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
        ) : status === 'loading' ? (
          <div className="mx-auto w-6 justify-center mt-12">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : logs ? (
          !logs.length ? (
            <FullScreenMessage title="No logs yet" description="Do any action." />
          ) : (
            <table className="absolute top-2 left-0 flex w-full h-full overflow-y-scroll flex-col divide-y divide-gray-200">
              <thead className="w-full">
                <tr className="w-full flex justify-between items-center">
                  <div className="flex w-2/3 space-x-10 capitalize">
                    <th>user</th>
                    <th>date</th>
                    <th>time</th>
                    <th>description</th>
                  </div>
                  <th>
                    <AiFillPlusCircle className="w-4 h-4" />
                  </th>
                </tr>
              </thead>
              {/* logs list */}
              {logs.map((activityLog) => {
                const { created_at, category, model, created_by } = activityLog;
                const { user } = created_by;
                const startDate = moment(created_at);
                const currentDate = moment(new Date().toISOString());
                const duration = moment.duration(currentDate.diff(startDate));
                const time = moment(created_at.substring(11, 19), 'HH:mm:ss').format('h:mm A');
                return (
                  <li key={activityLog.id} className="py-2 flex space-x-6 w-full items-center">
                    <InitialsAvatar size={6} colour={user.color} initials={user.initials} />
                    <div className="text-xs">
                      <span>{duration.humanize()} ago</span>
                    </div>
                    <div className="">
                      <span className="text-xs">{time}</span>
                    </div>

                    <p className="text-gray-400 text-xs capitalize">
                      {user.name} {category} {model}
                    </p>
                  </li>
                );
              })}
            </table>
          )
        ) : null}
      </div>
    </>
  );
}
