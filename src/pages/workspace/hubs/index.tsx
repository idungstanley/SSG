import React, { useState } from 'react';
import Modal from './components/Modal';
import {
  useGetHubList,
} from '../../../features/hubs/hubService';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';

function Hubs() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, status } = useGetHubList();
  // console.log(data);

  return (
    <>
      <CreateNewItemBtn
        onClick={() => setShowModal(true)}
        title="NEW HUB"
      />
      <Modal
        isVisible={showModal}
        onCloseHubModal={() => setShowModal(false)}
      />
      <ItemsListInSidebar
        items={data?.data.hubs}
        status={status}
        type="hub"
      />
    </>
  );
}

export default Hubs;
