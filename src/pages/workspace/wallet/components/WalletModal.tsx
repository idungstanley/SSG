/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWalletService } from '../../../../features/wallet/walletService';
import { Button, Input } from '../../../../components';

interface WalletModalProps {
  walletVisible: boolean;
  onCloseWalletModal: any ;
  walletId: string;
}

function WalletModal({ walletVisible, onCloseWalletModal, walletId }: WalletModalProps) {
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

  const hubID = JSON.parse(localStorage.getItem('currentHubId') || '"' );

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
    <div className="w-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-5/12 flex flex-col">
        <div
          className="text-white text-xl place-self-end"
          onClick={() => onCloseWalletModal()}
        >
          X
        </div>
        <div className="bg-white p-2 rounded">
          <section className="header pl-4 pt-4 h-24">
            <h3 className="font-bold text-xl">Create Wallet</h3>
          </section>
          <div className="selectors mt-4 space-x-4  flex justify-start ml-6">
            <h3 className="font-bold rounded p-1 hover:bg-gray-300 hover:rounded">
              New
            </h3>
            <h3 className="font-bold rounded p-1 hover:bg-gray-300 hover:rounded">
              Template
            </h3>
          </div>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <section id="listform">
            <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
              <Input
                label="Wallet Name:"
                placeholder="Enter Wallet Name"
                name="name"
                value={name}
                type="text"
                onChange={handleWalletChange}
              />
            </div>
            <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
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
