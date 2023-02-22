import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import { ImyTaskData } from "../../../../../../../features/task/taskSlice";

interface listIdprops {
  listId: string;
}
export default function BoardTemplate({ listId }: listIdprops) {
  const { data } = getTaskListService({ listId });

  const products = data?.data.tasks;

  const groupBy = (key: string, arr) =>
    arr.reduce(
      (cache, product) => ({
        ...cache,
        [product[key]]:
          product[key] in cache
            ? cache[product[key]].concat(product)
            : [product],
      }),
      {}
    );

  const newData = groupBy("status", products);

  console.log(products);

  return (
    <>
      <div className=" dynamic gap-5  ">
        {Object.keys(newData).map((key) => {
          return (
            <>
              <div
                key={key}
                className="relative -mt-10 h-10 flex justify-center items-center shadow-md rounded w-56 bg-white p-3  "
              >
                <div className=" absolute top-0 rounded bg-gray-400 w-full h-1"></div>
                <h3 className="absolute left-0 pl-3 ">{key}</h3>
              </div>
              <div className="-ml-10 mt-5  ">
                {newData[key].map((items: ImyTaskData) => {
                  return (
                    <div
                      key={items.id}
                      className=" bg-white h-28 mt-3  shadow-md   w-56 p-2"
                      style={{ marginLeft: "-80px" }}
                    >
                      <div className="flex justify-between">
                        <p className="">{items.name}</p>
                        <p>nath</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
