import React from "react";
import { useAppSelector } from "../../../../../app/hooks";

function Board() {
  const { myTaskData } = useAppSelector((state) => state.task);

  return (
    <>
      <div className="flex flex-wrap gap-5 relative overflow-x-auto">
        {myTaskData.map((column) => (
          <div
            key={column.id}
            className=" w-2/6  h-20 rounded shadow-md overflow-x-auto "
          >
            <div className="bg-gray-400 h-1 rounded-t-sm 	"></div>
            <h2 className="  text-xs uppercase bg-white h-10 pt-3 px-2 py-1 rounded font-bold">
              {column.status}
            </h2>
          </div>
        ))}
        <div>
          <p>hi</p>
        </div>
      </div>
    </>
  );
}

export default Board;
