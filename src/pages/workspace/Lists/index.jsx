/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Hyperlink } from '../../../components';
import { getListService } from '../../../features/list/listService';
import { useGetHubService } from '../../../features/hubs/hubService';
import MenuDropdown from '../hubs/components/MenuDropdown';
import TaskDropdown from '../tasks/ccomponent/TaskDropdown';

function ListIndex({ showHubList, getCurrentHubId }) {
  const [getListId, setGetListId] = useState('');
  const { data: hubdataById } = useQuery({
    queryKey: ['hubdata_hubByID', getCurrentHubId],
    queryFn: useGetHubService,
  });

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {hubdataById?.data?.lists &&
        hubdataById?.data?.lists.map((list) => (
          <div key={list.id}>
            <section className="flex justify-between items-center text-sm pl-14 hover:bg-gray-100">
              <div
                id="walletLeft"
                className="flex items-center justify-center space-x-1"
              >
                <p className="text-4xl text-gray-400 mb-2">.</p>
                <Link
                  to={`/workspace/list/${list.id}`}
                  // to="orkspace/list/list.id"
                  className="text-sm"
                >
                  {list.name}
                </Link>
              </div>

              <div
                onClick={() => setGetListId(list.id)}
                className="space-x-1 flex items-center justify-end"
              >
                <TaskDropdown getListId={getListId} />
              </div>
            </section>
          </div>
        ))}
    </div>
  );
}

ListIndex.propTypes = {
  showHubList: PropTypes.string.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default ListIndex;
