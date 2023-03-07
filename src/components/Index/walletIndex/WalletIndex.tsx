import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubWalletIndex from "../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import {
  setActiveEntity,
  setActiveItem,
  setCurrentWalletId,
  setCurrentWalletName,
  setShowHub,
} from "../../../features/workspace/workspaceSlice";
import MenuDropdown from "../../Dropdown/MenuDropdown";
import { setWalletItem } from "../../../features/wallet/walletSlice";
import SubDropdown from "../../Dropdown/SubDropdown";
import { getWalletServices } from "../../../features/wallet/walletService";
import { useGetHubWallet } from "../../../features/hubs/hubService";
import WalletItem from "../../tasks/WalletItem";
import CreateWL from "../../tasks/CreateWL";

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
  paddingLeft: string | number;
}

export interface dataProps {
  id: string;
  name: string;
}

function WalletIndex({
  showHubList,
  getCurrentHubId,
  paddingLeft,
}: WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const { SubMenuId, showMenuDropdown } = useAppSelector((state) => state.hub);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { data: walletAndListData } = useGetHubWallet(getCurrentHubId);

  const { data } = getWalletServices({
    hubId: getCurrentHubId,
    Archived: toggleArchiveWallet,
  });

  const navigate = useNavigate();
  const handleLocation = (id: string, name: string, type = "wallet") => {
    dispatch(setShowHub(true));
    navigate(`/wallet/${id}`);
    setShowSubWallet(id);
    dispatch(setCurrentWalletId(id));
    dispatch(
      setWalletItem({
        currentWalletParentId: id,
        currentWalletParentType: "wallet",
      })
    );
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name,
      })
    );
    dispatch(setActiveEntity({ id: id, type: "wallet" }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet(null);
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet(id);
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: "wallet",
        })
      );
    }
  };

  return walletAndListData?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? "block" : "hidden"}`}>
      {walletAndListData?.data.lists.length === 0 &&
        walletAndListData?.data.wallets.length === 0 && (
          <CreateWL paddingLeft={paddingLeft} />
        )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map((wallet: dataProps) => (
          <div key={wallet.id}>
            <WalletItem
              wallet={wallet}
              walletType="wallet"
              handleLocation={handleLocation}
              handleShowSubWallet={handleShowSubWallet}
              showSubWallet={showSubWallet}
              paddingLeft={paddingLeft}
            />
            <div>
              {showSubWallet === wallet.id ? (
                <SubWalletIndex paddingLeft={Number(paddingLeft) + 25} />
              ) : null}
            </div>
            {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
            {SubMenuId === wallet.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
