/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FolderAddOutlined, ImportOutlined, PlusOutlined, WalletOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { AvatarWithInitials, Hyperlink } from '../../../components';
import Modal from './components/Modal';
import { getHubListService } from '../../../features/hubs/hubService';
import MenuDropdown from './components/MenuDropdown';
import PlusDropDown from './components/PlusDropDown';
import WalletIndex from '../wallet';
import ListIndex from '../Lists';

function Hubs() {
  const [getCurrentHubId, setGetCurrentHubId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showHubList, setShowHubList] = useState(false);
  const {
    isLoading,
    data: hubdata,
  } = useQuery({
    queryKey: ['hubdata'],
    queryFn: getHubListService,
  });

  // console.log(hubdata);
  const HandleGetHubId = (id) => {
    setGetCurrentHubId(id);
    localStorage.setItem('currentHubId', JSON.stringify(id));
  };

  const handleShowWallet = (id) => {
    setGetCurrentHubId(id);
    setShowHubList(!showHubList);
  };

  const toggle = (index, id) => {
    setGetCurrentHubId(id);
    if (showHubList === index) {
      return setShowHubList(null);
    }
    setShowHubList(index);
  };

  return (
    <>
      <div
        id="createHubs"
        className="flex items-center justify-center bg-gray-100 space-x-2 rounded-xl w-full"
        onClick={() => setShowModal(true)}
      >
        <PlusOutlined />
        <p>New Hub</p>
      </div>
      <Modal
        isVisible={showModal}
        onCloseHubModal={() => setShowModal(false)}
      />

      {hubdata?.data?.hubs.map((hub, index) => (
        <section id="hubList" key={hub.id}>
          <div
            className="flex justify-between items-center hover:bg-gray-100 p-0.5 rounded mt-0.5 mb-0.5"
            onClick={() => toggle(index, hub.id)}
          >
            <div
              id="hubListLeft"
              className="flex items-center space-x-1 justify-start text-sm mt-1 overflow-y-hidden"
            >
              <div onClick={() => handleShowWallet(hub.id)}>
                {showHubList === index ? (
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
                initials={hub.name.substr(0, 1).toUpperCase()}
                height="h-6"
                width="w-6"
                backgroundColour="#cf30cf"
              />
              <h4 className="text-sm font-medium">
                {hub.name.length > 10 ? hub.name.substr(0, 10) : hub.name}
              </h4>
            </div>
            <div
              id="hubListRight"
              className="space-x-1 flex items-center justify-end"
              onClick={() => HandleGetHubId(hub.id)}
            >
              <MenuDropdown />
              <PlusDropDown />
            </div>
          </div>
          {showHubList === index ? (
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
      ))}
    </>
  );
}

export default Hubs;
