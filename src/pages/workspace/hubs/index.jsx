/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Modal from './components/Modal';

function Hubs() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        id="createHubs"
        className="flex items-center justify-center bg-gray-100 space-x-2 rounded-xl w-full"
        onClick={() => setShowModal(!showModal)}
      >
        <PlusOutlined />
        <p>New Hub</p>
        <Modal isVisible={showModal} setShowModal={setShowModal} showModal={showModal} />
      </div>
      <p>ok</p>
    </>
  );
}

export default Hubs;
