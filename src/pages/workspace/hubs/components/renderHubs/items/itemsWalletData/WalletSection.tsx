import React from "react";
import ItemsWalletData from "./ItemsWalletData";
// import ItemsHubData from '.';

export default function WalletSection({ data }: any) {
  return (
    <section id="listcard" className="" key={data.id}>
      <div className=" bg-white ">
        <div id="listTitle" className="flex items-center justify-between"></div>
        {/* card */}
        <div
          className="flex items-center m-1  border border-gray-100 rounded"
          style={{ backgroundColor: "#e1e4e5" }}
        >
          {/* data and input */}
          <div className="w-full flex flex-col">
            {<ItemsWalletData walletId={data.id} walletName={data.name} />}
          </div>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
