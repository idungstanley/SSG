import React from "react";
import Status from "./status/Status";
import Priority from "./priority/Priority";
import CustomReference from "./customReference/CustomReference";
import Share from "./share/Share";
import EntitySettings from "./entitySettings/EntitySettings";
import Assignees from "./assignees/Assignees";
import Subscribers from "./subscribers/Subscribers";
import { AvatarWithInitials } from "../../../../../../components";
import SubDetails from "./subDetailsType/tasks/SubDetails";
import HubSubDetails from "./subDetailsType/hubs/HubSubDetails";
import { useAppSelector } from "../../../../../../app/hooks";
import WalletSubDetails from "./subDetailsType/wallets/WalletSubDetails";
import ListSubDetails from "./subDetailsType/lists/ListSubDetails";
import { UseGetHubDetails } from "../../../../../../features/hubs/hubService";
import { UseGetWalletDetails } from "../../../../../../features/wallet/walletService";
import { UseGetListDetails } from "../../../../../../features/list/listService";
import { getOneTaskServices } from "../../../../../../features/task/taskService";
import ToolTip from "../../../../../../components/Tooltip";

export default function DetailsIndex() {
  const { activeItemId, activeItemType } = useAppSelector(
    (state) => state.workspace
  );
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const { data: hub } = UseGetHubDetails({
    activeItemId,
    activeItemType,
  });
  const { data: wallet } = UseGetWalletDetails({
    activeItemId,
    activeItemType,
  });
  const { data: list } = UseGetListDetails({
    activeItemId,
    activeItemType,
  });
  const { data: task } = getOneTaskServices({ task_id: currentTaskIdForPilot });

  const taskDetails = task?.data.task;
  const hubDetails = hub?.data.hub;
  const walletDetails = wallet?.data.wallet;
  const listDetails = list?.data.list;

  const showDetailsType = () => {
    if (activeItemType == "hub" || activeItemType == "subhub") {
      return <HubSubDetails hubDetails={hubDetails} key={hubDetails?.id} />;
    } else if (activeItemType == "task") {
      return <SubDetails taskDetails={taskDetails} key={taskDetails?.id} />;
    } else if (activeItemType == "wallet" || activeItemType == "subWallet") {
      return (
        <WalletSubDetails
          walletDetails={walletDetails}
          key={walletDetails?.id}
        />
      );
    } else if (activeItemType == "list") {
      return <ListSubDetails listDetails={listDetails} key={listDetails?.id} />;
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <section className="flex items-center space-x-3">
          <ToolTip tooltip="Status">
            <Status />
          </ToolTip>
          <ToolTip tooltip="Priority">
            <Priority />
          </ToolTip>
        </section>
        <section className="flex items-center justify-center space-x-3">
          <CustomReference />
          <ToolTip tooltip="Share">
            <Share />
          </ToolTip>
          <EntitySettings />
        </section>
      </div>
      <section className="flex items-center mt-3 space-x-2">
        <ToolTip tooltip="Assignees">
          <Assignees />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <ToolTip tooltip="Subscribers">
          <Subscribers />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <AvatarWithInitials
          initials="DN"
          backgroundColour="blue"
          roundedStyle="rounded"
          height="h-5"
          width="w-5"
        />
      </section>
      <section className="mt-3">{showDetailsType()}</section>
    </>
  );
}
