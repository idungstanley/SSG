import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import {
  CalendarOutlined,
  FlagOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { getListsListService } from '../../../../features/list/listService';
import ListNav from '../../Loader/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';

function RenderWallets() {
  const { walletId } = useParams();
  const { currentWalletName } = useAppSelector((state) => state.workspace);

  const { data: WalletListData } = useQuery({
    queryKey: ['walletdata', walletId],
    queryFn: getListsListService,
  });

  return (
    <div className="overflow-auto h-screen">
      <section id="nav">
        <ListNav
          navName={currentWalletName}
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="">
        {/* ListList */}

        {WalletListData?.data?.lists?.map((data) => (
          <section id="listcard" className="mt-3 p-3" key={data.id}>
            <div className="block p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div id="listTitle" className="flex justify-between items-center">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <ChevronDownIcon
                    className="flex-shrink-0 h-4 w-5"
                    aria-hidden="true"
                  />
                  <p className="font-bold text-gray-700 dark:text-gray-400">
                    {data.name}
                  </p>
                  <InformationCircleIcon
                    className="flex-shrink-0 h-4 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p className="cursor-pointer hover:bg-gray-200 py-1 px-1 rounded text-xs">
                    + New Task
                  </p>
                  <p className="cursor-pointer hover:bg-gray-200 py-1 px-1 rounded text-xs">
                    Add Description
                  </p>
                  <p className="cursor-pointer hover:bg-gray-200 py-1 px-1 rounded text-xs">
                    Add Comment
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-400">
                  <CheckIcon
                    className="flex-shrink-0 h-4 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>Show Closed</p>
                </div>
              </div>
              <section id="border">
                <div className="inline-flex justify-center items-center w-full p-3">
                  <hr className="my-8 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
                  <span className="fixed left-1/2 px-3 font-sm text-gray-400 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
                    Add New Status
                  </span>
                </div>
              </section>
              {/* card */}
              <div className="bg-white border border-gray-100 rounded-lg px-2 py-1 flex  items-center">
                {/* data and input */}
                <div className="w-6/12">
                  <p>task name here</p>
                </div>
                {/* icons */}
                <div className="flex items-center space-x-10">
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <UserAddOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <CalendarOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <FlagOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
              {/* endshere */}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

export default RenderWallets;
