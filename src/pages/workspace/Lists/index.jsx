/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Hyperlink } from '../../../components';
import { getListService } from '../../../features/list/listService';
import MenuDropdown from '../hubs/components/MenuDropdown';

function ListIndex({ showHubList, getCurrentHubId }) {
  const { isLoading, data } = useQuery({
    queryKey: ['listData', getCurrentHubId],
    queryFn: getListService,
  });

  console.log(data);

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
                <PlusSquareOutlined />
                <p className="text-sm">{list.name}</p>
              </div>

              <div
                id="walletRight"
                className="space-x-1 flex items-center justify-end"
                // onClick={() => HandleGetHubId(hub.id)}
              >
                <MenuDropdown />
              </div>
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
