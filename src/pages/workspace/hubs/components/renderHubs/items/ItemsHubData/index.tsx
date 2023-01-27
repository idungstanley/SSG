import React from "react";
import { useAppSelector } from "../../../../../../../app/hooks";
import { useGetHubChildren } from "../../../../../../../features/hubs/hubService";
import TaskData from "../../../../../tasks/component/taskData/TaskData";
import "../ItemsHubData/wallet.css";

interface ItemsHubDataProps {
  hubId: string | null;
}
export default function ItemsHubData({ hubId }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });
  return (
    <section>
      {/* wallets */}
      <div className="stac">{data?.data.wallets.map((item) => item.name)}</div>

      {/* lists */}
      <div className="">
        {data?.data.lists.map((item) => {
          return (
            <div key={item.name}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
