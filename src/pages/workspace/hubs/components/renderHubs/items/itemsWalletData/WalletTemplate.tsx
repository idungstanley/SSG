import React from "react";
import ItemsWalletData from "./ItemsWalletData";

export default function WalletTemplate({ data }: any) {
  return (
    <div>
      <div>
        {<ItemsWalletData walletId={data.id} walletName={data.name} />}
        <p>helo</p>
      </div>
    </div>
  );
}
