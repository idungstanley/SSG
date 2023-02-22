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

  return (
    <>
      <div className="hei flex gap-5 ">
        {Object.keys(newData).map((key) => (
          <div key={key} className="">
            <h3 className="">{key}</h3>
          </div>
        ))}
      </div>
      {/* <div className="hei">
        {myTaskData.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div> */}
    </>
  );
}
