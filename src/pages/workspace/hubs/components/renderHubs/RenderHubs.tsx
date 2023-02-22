import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../app/hooks";
import ListNav from "../../../lists/components/renderlist/ListNav";
import { useGetHubChildren } from "../../../../../features/hubs/hubService";
import TaskListSections from "./items/ItemsHubData/TaskListSections";
import Pilot from "../../../pilot";
import WalletSection from "./items/itemsWalletData/WalletSection";
import ListSection from "./items/itemsListData/ListSection";
import ListFilter from "../../../lists/components/renderlist/listDetails/ListFilter";
import { dataProps } from "../../../../../components/Index/walletIndex/WalletIndex";
import TaskBoardSection from "./items/ItemsHubData/TaskBoardSection";

function RenderHubs() {
  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { data: HubDetail } = useGetHubChildren({ query: hubId });
  const { boardView } = useAppSelector((state) => state.task);
  return (
    <div className="h-screen">
      <section id="nav" className="capitalize">
        <ListNav
          navName={activeItemName}
          viewsList="List"
          viewsList1="Table"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="flex w-full h-full bg-white">
        {/* ListList */}
        <div className="pr-1 pt-0.5 w-full h-full">
          <div
            className="w-full  scrollbarDynCol"
            style={{ minHeight: "0", maxHeight: "100vh" }}
          >
            <div className="w-full">
              <ListFilter />
            </div>
            {/* Board */}
            {boardView && (
              <div>
                {HubDetail?.data?.hubs.map((data: dataProps) => (
                  <div key={data.id}>
                    <TaskBoardSection data={data} />
                  </div>
                ))}
              </div>
            )}

            <div>
              {HubDetail?.data.hubs.map((data: dataProps) => (
                <TaskListSections data={data} key={data.id} />
              ))}
              {HubDetail?.data.wallets.map((data: dataProps) => (
                <WalletSection data={data} key={data.id} />
              ))}
              {HubDetail?.data.lists.map((data: dataProps) => {
                return <ListSection data={data} key={data.id} />;
              })}
            </div>
          </div>
        </div>
        <div>
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderHubs;
