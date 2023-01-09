import React, { useState } from 'react';
import Modal from './components/Modal';
import { useGetHubList } from '../../../features/hubs/hubService';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useDispatch } from 'react-redux';
import { getHub } from '../../../features/hubs/hubSlice';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { FiChevronRight } from 'react-icons/fi';

function Hubs() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, status } = useGetHubList();
  if (status === 'success') {
    dispatch(getHub(data?.data.hubs));
  }
  return (
    <>
      <Modal
        isVisible={showModal}
        onCloseHubModal={() => setShowModal(false)}
      />
      <div className="pl-4 hover:bg-gray-100 flex justify-between items-center">
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className="h-4 mr-4" />
          <p className="tracking-wider" style={{ fontSize: '10px' }}>
            Everthing
          </p>
        </div>
        <FiChevronRight
          className="flex-shrink-0 w-5 h-5 pr-2"
          aria-hidden="true"
        />
      </div>
      <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" />
    </>
  );
}

export default Hubs;
