import React from "react";
import { useAppSelector } from "../../../../../app/hooks";

function Board() {
  const { myTaskData } = useAppSelector((state) => state.task);
  console.log(myTaskData);

  return (
    <div className=" m-auto fgoverflow ">
      <div className="flex  gap-5  ">
        {myTaskData.map((column) => (
          <div
            key={column.id}
            className=" rounded shadow-md  "
            style={{ width: "500px" }}
          >
            <div className="bg-gray-400 w-64 h-1 rounded-t-sm "></div>
            <div className="  text-xs uppercase bg-white h-10 w-64 pt-3 px-2 py-1 rounded font-bold">
              {column.status}
            </div>
            <div className="  text-xs uppercase bg-white h-48 w-64 h-10 mt-3 px-2 py-1 rounded font-bold">
              {column.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
