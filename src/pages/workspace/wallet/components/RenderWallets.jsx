/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  ChevronDownIcon, InformationCircleIcon, CalendarIcon, FlagIcon, UserAddIcon,
} from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { getListsListService } from '../../../../features/list/listService';
import ListNav from '../../Lists/components/renderlist/ListNav';

function RenderWallets() {
  const { walletId } = useParams();

  const { data: WalletListData } = useQuery({
    queryKey: ['walletdata', walletId],
    queryFn: getListsListService,
  });
  console.log(WalletListData);

  return (
    <div>
      <section id="nav">
        <ListNav
          navName="ListName"
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section id="listcard" className="mt-3 p-3">
        <div className="block p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div id="listTitle" className="flex justify-between items-center">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <ChevronDownIcon
                className="flex-shrink-0 h-4 w-5"
                aria-hidden="true"
              />
              <p className="font-bold text-gray-700 dark:text-gray-400">
                listname goes here
              </p>
              <InformationCircleIcon
                className="flex-shrink-0 h-4 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p>+ New Task</p>
              <p>Add Description</p>
              <p>Add Comment</p>
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
          <section id="tasktable" className="mt-3">
            <div>
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-1">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-2 h-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="py-1">
                        Todo
                      </th>
                      <th scope="col" className="py-1">
                        Assignee
                      </th>
                      <th scope="col" className="py-1">
                        Due Date
                      </th>
                      <th scope="col" className="py-1">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WalletListData?.data?.tasks?.map((list) => (
                      <tr
                        key={list.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-1">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-2 h-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-search-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {list.name}
                        </th>
                        <td className="py-2">
                          <UserAddIcon className="flex-shrink-0 h-5 w-5 text-gray-300 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
                        </td>
                        <td className="py-2">
                          <CalendarIcon className="flex-shrink-0 h-5 w-5 text-gray-300" />
                        </td>
                        <td className="py-2">
                          <FlagIcon className="flex-shrink-0 h-5 w-5 text-gray-300" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </section>

      <p>this is list of</p>
    </div>
  );
}

// RenderWallets.defaultProps = {
//   walletId: null,
// };

// RenderWallets.propTypes = {
//   walletId: PropTypes.string,
// };

export default RenderWallets;
