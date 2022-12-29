import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHub } from '../../features/hubs/hubService';
// import MenuDropdown from '../Dropdown/DropdownForWorkspace';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';
import TaskDropdown from '../../pages/workspace/tasks/ccomponent/TaskDropdown';

interface ListIndexProps {
  showHubList: boolean
  getCurrentHubId: string | null
}

function ListIndex({ showHubList, getCurrentHubId }: ListIndexProps) {
  const navigate = useNavigate();
  const [getListId, setGetListId] = useState('');
  const { data } = useGetHub(getCurrentHubId);

 const handleListLocation = (id: string) => {
   navigate(`/workspace/list/${id}`);
 };

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.lists &&
        data?.data?.lists.map((list) => (
          <div key={list.id}>
            <section className="flex justify-between items-center text-sm pl-16 space-x-1 hover:bg-gray-100">
              <div className="flex items-center">
                <DotsCircleHorizontalIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => handleListLocation(list.id)}
                >
                  {list.name}
                </button>
              </div>
              {/* ends here */}
              <button
                type="button"
                id="listright"
                className="space-x-1 flex items-center justify-end"
                onClick={() => setGetListId(list.id)}
              >
                <TaskDropdown getListId={getListId} />
              </button>
            </section>
          </div>
        ))}
    </div>
  );
}

export default ListIndex;
