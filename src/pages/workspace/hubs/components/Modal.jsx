/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import MainLogo from '../../../../assets/branding/main-logo.png';
import { Button, Input } from '../../../../components';

function Modal({ isVisible, onCloseHubModal }) {
  if (!isVisible) return null;
  return (
    <div className="w-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-5/12 flex flex-col">
        <div
          className="text-white text-xl place-self-end"
          onClick={() => onCloseHubModal()}
        >
          X
        </div>
        <div className="bg-white p-2 rounded">
          <section className="header h-36 flex justify-center items-center flex-col">
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              alt="Workflow"
            />
            <h3 className="font-bold">Create a Hub</h3>
          </section>
          <section>
            <div className="selectors mt-4 space-x-4  flex justify-start ml-6">
              <h3 className="font-bold rounded p-1 hover:bg-gray-300 hover:rounded">
                New
              </h3>
              <h3 className="font-bold rounded p-1 hover:bg-gray-300 hover:rounded">
                Template
              </h3>
            </div>
            <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </section>
          <section id="input" className="mt-5 ml-2">
            <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
              <Input
                label="Hub Name:"
                placeholder="Enter Hub Name"
                name="name"
                // value={name}
                type="text"
                // onChange={handleChange}
              />
            </div>
            <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={null}
                // loading={loginMutation.status === 'loading'}
                type="submit"
                label="Create Hub"
                padding="py-2 px-4"
                height="h-10"
                width="w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  isVisible: false,
  onCloseHubModal: false,
};

Modal.propTypes = {
  isVisible: PropTypes.bool,
  onCloseHubModal: PropTypes.bool,
};

export default Modal;
