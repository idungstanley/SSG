import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWalletServices } from "../../../../../features/wallet/walletService";
import { useAppSelector } from "../../../../../app/hooks";
import {
  setActiveEntity,
  setActiveItem,
  setShowHub,
} from "../../../../../features/workspace/workspaceSlice";
import { useDispatch } from "react-redux";
import LastListIndex from "./LastListIndex";
import MenuDropdown from "../../../../../components/Dropdown/MenuDropdown";
import { dataProps } from "../../../../../components/Index/walletIndex/WalletIndex";
import WalletItem from "../../../../../components/tasks/WalletItem";
import ListItem from "../../../../../components/tasks/ListItem";

interface Sub2WalletIndexProps {
  paddingLeft?: string;
  currWalId?: string;
}

function Sub2WalletIndex({
  paddingLeft = "56",
  currWalId,
}: Sub2WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet3, setShowSubWallet3] = useState<string | null>(null);
  const [finalParentId, setFinalWalletParentId] = useState("");
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currWalId,
  });

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setFinalWalletParentId(id);
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();

  const handleLocation = (id: string, type = "sub2wallet") => {
    dispatch(setShowHub(true));
    navigate(`/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id: id, type: "wallet" }));
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet: dataProps) => (
        <div key={wallet.id}>
          <WalletItem
            showSubWallet={showSubWallet3}
            walletType="subwallet3"
            wallet={wallet}
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            paddingLeft={paddingLeft}
          />
          {showSubWallet3 === wallet.id ? (
            <LastListIndex finalParentId={finalParentId} />
          ) : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
        <ListItem list={list} paddingLeft="87" />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}
export default Sub2WalletIndex;
