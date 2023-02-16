import React from "react";
import { useAppSelector } from "../../../../../app/hooks";

function Board() {
  const { myTaskData } = useAppSelector((state) => state.task);
  console.log(myTaskData);

  return (
    <div className=" m-auto fgoverflow h-screen ">
      <div className="flex  gap-5  ">
        {myTaskData.map((column) => (
          <div
            key={column.id}
            className=" rounded shadow-md  "
            style={{ width: "500px" }}
          >
            <div className="bg-gray-400 w-56 h-1 rounded-t-sm "></div>
            <h2 className="  text-xs uppercase bg-white h-10 w-56 pt-3 px-2 py-1 rounded font-bold">
              {column.status}
            </h2>
            <h2 className="  text-xs uppercase bg-white w-56 h-10 mt-3 px-2 py-1 rounded font-bold">
              {column.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
