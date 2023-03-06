import React from 'react';
import { dataProps } from '../../../../../../../components/Index/walletIndex/WalletIndex';
import ItemsWalletData from './ItemsWalletData';
// import ItemsHubData from '.';

interface Iprops {
  data: dataProps;
}
export default function WalletSection({ data }: Iprops) {
  return (
    <section id="listcard" key={data.id}>
      <div className=" bg-white ">
        {/* card */}
        <div
          className="flex items-center mx-1 px-5  border border-gray-100 rounded relative"
          style={{ backgroundColor: '#e1e4e5' }}
        >
          <div className=" absolute  left-0 top-0 h-full w-1 rounded-l-md" style={{ backgroundColor: '#78828d' }}></div>
          {/* data and input */}
          <div className="w-full flex flex-col">{<ItemsWalletData walletId={data.id} walletName={data.name} />}</div>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
