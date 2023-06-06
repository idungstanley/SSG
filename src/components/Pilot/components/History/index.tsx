import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../common';
import { useGetItemHistory } from '../../../../features/general/history/historyService';
import SectionArea from '../SectionArea';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { BsFilter, BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiFillPlusCircle } from 'react-icons/ai';
import moment from 'moment';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { IActivityLog } from '../../../../features/general/history/history.interfaces';

export default function History() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [showModal, setShow] = useState<boolean>(false);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  // ! implement pagination
  const { data: logs, status } = useGetItemHistory({ type, id });
  // console.log(logs);

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-1/5">
          <SectionArea label="Logs" icon={<DocumentTextIcon className="w-4 h-4" />} />
        </div>
        <div className="relative flex items-center">
          <input type="text" className="w-64 px-6 text-xs border-purple-500 rounded-2xl h-7" placeholder="Search..." />
          <BiSearch className="absolute w-4 h-4 left-2" />
        </div>
        <div className="flex items-center h-5 px-1 space-x-2 bg-gray-200 border-purple-500 rounded-lg">
          <BsFilter />
          <span className="text-xs capitalize">filter</span>
        </div>
        <div className="relative">
          <BsThreeDots onClick={() => setShow(!showModal)} />
          {showModal && <HistoryModal model={logs} toggleFn={setShow} />}
        </div>
      </div>
      <div className="relative w-full h-full mt-2">
        {/* status checking */}
        {status === 'error' ? (
          <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
        ) : status === 'loading' ? (
          <div className="justify-center w-6 mx-auto mt-12">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : logs ? (
          !logs.length ? (
            <FullScreenMessage title="No logs yet" description="Do any action." />
          ) : (
            <table className="absolute left-0 flex flex-col w-full overflow-y-scroll border-l-4 border-yellow-600 rounded-lg top-2">
              <thead className="w-full px-1 pb-1 border-b-2 border-blueGray-300">
                <tr className="flex items-center justify-between w-full">
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
                  <tr
                    key={activityLog.id}
                    className="flex items-center w-full px-1 py-1 space-x-6 border-b-2 border-blueGray-300"
                  >
                    <td>
                      {user ? (
                        user.avatar_path !== '' ? (
                          <AvatarWithImage
                            image_path={user && user.avatar_path}
                            height="h-5"
                            width="w-5"
                            roundedStyle="circular"
                          />
                        ) : (
                          <InitialsAvatar size={5} colour={user && user.color} initials={user && user.initials} />
                        )
                      ) : (
                        <AvatarWithInitials initials="UN" height="h-5" width="w-5" roundedStyle="circular" />
                      )}
                    </td>
                    <td className="text-xs">
                      <span>{duration.humanize()} ago</span>
                    </td>
                    <td className="">
                      <span className="text-xs">{time}</span>
                    </td>
                    {user && (
                      <td className="text-xs text-gray-400 capitalize">
                        {user.name} {category} {model}
                      </td>
                    )}
                  </tr>
                );
              })}
            </table>
          )
        ) : null}
      </div>
    </>
  );
}

type HistoryModalProps = {
  model: IActivityLog[] | undefined;
  toggleFn: React.Dispatch<React.SetStateAction<boolean>>;
};

function HistoryModal({ model, toggleFn }: HistoryModalProps) {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);

  const handleChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  console.log(model);

  return (
    <div
      className="absolute z-50 flex flex-col w-56 p-2 space-y-2 overflow-auto bg-white rounded-lg shadow-2xl top-5 right-5 max-h-96"
      onBlur={() => toggleFn(false)}
    >
      <div className="border-b-2">
        <span className="text-sm capitalize">show all</span>
      </div>
      {model?.map((items, i) => (
        <div key={items.id} className="flex justify-between py-1 capitalize">
          <span>{items.model}</span>
          <label className="switch">
            <input type="checkbox" checked={checkedStates[i]} onChange={() => handleChange(i)} />
            <span className={`slider ${checkedStates[i] ? 'checked' : ''}`}></span>
          </label>
        </div>
      ))}
    </div>
  );
}
