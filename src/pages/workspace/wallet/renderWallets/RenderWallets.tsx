import React from 'react';
import { useParams } from 'react-router-dom';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';
import { getWalletServices } from '../../../../features/wallet/walletService';
import WalletSection from '../../hubs/components/renderHubs/items/itemsWalletData/WalletSection';
import ListSection from '../../hubs/components/renderHubs/items/itemsListData/ListSection';
import { dataProps } from '../../../../components/Index/walletIndex/WalletIndex';
import PageWrapper from '../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../components/PilotSection';

function RenderWallets() {
  const { walletId } = useParams();
  const { currentWalletName } = useAppSelector((state) => state.workspace);

  const { data } = getWalletServices({ parentId: walletId });

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <ListNav
            navName={currentWalletName}
            viewsList="List"
            viewsList2="Board"
            changeViews="View"
          />
        }
      >
        <div
          className="w-full overflow-y-scroll"
          style={{ minHeight: '0', maxHeight: '80vh' }}
        >
          {data?.data.wallets.map((data: dataProps) => (
            <WalletSection data={data} key={data.id} />
          ))}
          {data?.data.lists.map((data: dataProps) => (
            <ListSection data={data} key={data.id} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
}

export default RenderWallets;
