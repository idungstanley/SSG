import React from "react";
import ItemsWalletData from "./ItemsWalletData";
// import ItemsHubData from '.';

export default function WalletSection({ data }: any) {
  return (
    <section id="listcard" key={data.id}>
      <div className=" bg-white ">
        <div id="listTitle" className="flex items-center justify-between"></div>
        {/* card */}
        <div
          className="flex items-center m-1 p-5  border border-gray-100 rounded relative"
          style={{ backgroundColor: "#e1e4e5" }}>
          <div
            className=" absolute  left-0 top-0 h-full w-1 rounded-l-md"
            style={{ backgroundColor: "#78828d" }}>
            <p className="opacity-0">t</p>
          </div>
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
