import React from 'react';

interface ModalProps {
  isModalVisible: boolean;
  onCloseModal: () => void;
  children: JSX.Element;
}

function ModalOverlay({ isModalVisible, onCloseModal, children }: ModalProps) {
  if (!isModalVisible) return null;
  return (
    <div className="fixed top-0 bottom-0 right-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative flex flex-col w-5/12 h-96">
        <div className="p-2 bg-white rounded">
          <div className="absolute text-xl right-4 text-alsoit-gray-75 place-self-end" onClick={() => onCloseModal()}>
            X
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalOverlay;
