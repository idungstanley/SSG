import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getOneTaskServices } from '../../../features/task/taskService';
import { useParams } from 'react-router-dom';
import RadioWrapper from '../RadioWrapper';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  setColumns: Dispatch<SetStateAction<string[] | 'everything'>>;
  closeFn: Dispatch<SetStateAction<boolean>>;
  parentBtnState: string;
  parentBtnFn: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

export function CreateTaskOptions({ setColumns, closeFn, parentBtnFn, parentBtnState }: Props) {
  const { taskId } = useParams();
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { data: task } = getOneTaskServices({
    task_id: taskId != undefined ? taskId : activeItemType === 'task' ? activeItemId : null
  });

  const [taskDetails, setTaskDetails] = useState<string[]>([]);
  const [itemsArrState, setItemsState] = useState<boolean[]>([]);
  const [colState, setColState] = useState('');

  const handleSubmit = (str?: boolean) => {
    if (str) {
      setColumns('everything');
    } else {
      setColumns(taskDetails.filter((_, i) => itemsArrState[i]));
    }
    closeFn(false);
  };

  const handleCancel = () => {
    parentBtnFn((prev) => ({ ...prev, [parentBtnState]: !prev[parentBtnState] }));
    closeFn(false);
  };

  const strToRemove = ['id', 'name', '_id'];

  const colSetFn = () => {
    const newArr = new Array(taskDetails.length).fill(true);
    newArr.fill(false, newArr.length - 3);
    setItemsState(newArr);
  };

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
    colSetFn();
  }, [taskDetails]);

  useEffect(() => {
    if (colState === 'everything') {
      setItemsState(new Array(taskDetails.length).fill(true));
    } else {
      colSetFn();
    }
  }, [colState]);

  return (
    <div className="shadow-2xl rounded-lg p-1.5 bg-white absolute top-8 left-12 z-30 w-96 h-min">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1.5 px-2.5">
          <span className="font-bold">Include with New Task</span>
          <div className="flex space-x-1.5">
            <RadioWrapper
              btnCheckState={!!colState}
              checkStateFn={() => setColState((prev) => (prev === 'everything' ? '' : 'everything'))}
              stateValue=" "
            >
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
          <div className="flex justify-end space-x-2.5">
            <button
              className="border border-alsoit-gray-100 text-alsoit-gray-100 p-1.5 rounded-md text-alsoit-text-md capitalize"
              onClick={handleCancel}
            >
              cancel
            </button>
            <button
              className="border border-alsoit-success p-1.5 rounded-md text-alsoit-success capitalize text-alsoit-text-md"
              onClick={() => handleSubmit(colState === 'everything' ? true : false)}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
