/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function WalletModal({ walletVisible, onCloseWalletModal }) {
  if (!walletVisible) return null;

  return (
    <div className="w-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-5/12 flex flex-col">
        <div
          className="text-white text-xl place-self-end"
          onClick={() => onCloseWalletModal()}
        >
          X
        </div>
        <div className="bg-white p-2 rounded">
          <section className="header h-36 flex justify-center items-center flex-col">
            Create wallet
          </section>
        </div>
      </div>
    </div>
  );
}

WalletModal.defaultProps = {
  walletVisible: false,
  onCloseWalletModal: false,
};

WalletModal.propTypes = {
  walletVisible: PropTypes.bool,
  onCloseWalletModal: PropTypes.bool,
};

export default WalletModal;
