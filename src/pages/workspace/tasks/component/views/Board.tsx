import React, { useState } from "react";

const columns = [
  {
    id: "open",
    title: "open",
  },
  {
    id: "todo",
    title: "To do",
  },
  {
    id: "New",
    title: "New",
  },
  {
    id: "To Discuss",
    title: "To Discuss",
  },
  {
    id: "Deal with",
    title: "Deal with",
  },
];

function Board() {
  const [state, setState] = useState({
    columns: columns,
    selectedTask: null,
  });

  const handleTaskClick = (task) => {
    setState({ ...state, selectedTask: task });
  };

  return (
    <div className="flex gap-5 relative">
      {state.columns.map((column) => (
        <div
          key={column.id}
          className=" w-2/6  h-20 rounded shadow-md overflow-x-auto"
        >
          <div className="bg-gray-400 h-1 rounded-t-sm	overflow-x-auto	"></div>
          <h2 className="  text-xs uppercase bg-white h-10 pt-3 px-2 py-1 rounded font-bold">
            {column.title}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Board;
