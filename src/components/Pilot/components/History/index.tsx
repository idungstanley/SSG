import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { Spinner } from '../../../../common';
import { useGetItemHistory } from '../../../../features/general/history/historyService';
import { BsFilter, BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { HistoryColModal, HistoryfilterModal } from './Modals';
import { LogEntries } from './Modals/Components/LogEntries';
import { isDateBetween } from '../../../../utils/calendar';
import { Dayjs } from 'dayjs';
import { HeaderIcons } from '../TimeClock/TimeHeaderIcons';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import ArrowDown from '../../../../assets/icons/ArrowDown';
import PlusIcon from '../../../../assets/icons/PlusIcon';

export type componentModals = {
  showHideColModal: boolean;
  filterLogModal: boolean;
};

export default function History() {
  const [showModal, setShow] = useState<componentModals>({ showHideColModal: false, filterLogModal: false });
  const [showLog, setShowlog] = useState<boolean>(false);

  // ! implement pagination
  const { status, getItemHistory } = useGetItemHistory();
  const { activityArray: logs, activeSubLogsTabId, activityFilterDate } = useAppSelector((state) => state.workspace);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { selectedDate, HistoryFilterMemory } = useAppSelector((state) => state.task);

  const filteredUserLogs = logs.filter((log) => {
    return log.created_by.user.name === HistoryFilterMemory?.user;
  });

  const filteredDateLogs = logs.filter((log) =>
    isDateBetween(log.created_at, activityFilterDate?.start as Dayjs, activityFilterDate?.end as Dayjs)
  );

  useEffect(() => {
    getItemHistory({ logType: activeSubLogsTabId });
  }, [pilotSideOver.id, activeSubLogsTabId]);

  return (
    <div className="flex flex-col space-x-0.5 border-none">
      <div className="flex items-center py-1 justify-between">
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
      <div
        className={`relative w-full ${
          showLog ? 'h-96' : 'h-min py-4'
        } overflow-hidden mt-2 border-alsoit-gray-75 border-y-4 border-l-4 rounded-tr-3xl rounded-br-3xl rounded-tl-xl rounded-bl-xl`}
      >
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
            <div className="absolute left-0.5 top-1 w-full">
              <InventoryHeader dropView={() => setShowlog(!showLog)} showLog={!showLog} />
              {showLog && (
                <table className="absolute left-1 flex flex-col w-full overflow-y-scroll top-10 h-96 pb-5">
                  <thead className="w-full px-1 pb-1 border-b-2 border-blueGray-300">
                    <tr className="flex items-center justify-between w-full">
                      <div className="flex w-2/3 space-x-3 capitalize">
                        <th className="w-24 text-start">user</th>
                        <th className="w-20">date</th>
                        <th className="w-20">time</th>
                        <th className="w-20">description</th>
                      </div>
                      <th>
                        <PlusIcon className="w-4 h-4 bg-orange-300 rounded-full p-1" color="white" />
                      </th>
                    </tr>
                  </thead>
                  {/* logs list */}
                  {filteredUserLogs.length > 0 ? (
                    <LogEntries logsArr={filteredUserLogs} />
                  ) : activityFilterDate?.start && activityFilterDate.end ? (
                    <LogEntries logsArr={filteredDateLogs} />
                  ) : (
                    <LogEntries logsArr={logs} />
                  )}
                </table>
              )}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

interface Props {
  dropView: () => void;
  showLog: boolean;
}

export function InventoryHeader({ dropView, showLog }: Props) {
  return (
    <div className="absolute -top-1.5 -left-1 flex justify-between items-center w-full">
      <div className="flex space-x-1.5 items-center">
        <label
          htmlFor="inventoryHeader"
          className="flex items-center justify-evenly grow bg-alsoit-gray-75 w-36 py-1.5 rounded-tl-lg rounded-br-lg"
        >
          <div className="flex items-center">
            <div className="cursor-pointer bg-alsoit-gray-100 rounded-xl">
              <CollapseIcon active={showLog} onToggle={() => dropView()} iconColor="rgb(244 244 244)" color="#424242" />
            </div>
          </div>
          <span className="uppercase text-alsoit-gray-50 truncate text-alsoit-text-md">activity log</span>
          <div className="flex space-x-1 items-center bg-orange-100 rounded-md p-1">
            <span className="capitalize text-alsoit-text-md text-alsoit-gray-100">add</span>
            <ArrowDown className="w-2 h-2 cursor-pointer" />
          </div>
        </label>
      </div>
      <HeaderIcons dateFilter />
    </div>
  );
}
