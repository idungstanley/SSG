import React from 'react';
import { dataProps } from '../ItemsHubData/ListTemplate';

interface Iprops {
  data: dataProps;
}

export default function BoardWalletSection({ data }: Iprops) {
  // eslint-disable-next-line no-console
  console.log(data);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}
