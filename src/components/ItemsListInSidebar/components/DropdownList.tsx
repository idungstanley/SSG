import React from "react";
import WalletIndex from "../../Index/walletIndex/WalletIndex";
import ListIndex from "../../Index/listIndex/ListIndex";
import InboxIndex from "../../Index/InboxIndex";
import { useAppSelector } from "../../../app/hooks";
import SubHubIndex from "../../Index/subHubIndex/SubHubIndex";

export default function DropdownList() {
  const { currentItemId, currentItemType } = useAppSelector(
    (state) => state.workspace
  );

  return currentItemType === "hub" ? (
    <>
      <SubHubIndex />
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
    </>
  ) : (
    <InboxIndex />
  );
}
