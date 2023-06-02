import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
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
import { SiGooglephotos } from 'react-icons/si';
import ClipHistory from '../../../../assets/icons/ClipHistory.svg';
import { setActiveLogTab } from '../../../../features/workspace/workspaceSlice';
// import { setLogType } from '../../../../features/workspace/workspaceSlice';

export default function History() {
  const [showModal, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // ! implement pagination
  const { status, getItemHistory } = useGetItemHistory();
  const { activityArray: logs, activeLogTab } = useAppSelector((state) => state.workspace);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  // console.log(logs);

  const handleClick = (type: 'activity' | 'history') => {
    getItemHistory({ logType: type });
    dispatch(setActiveLogTab(type));
  };

  useEffect(() => {
    getItemHistory({ logType: activeLogTab });
  }, [pilotSideOver.id]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex space-x-1 w-full">
        <div
          className={`rounded-2xl w-1/2 flex justify-center items-center ${
            activeLogTab === 'activity' ? 'bg-purple-200' : 'bg-gray-300'
          } py-1 cursor-pointer`}
          onClick={() => handleClick('activity')}
        >
          <SiGooglephotos className="w-5 h-5 font-bold" />
        </div>
        <div
          className={`rounded-2xl w-1/2 flex justify-center items-center ${
            activeLogTab === 'history' ? 'bg-purple-200' : 'bg-gray-300'
          } py-1 cursor-pointer`}
          onClick={() => handleClick('history')}
        >
          <img src={ClipHistory} alt="clipHistory_icon" />
        </div>
      </div>
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
        <div className="relative">
          <BsThreeDots onClick={() => setShow(!showModal)} />
          {showModal && <HistoryModal model={logs} toggleFn={setShow} />}
        </div>
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
            <>
              <table className="absolute top-2 left-0 flex w-full overflow-y-scroll flex-col border-l-4 border-yellow-600 rounded-lg">
                <thead className="w-full border-b-2 border-blueGray-300 px-1 pb-1">
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
                    <tr
                      key={activityLog.id}
                      className="py-1 flex space-x-6 w-full items-center border-b-2 border-blueGray-300 px-1"
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
                        <td className="text-gray-400 text-xs capitalize">
                          {user.name} {category} {model}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </table>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}

type HistoryModalProps = {
  model: IActivityLog[] | undefined;
  toggleFn: React.Dispatch<React.SetStateAction<boolean>>;
};

function HistoryModal({ model, toggleFn }: HistoryModalProps) {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const handleCloseModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleFn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseModal);
    return () => document.removeEventListener('mousedown', handleCloseModal);
  }, []);

  console.log(checkedStates);

  // Convert the model array to a set to get unique values
  const uniqueModelSet = new Set(model?.map((item) => item.model));

  // Convert the set back to an array for rendering
  const uniqueModelArray = Array.from(uniqueModelSet);

  return (
    <div
      className="flex flex-col space-y-2 bg-white absolute top-5 right-5 shadow-2xl rounded-lg w-56 max-h-96 z-50 p-2 overflow-auto"
      ref={modalRef}
    >
      <div className="border-b-2">
        <span className="text-sm capitalize">show all</span>
      </div>
      {uniqueModelArray.map((modelItem, i) => (
        <div key={modelItem} className="capitalize py-1 flex justify-between">
          <span>{modelItem}</span>
          <label className="switch">
            <input type="checkbox" checked={checkedStates[i]} onChange={() => handleChange(i)} />
            <span className={`slider ${checkedStates[i] ? 'checked' : ''}`}></span>
          </label>
        </div>
      ))}
    </div>
  );
}
