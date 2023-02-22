import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";
// import { ImyTaskData } from "../../../../../../../features/task/taskSlice";
// import TaskData from "../../../../../tasks/component/taskData/TaskData";
// import { useAppSelector } from "../../../../../../../app/hooks";
// import { ImyTaskData } from "../../../../../../../features/task/taskSlice";

interface listIdprops {
  listId: string;
}
export default function BoardTemplate({ listId }: listIdprops) {
  const { data } = getTaskListService({ listId });
  //   const myData = data?.data.tasks;
  //   const groupBy = (key, arr) =>
  //     arr.reduce(
  //       (cache, product) => ({ ...cache, [product[key]]: [product] }),
  //       {}
  //     );
  const products = data?.data.tasks;

  //   const { myTaskData } = useAppSelector((state) => state.task);

  //   const groupBy = (key: string, arr) => arr.reduce((cache,product)=> ({...cache, [product[key]] :product[key] in cache ? cache[product[key]].concat(product) : [product]}),{});

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

  //   console.log(groupBy("status", products));

  //   console.log(groupBy);

  const newData = groupBy("status", products);

  console.log(newData);
  //   console.log(newData[0].name);
  Object.keys(newData).map((item) => {
    console.log(item);
  });

  //   Object.keys(newData).map((item) => {
  //     newData[item].map((each) => {
  //       console.log(each.name);
  //     });
  //   });

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
                {newData[key].map((items) => {
                  return (
                    <div
                      key={items.id}
                      className=" bg-white h-32 mt-3  shadow-md   w-56 p-2"
                      style={{ marginLeft: "-80px" }}
                    >
                      <p className="">{items.name}</p>
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
