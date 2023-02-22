import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getListsListService } from '../../../../features/list/listService';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import { getWalletServices } from '../../../../features/wallet/walletService';
import WalletSection from '../../hubs/components/renderHubs/items/itemsWalletData/WalletSection';
import ListSection from '../../hubs/components/renderHubs/items/itemsListData/ListSection';
import { dataProps } from '../../../../components/Index/walletIndex/WalletIndex';
import PageWrapper from '../../../../components/PageWrapper';
import pilotConfig from '../components/PilotSection';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';

function RenderWallets() {
  const dispatch = useAppDispatch();
  const { walletId } = useParams();
  const { currentWalletName } = useAppSelector((state) => state.workspace);

  // const { data: WalletListData } = useQuery({
  //   queryKey: ['walletdata', walletId],
  //   queryFn: getListsListService,
  // });

  const { data } = getWalletServices({ parentId: walletId });

  // set data for pilot
  useEffect(() => {
    const selectedItemId = walletId;
    const selectedItemType = 'wallet';

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: true,
        })
      );
    }
  }, [walletId]);

  return (
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
  );
}

export default RenderWallets;
