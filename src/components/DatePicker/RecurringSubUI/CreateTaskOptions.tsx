import { useEffect, useState } from 'react';
import { getOneTaskServices } from '../../../features/task/taskService';
import { useParams } from 'react-router-dom';
import RadioWrapper from '../RadioWrapper';

export function CreateTaskOptions() {
  const { taskId } = useParams();

  const { data: task } = getOneTaskServices({ task_id: taskId != undefined ? taskId : null });

  const [taskDetails, setTaskDetails] = useState<string[]>([]);
  const [itemsArrState, setItemsState] = useState<boolean[]>([]);

  const strToRemove = ['id', 'name', '_id'];

  useEffect(() => {
    const data = task?.data.task;
    data &&
      setTaskDetails(
        Object.keys(data).filter((item) => {
          if (strToRemove.some((str) => item.includes(str))) {
            return false;
          }
          return true;
        })
      );
  }, [task]);

  useEffect(() => {
    setItemsState(new Array(taskDetails.length).fill(true));
  }, [taskDetails]);

  return (
    <div className="shadow-2xl rounded-lg p-1.5 bg-white absolute top-8 left-12 z-30 w-96 h-min">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1.5 px-2.5">
          <span className="font-bold">Include with New Task</span>
          <div className="flex space-x-1.5">
            <RadioWrapper>
              <span className="py-1.5">Include Everything</span>
            </RadioWrapper>
          </div>
          <div className="grid grid-cols-2 mx-auto">
            {taskDetails.map((col, i) => (
              <div key={i} className="flex space-x-1.5 capitalize py-1.5">
                <RadioWrapper
                  btnCheckState={itemsArrState[i]}
                  checkStateFn={() =>
                    setItemsState((prev) => {
                      const newState = [...prev];
                      newState[i] = !newState[i];
                      return newState;
                    })
                  }
                  stateValue={' '}
                >
                  <span>{typeof col === 'string' ? col.replace(/_/g, ' ') : col}</span>
                </RadioWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
