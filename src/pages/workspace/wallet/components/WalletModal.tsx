/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWalletService } from '../../../../features/wallet/walletService';
import { Button, Input } from '../../../../components';

interface WalletModalProps {
  walletVisible: boolean;
  onCloseWalletModal: () => void;
  walletId: string;
}

function WalletModal({
  walletVisible,
  onCloseWalletModal,
  walletId,
}: WalletModalProps) {
  const queryClient = useQueryClient();
  const createWallet = useMutation(createWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseWalletModal();
    },
  });

  const defaultWalletFormState = {
    name: '',
  };

  const hubID = JSON.parse(localStorage.getItem('currentHubId') || '"');

  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;

  const onSubmit = async () => {
    await createWallet.mutateAsync({
      name,
      hubID,
      walletId,
    });
  };

  if (!walletVisible) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 flex items-center justify-center w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col w-5/12">
        <div
          className="text-xl text-white place-self-end"
          onClick={() => onCloseWalletModal()}
        >
          X
        </div>
        <div className="p-2 bg-white rounded">
          <section className="h-24 pt-4 pl-4 header">
            <h3 className="text-xl font-bold">Create Wallet</h3>
          </section>
          <div className="flex justify-start mt-4 ml-6 space-x-4 selectors">
            <h3 className="p-1 font-bold rounded hover:bg-gray-300 hover:rounded">
              New
            </h3>
            <h3 className="p-1 font-bold rounded hover:bg-gray-300 hover:rounded">
              Template
            </h3>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <section id="listform">
            <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
              <Input
                label="Wallet Name:"
                placeholder="Enter Wallet Name"
                name="name"
                value={name}
                type="text"
                onChange={handleWalletChange}
              />
            </div>
            <div className="px-4 mb-8 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
              <Button
                buttonStyle="primary"
                onClick={onSubmit}
                label="Create List"
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

export default WalletModal;
