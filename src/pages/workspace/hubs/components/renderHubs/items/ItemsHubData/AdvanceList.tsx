import React from 'react';
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useGetHubChildren } from '../../../../../../../features/hubs/hubService';
import TaskListViews from '../../../../../tasks/component/views/TaskListViews';
import TaskData from '../../../../../tasks/component/taskData/TaskData';

interface ItemsHubDataProps {
  hubId: string | null;
}

export default function AdvanceList({ hubId }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });
  return (
    <section>
      {data?.data.lists.map((item) => {
        return (
          <div key={data.name}>
            <p className="font-bold text-gray-700 dark:text-gray-400 test-xs capitalize">
              {data.name}
            </p>
            <div id="listTitle" className="flex items-center justify-between">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span></span>
                <ChevronDownIcon
                  className="flex-shrink-0 w-5 h-4"
                  aria-hidden="true"
                />
                <p
                  key={item.name}
                  className="font-bold text-gray-700 dark:text-gray-400 capitalize"
                >
                  {item.name}
                </p>
                <InformationCircleIcon
                  className="flex-shrink-0 w-5 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
                  + New Task
                </p>
                <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
                  Add Description
                </p>
                <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
                  Add Comment
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
                <CheckIcon
                  className="flex-shrink-0 w-5 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <p>Show Closed</p>
              </div>
            </div>
            {/* task Display */}
            <div>
              <TaskListViews />
              <span key={item.name}>
                <TaskData task={''} />
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
