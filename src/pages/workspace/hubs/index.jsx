/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FolderAddOutlined,
  ImportOutlined,
  PlusOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { AvatarWithInitials, Hyperlink } from '../../../components';
import Modal from './components/Modal';
import { getHubListService } from '../../../features/hubs/hubService';
import MenuDropdown from './components/MenuDropdown';
import PlusDropDown from './components/PlusDropDown';
import WalletIndex from '../wallet/WalletIndex';
import ListIndex from '../Lists/ListIndex';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';

function Hubs() {
  const [getCurrentHubId, setGetCurrentHubId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHubList, setShowHubList] = useState(false);
  const {
    isLoading,
    data: hubdata,
    status,
  } = useQuery({
    queryKey: ['hubdata'],
    queryFn: getHubListService,
  });

  const HandleGetHubId = (id) => {
    setGetCurrentHubId(id);
    localStorage.setItem('currentHubId', JSON.stringify(id));
  };

  const handleShowWallet = (id) => {
    setGetCurrentHubId(id);
    setShowHubList(!showHubList);
  };

  const toggle = (id) => {
    setGetCurrentHubId(id);
    if (showHubList === id) {
      return setShowHubList(null);
    }
    setShowHubList(id);
  };

  return (
    <>
      <CreateNewItemBtn
        onClick={() => setShowModal(true)}
        title="Create new Hub"
      />
      <Modal
        isVisible={showModal}
        onCloseHubModal={() => setShowModal(false)}
      />

      <ItemsListInSidebar items={hubdata?.data.hubs} status={status} />

      {/* {hubdata?.data?.hubs.map(({ name, id }) => (
        <section id="hubList" key={id}>
          <div
            className="flex justify-between items-center hover:bg-gray-100 p-0.5 rounded mt-0.5 mb-0.5"
            onClick={() => toggle(id)}
          >
            <div
              id="hubListLeft"
              className="flex items-center space-x-1 justify-start text-sm mt-1 overflow-y-hidden"
            >
              <div onClick={() => handleShowWallet(id)}>
                {showHubList === id ? (
                  <ChevronDownIcon
                    className="flex-shrink-0 h-3 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRightIcon
                    className="flex-shrink-0 h-3 w-5"
                    aria-hidden="true"
                  />
                )}
              </div>
              <AvatarWithInitials
                initials={name.substr(0, 1).toUpperCase()}
                height="h-6"
                width="w-6"
                backgroundColour="#cf30cf"
              />
              <h4 className="text-sm font-medium">
                {name.length > 10 ? name.substr(0, 10) : name}
              </h4>
            </div>
            <div
              id="hubListRight"
              className="space-x-1 flex items-center justify-end"
              onClick={() => HandleGetHubId(id)}
            >
              <MenuDropdown />
              <PlusDropDown />
            </div>
          </div>
          {showHubList === id ? (
            <>
              <WalletIndex
                showHubList={showHubList}
                getCurrentHubId={getCurrentHubId}
              />
              <ListIndex
                showHubList={showHubList}
                getCurrentHubId={getCurrentHubId}
              />
            </>
          ) : null}
        </section>
      ))} */}
    </>
  );
}

export default Hubs;
