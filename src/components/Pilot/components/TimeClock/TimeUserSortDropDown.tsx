import { FiSearch } from 'react-icons/fi';
import { setTimeSortArr } from '../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { User } from './ClockLog';
import { useState } from 'react';

type UserSortParams = {
  arr: User[];
  toggleModalFn: React.Dispatch<React.SetStateAction<boolean>>;
  memberIds: string[];
};

export function UserSortDropDown({ arr, toggleModalFn, memberIds }: UserSortParams) {
  const dispatch = useAppDispatch();
  const sortIds: string[] = [...new Set(memberIds)];
  const [idArr, setArr] = useState<string[]>([]);

  const teamMember = arr.filter((obj, index, arr) => {
    return arr.findIndex((item) => item.id === obj.id) === index;
  });
  const handleSort = (id: number) => {
    setArr((prev) => [...prev, sortIds[id]]);
  };

  const handleDispatch = () => {
    dispatch(setTimeSortArr(idArr));
  };

  return (
    <div tabIndex={0} onBlur={() => toggleModalFn(false)}>
      <div className="absolute top-5 left-2 z-50 w-60 max-h-204 bg-white shadow-xl rounded-md">
        <div className="relative my-2 z-50 border-b-2 pb-2">
          <input type="text" className="w-52 mx-auto pl-6 text-sm" placeholder="Search" />
          <FiSearch className="w-5 h-5 absolute left-5 top-2.5" />
        </div>
        <ul className="space-y-2 overflow-auto pb-2">
          {teamMember.map((el, index) => {
            return (
              <li
                key={el.id}
                className="flex items-center py-2 alt-task px-4 cursor-pointer"
                onClick={() => handleSort(index)}
              >
                {el.name}
              </li>
            );
          })}
          <button
            type="button"
            className="float-right p-1 bg-purple-600 text-white font-bold capitalize rounded-md z-50 my-2 mr-2"
            tabIndex={0}
            onMouseDown={() => handleDispatch()}
          >
            done
          </button>
        </ul>
      </div>
    </div>
  );
}
