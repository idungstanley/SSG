import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetHub } from '../../features/hubs/hubService';
import TaskDropdown from '../../pages/workspace/tasks/ccomponent/TaskDropdown';

function ListIndex({ showHubList, getCurrentHubId }) {
  const navigate = useNavigate();
  const [getListId, setGetListId] = useState('');
  const { data } = useGetHub(getCurrentHubId);

  const handleLocation = (id) => {
    navigate(`/workspace/list/${id}`);
  };

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.lists
        && data?.data?.lists.map((list) => (
          <div key={list.id}>
            <section className="flex justify-between items-center text-sm pl-14 hover:bg-gray-100">
              <div
                id="walletLeft"
                className="flex items-center justify-center space-x-1"
              >
                <p className="text-4xl text-gray-400 mb-2">.</p>
                <span className="absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 bg-gray-400 border-2 border-white dark:border-gray-800 rounded-full" />

                <button
                  type="button"
                  // href={`/workspace/list/${list.id}`}
                  // to="orkspace/list/list.id"
                  className="text-sm"
                  onClick={() => handleLocation(list.id)}
                >
                  {list.name}
                </button>
              </div>

              <TaskDropdown
                className="space-x-1 flex items-center justify-end"
                onClick={() => setGetListId(list.id)}
                getListId={getListId}
              />
            </section>
          </div>
        ))}
    </div>
  );
}

ListIndex.propTypes = {
  showHubList: PropTypes.bool.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default ListIndex;
