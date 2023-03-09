import React from 'react';
import { useGetHubChildren } from '../../../../../../../features/hubs/hubService';
import { dataProps } from './ListTemplate';
import BoardTemplate from './BoardTemplate';

interface ItemsHubDataProps {
  hubId: string | null;
  hubName: string | null;
}

export default function BoardHubData({ hubId, hubName }: ItemsHubDataProps) {
  console.log(hubId, hubName);
  const { data } = useGetHubChildren({ query: hubId });

  return (
    <section>
      <div>
        {data?.data.lists.map((item: dataProps) => {
          return (
            <>
              {/* <div key={item.id}>{item.name}</div> */}
              <div className="pt-10 ">
                <BoardTemplate listId={item.id} hubName={item.name} />
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
