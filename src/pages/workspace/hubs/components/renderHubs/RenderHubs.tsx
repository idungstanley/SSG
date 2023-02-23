import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import { useGetHubChildren } from '../../../../../features/hubs/hubService';
import TaskListSections from './items/ItemsHubData/TaskListSections';
import WalletSection from './items/itemsWalletData/WalletSection';
import ListSection from './items/itemsListData/ListSection';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';
import PageWrapper from '../../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../PilotSection';

function RenderHubs() {
  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { data: HubDetail } = useGetHubChildren({ query: hubId });

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <ListNav
            navName={activeItemName}
            viewsList="List"
            viewsList2="Board"
            changeViews="View"
          />
        }
      >
        <div className="w-full h-full">
          <div className="w-full">
            <ListFilter />
          </div>
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
      </PageWrapper>
    </>
  );
}

export default RenderHubs;
