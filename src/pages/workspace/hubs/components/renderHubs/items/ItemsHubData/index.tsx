import React from 'react';
import { useGetHubChildren } from '../../../../../../../features/hubs/hubService';

interface ItemsHubDataProps {
  hubId: string | null;
}
export default function ItemsHubData({ hubId }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });
  return (
    <section>
      {/* wallets */}
      <div>{data?.data.wallets.map((item) => item.name)}</div>

      {/* lists */}
      <div>{data?.data.lists.map((item) => item.name)}</div>
    </section>
  );
}
