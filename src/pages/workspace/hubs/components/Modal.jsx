/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainLogo from '../../../../assets/branding/main-logo.png';
import { Input } from '../../../../components';
import {
  useCreateHub,
} from '../../../../features/hubs/hubService';

function Modal({ isVisible, onCloseHubModal }) {
  const { mutate: crateHub } = useCreateHub();

  const [formState, setFormState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    crateHub({
      name: formState,
    });

    onCloseHubModal();
  };

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
          <form
            onSubmit={(e) => handleSubmit(e)}
            id="input"
            className="flex py-2 flex-col mx-5 justify-center items-center gap-7"
          >
            <Input
              label="Hub Name:"
              placeholder="Enter Hub Name"
              name="name"
              value={formState}
              type="text"
              onChange={(e) => setFormState(e.target.value)}
            />
            <button className="w-full rounded-md h-10 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none hover:bg-primary-700" type="submit">Create Hub</button>
          </form>
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
