import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHub } from '../../features/hubs/hubService';
// import MenuDropdown from '../Dropdown/DropdownForWorkspace';
import TaskDropdown from '../../pages/workspace/tasks/ccomponent/TaskDropdown';
import { BsListUl } from 'react-icons/bs';

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
            <section className="flex justify-between items-center text-sm pl-6 ml-0.5 hover:bg-gray-100">
              <div className="flex items-center justify-center space-x-1">
                <BsListUl
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => handleListLocation(list.id)}
                  className="tracking-wider capitalize ml-2"
                  style={{ fontSize: '10px' }}
                >
                  {list.name.length > 10 ? list.name.substr(0, 10) + '...' : list.name}
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
