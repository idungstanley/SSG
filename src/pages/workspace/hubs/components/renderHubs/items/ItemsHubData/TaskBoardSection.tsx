import React from "react";
import { dataProps } from "./ListTemplate";
import BoardHubData from "./BoardHubData";
import { useAppSelector } from "../../../../../../../app/hooks";

export default function TaskBoardSection({ data }: { data: dataProps }) {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return (
    <section key={data.id} className="bg-gray-100 pt-5 pl-5">
      {showPilot == false ? (
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
