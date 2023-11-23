import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../common';
import { useGetItemHistory } from '../../../../features/general/history/historyService';
import { BsFilter, BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiFillPlusCircle } from 'react-icons/ai';
import moment from 'moment';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { HistoryColModal, HistoryfilterModal } from './Modals';

export type componentModals = {
  showHideColModal: boolean;
  filterLogModal: boolean;
};

export default function History() {
  const [showModal, setShow] = useState<componentModals>({ showHideColModal: false, filterLogModal: false });
  // const dispatch = useAppDispatch();

  // ! implement pagination
  const { status, getItemHistory } = useGetItemHistory();
  const { activityArray: logs, activeSubLogsTabId } = useAppSelector((state) => state.workspace);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { selectedDate } = useAppSelector((state) => state.task);

  // const handleClick = (type: 'activity' | 'history') => {
  //   getItemHistory({ logType: type });
  //   dispatch(setActiveLogTab(type));
  // };

  useEffect(() => {
    getItemHistory({ logType: activeSubLogsTabId });
  }, [pilotSideOver.id, activeSubLogsTabId]);

  return (
    <div className="flex flex-col space-x-0.5">
      <div className="flex items-center py-1 justify-between border-b-2">
        {/* search Component */}
        <div className="relative flex items-center w-3/5">
          <input
            type="text"
            className="w-full px-6 text-xs border-gray-400 focus:ring-purple-100 focus:ring focus:outline-none focus:border-0 rounded-2xl h-7"
            placeholder="Search..."
          />
          <BiSearch className="absolute w-4 h-4 left-2" />
        </div>
        <div className="flex w-1/5 items-center justify-end space-x-0.5 px-2.5">
          {/* Filter box component */}
          <div
            className={
              selectedDate?.from || selectedDate?.to
                ? 'flex space-x-2 items-center bg-purple-200 h-5 border-purple-500 rounded-lg px-1 relative cursor-pointer'
                : 'flex space-x-2 items-center bg-gray-200 h-5 border-purple-500 rounded-lg px-1 relative cursor-pointer'
            }
            onClick={() => {
              setShow((prev) => ({ ...prev, filterLogModal: !prev.filterLogModal }));
            }}
          >
            <BsFilter />
            <span className="text-xs capitalize">filter</span>
            {showModal.filterLogModal && <HistoryfilterModal logData={logs} toggleFn={setShow} />}
          </div>
          {/* three dots icon */}
          <div className="relative">
            <BsThreeDots onClick={() => setShow((prev) => ({ ...prev, showHideColModal: !prev.showHideColModal }))} />
            {showModal.showHideColModal && <HistoryColModal model={logs} toggleFn={setShow} />}
          </div>
        </div>
      </div>
      {/* <div className="flex w-full space-x-1">
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
      </div> */}
      <div className="relative w-full h-96 mt-2">
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
            <>
              <table className="absolute left-0 flex flex-col w-full overflow-y-scroll border-l-4 border-yellow-600 rounded-lg top-2 h-max">
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
                      className="flex items-center w-full px-1 py-1 space-x-6 border-t border-b border-blueGray-300"
                    >
                      <td>
                        {user ? (
                          user.avatar_path ? (
                            <AvatarWithImage
                              image_path={user.avatar_path}
                              height="h-5"
                              width="w-5"
                              roundedStyle="circular"
                            />
                          ) : (
                            <InitialsAvatar size={6} colour={user.color} initials={user.initials} />
                          )
                        ) : (
                          <AvatarWithInitials initials="UN" height="h-5" width="w-5" roundedStyle="circular" />
                        )}
                      </td>
                      <td className="text-xs">
                        <span>{duration.humanize()} ago</span>
                      </td>
                      <td>
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
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
