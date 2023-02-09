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

const columnBody = [
  {
    id: "open",
    title: "task 1",
    description:
      " a usually assigned piece of work often to be finished within a certain time. : something hard or unpleasant that has to be done.",
  },
  {
    id: "todo",
    title: "task 2",
    description:
      " a usually assigned piece of work often to be finished within a certain time. : something hard or unpleasant that has to be done.",
  },
  {
    id: "New",
    title: "task 3",
    description:
      " a usually assigned piece of work often to be finished within a certain time. : something hard or unpleasant that has to be done.",
  },
  {
    id: "To Discuss",
    title: "task 4",
    description:
      " a usually assigned piece of work often to be finished within a certain time. : something hard or unpleasant that has to be done.",
  },
  {
    id: "Deal with",
    title: "task 5",
    description:
      " a usually assigned piece of work often to be finished within a certain time. : something hard or unpleasant that has to be done.",
  },
];

function Board() {
  const [state, setState] = useState({
    columns: columns,
    selectedTask: null,
  });

  const [body, setBody] = useState({
    columnBody: columnBody,
    selectedTask: null,
  });

  return (
    <>
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
      <div className="flex gap-5 relative">
        {columnBody.map((column) => (
          <div
            key={column.id}
            className=" w-2/6 rounded shadow-md bg-white overflow-x-auto"
          >
            <h2 className="  text-xs uppercase bg-white h-10 pt-3 px-2 py-1 rounded font-bold">
              {column.title}
            </h2>
            <p className="text-xs pt-3 px-2 py-1 rounded font-bold">
              {column.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex mt-3 gap-5 relative">
        {columnBody.map((column) => (
          <div
            key={column.id}
            className=" w-2/6 rounded shadow-md bg-white overflow-x-auto"
          >
            <h2 className="  text-xs uppercase bg-white h-10 pt-3 px-2 py-1 rounded font-bold">
              {column.title}
            </h2>
            <p className="text-xs pt-3 px-2 py-1 rounded font-bold">
              {column.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
