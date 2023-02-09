import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import { useGetHubChildren } from '../../../../../features/hubs/hubService';
import TaskListSections from './items/ItemsHubData/TaskListSections';
import Pilot from '../../../pilot';
import WalletSection from './items/itemsWalletData/WalletSection';
import ListSection from './items/itemsListData/ListSection';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';

function RenderHubs() {
  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { data: HubDetail } = useGetHubChildren({ query: hubId });
    return (
      <div className="h-screen">
        <section id="nav" className="capitalize">
          <ListNav
            navName={activeItemName}
            viewsList="List"
            viewsList2="Board"
            changeViews="View"
          />
        </section>
        <section className="flex w-full h-full bg-white">
          {/* ListList */}
          <div className="w-full overflow-y-scroll">
            <div className="w-full">
              <ListFilter />
            </div>
            <div>
              {HubDetail?.data.hubs.map((data) => (
                <TaskListSections data={data} key={data.id} />
              ))}
              {HubDetail?.data.wallets.map((data) => (
                <WalletSection data={data} key={data.id} />
              ))}
              {HubDetail?.data.lists.map((data) => {
                return <ListSection data={data} key={data.id} />;
              })}
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
