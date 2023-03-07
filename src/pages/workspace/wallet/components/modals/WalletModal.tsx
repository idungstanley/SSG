import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWalletService } from "../../../../../features/wallet/walletService";
import { Button, Input, SlideOver } from "../../../../../components";
import { useAppSelector } from "../../../../../app/hooks";
import { setCreateWalletSlideOverVisibility } from "../../../../../features/general/slideOver/slideOverSlice";
import {
  setSubDropdownMenu,
  setshowMenuDropdown,
} from "../../../../../features/hubs/hubSlice";
import { useDispatch } from "react-redux";

function WalletModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showMenuDropdownType, showMenuDropdown, SubMenuId, SubMenuType } =
    useAppSelector((state) => state.hub);
  const { showCreateWalletSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  const createWallet = useMutation(createWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateWalletSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const defaultWalletFormState = {
    name: "",
  };

  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createWallet.mutateAsync({
      name,
      hubID:
        (showMenuDropdownType == "hubs" ? showMenuDropdown : null) ||
        (showMenuDropdownType == "subhub" ? showMenuDropdown : null) ||
        (SubMenuType == "hubs" ? SubMenuId : null) ||
        (SubMenuType == "subhub" ? SubMenuId : null),
      walletId:
        (showMenuDropdownType == "wallet" ? showMenuDropdown : null) ||
        (showMenuDropdownType == "subwallet2" ? showMenuDropdown : null) ||
        (SubMenuType == "wallet" ? SubMenuId : null) ||
        (SubMenuType == "subWallet2" ? SubMenuId : null),
    });
  };

  const handleCloseSlider = () => {
    dispatch(setCreateWalletSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };
  return (
    <SlideOver
      show={showCreateWalletSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create wallet"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Wallet Name:"
              placeholder="Enter wallet Name"
              name="name"
              value={name}
              type="text"
              onChange={handleWalletChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Wallet"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default WalletModal;
