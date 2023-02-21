import React from "react";
import { dataProps } from "./ListTemplate";
import BoardHubData from "./BoardHubData";

export default function TaskBoardSection({ data }: { data: dataProps }) {
  console.log(data);

  return (
    <section key={data.id} className="bg-gray-100 pt-5 pl-5">
      <div className="fgoverflow">
        <BoardHubData hubId={data.id} hubName={data.name} />
      </div>
    </section>
  );
}
