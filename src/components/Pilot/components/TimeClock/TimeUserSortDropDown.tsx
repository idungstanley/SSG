import { FiSearch } from 'react-icons/fi';
import { setTimeSortArr } from '../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { User } from './ClockLog';

type UserSortParams = {
  arr: User[];
  toggleModalFn: React.Dispatch<React.SetStateAction<boolean>>;
  memberIds: string[];
};

export function UserSortDropDown({ arr, toggleModalFn, memberIds }: UserSortParams) {
  const dispatch = useAppDispatch();
  const { timeSortArr } = useAppSelector((state) => state.task);
  const sortIds: string[] = [...new Set(memberIds)];

  const teamMember = arr.filter((obj, index, arr) => {
    return arr.findIndex((item) => item.id === obj.id) === index;
  });
  const handleSort = (id: number) => {
    dispatch(setTimeSortArr([...timeSortArr, sortIds[id]]));
  };
  return (
    <div tabIndex={0} onBlur={() => toggleModalFn(false)}>
      <div className="absolute top-5 left-2 z-50 w-60 max-h-204 bg-white shadow-xl rounded-md">
        <div className="relative my-2 z-50 border-b-2 pb-2">
          <input type="text" className="w-52 mx-auto pl-6 text-sm" placeholder="Search" />
          <FiSearch className="w-5 h-5 absolute left-5 top-2.5" />
        </div>
        <ul className="space-y-2 overflow-auto">
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
        </ul>
      </div>
    </div>
  );
}
