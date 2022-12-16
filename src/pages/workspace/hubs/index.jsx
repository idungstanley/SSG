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
import WalletIndex from '../../../components/Index/WalletIndex';
import ListIndex from '../../../components/Index/ListIndex';
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

      <ItemsListInSidebar
        items={hubdata?.data.hubs}
        status={status}
        type="hub"
      />
    </>
  );
}

export default Hubs;
