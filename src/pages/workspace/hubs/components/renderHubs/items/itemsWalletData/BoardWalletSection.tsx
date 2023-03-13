import React from 'react';
import { dataProps } from '../ItemsHubData/ListTemplate';

interface Iprops {
  data: dataProps;
}

export default function BoardWalletSection({ data }: Iprops) {
  console.log(data);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}
