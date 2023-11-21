import * as React from 'react';
import Close from '../../assets/icons/Close';

interface ModalPilotNavProps {
  modalItemClick: () => void;
}

export default function ModalPilotNav({ modalItemClick }: ModalPilotNavProps) {
  return (
    <div
      className="bg-white fixed p-2"
      style={{
        width: '204px',
        height: '272px',
        top: '40px',
        zIndex: '51',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px #00000040'
      }}
    >
      <div className="my-2 space-y-2 text-center font-semibold relative">
        <span
          className="absolute right-0 hover:rotate-90 transition duration-300"
          style={{ top: '-10px' }}
          onClick={() => modalItemClick()}
        >
          <Close active={false} width="15" height="15" />
        </span>
        <p style={{ fontSize: '12px', color: 'orange' }}>Tree search</p>
        <hr />
      </div>
      <p className="py-1" style={{ color: 'orange' }} onClick={() => modalItemClick()}>
        Item 1
      </p>
      <p className="py-1" style={{ color: 'orange' }}>
        Item 2
      </p>
      <p className="py-1" style={{ color: 'orange' }}>
        Item 3
      </p>
      <p className="py-1" style={{ color: 'orange' }}>
        Item 4
      </p>
      <p className="py-1" style={{ color: 'orange' }}>
        Item 5
      </p>
    </div>
  );
}
