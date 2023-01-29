import React from "react";
import ItemsHubData from ".";

export default function SubHubSections({ data }: any) {
  return (
    <div className=" capitalize ">
      <ItemsHubData hubId={data.id} hubName={data.name} />
    </div>
  );
}
