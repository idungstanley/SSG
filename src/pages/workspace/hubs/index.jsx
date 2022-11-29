/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  FolderAddOutlined, ImportOutlined, PlusOutlined, WalletOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import React, { useState, useEffect } from 'react';
import { AvatarWithInitials, Hyperlink } from '../../../components';
import Modal from './components/Modal';
import { getHubListService } from '../../../features/hubs/hubService';
import { getHub } from '../../../features/hubs/hubSlice';
import MenuDropdown from './components/MenuDropdown';
import PlusDropDown from './components/PlusDropDown';

function Hubs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.hub.hub);

  const getHubListMutation = useMutation(getHubListService, {
    onSuccess: (data) => {
      const newData = data.data.hubs;
      dispatch(getHub(newData));
    },
  });

  const getHubList = () => {
    getHubListMutation.mutate();
  };

  const HandleGetHubId = (id) => {
    localStorage.setItem('currentHubId', JSON.stringify(id));
  };

  useEffect(() => {
    getHubList();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showHubList, setShowHubList] = useState(false);

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

      {user.map(({ id, name }) => (
        <section id="hubList" key={id}>
          <div className="flex justify-between items-center hover:bg-gray-100 p-1 rounded mt-1 mb-1">
            <div
              id="hubListLeft"
              className="flex items-center space-x-1 justify-start text-sm mt-1 overflow-y-hidden"
            >
              <div onClick={() => setShowHubList(!showHubList)}>
                {showHubList ? (
                  <ChevronRightIcon
                    className="flex-shrink-0 h-3 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="flex-shrink-0 h-3 w-5"
                    aria-hidden="true"
                  />
                )}
              </div>
              <AvatarWithInitials
                initials={name.substr(0, 2)}
                height="h-6"
                width="w-6"
              />
              <h4 className="text-sm font-bold">
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
          <div
            id="createWallet"
            className={`${showHubList ? 'block' : 'hidden'}`}
          >
            <p className="text-sm pl-7">
              Create a
              {' '}
              <span className="underline text-gray-600">
                <Hyperlink label="Wallet" href="/" />
              </span>
              ,
              {' '}
              <span className="underline text-gray-600">
                <Hyperlink label="List" href="/" />
              </span>
              {' '}
            </p>
          </div>
        </section>
      ))}
    </>
  );
}

export default Hubs;
