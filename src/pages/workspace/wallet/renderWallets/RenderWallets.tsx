import React from 'react';
import { useParams } from 'react-router-dom';
// import { getListsListService } from '../../../../features/list/listService';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';
import Pilot from '../../pilot';
import { getWalletServices } from '../../../../features/wallet/walletService';
import WalletSection from '../../hubs/components/renderHubs/items/itemsWalletData/WalletSection';
import ListSection from '../../hubs/components/renderHubs/items/itemsListData/ListSection';

function RenderWallets() {
  const { walletId } = useParams();
  const { currentWalletName } = useAppSelector((state) => state.workspace);

  // const { data: WalletListData } = useQuery({
  //   queryKey: ['walletdata', walletId],
  //   queryFn: getListsListService,
  // });

  const { data } = getWalletServices({ parentId: walletId });

  return (
    <div className="h-screen">
      <section id="nav" className="capitalize">
        <ListNav
          navName={currentWalletName}
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="flex h-full w-full">
        <div className="w-full overflow-y-scroll">
          <div>
            {data?.data.wallets.map((data) => (
              <WalletSection data={data} key={data.id} />
            ))}
            {data?.data.lists.map((data) => (
              <ListSection data={data} key={data.id} />
            ))}
          </div>
        </div>
        <div>
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderWallets;
