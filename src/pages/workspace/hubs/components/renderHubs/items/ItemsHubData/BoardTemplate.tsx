import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import { ImyTaskData } from "../../../../../../../features/task/taskSlice";

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

  return (
    <div>
      {data?.data.tasks.reduce((cache: ImyTaskData, product: ImyTaskData) =>
        console.log(product, cache)
      )}
    </div>

    //     <div>
    //       {data?.data.tasks.map((task: ImyTaskData) => {
    //         return <div key={task.id}>{task.status}</div>;
    //       })}
    //     </div>
  );
}
