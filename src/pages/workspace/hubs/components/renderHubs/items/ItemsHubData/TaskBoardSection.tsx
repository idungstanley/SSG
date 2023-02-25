import React from "react";
import { dataProps } from "./ListTemplate";
import BoardHubData from "./BoardHubData";
import { useAppSelector } from "../../../../../../../app/hooks";

export default function TaskBoardSection({ data }: { data: dataProps }) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { show } = pilotSideOver;

  return (
    <section key={data.id} className="bg-gray-100 pt-5 pl-5">
      {show == false ? (
        <div className="fgoverflow2">
          <BoardHubData hubId={data.id} hubName={data.name} />
        </div>
      ) : (
        <div className="fgoverflow">
          <BoardHubData hubId={data.id} hubName={data.name} />
        </div>
      )}
    </section>
  );
}
