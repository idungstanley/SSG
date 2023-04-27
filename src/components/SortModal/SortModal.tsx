import { useEffect, useRef } from 'react';
import { SortOption } from '../../pages/workspace/tasks/component/views/listLevel/TaskListViews';
import { CiFilter } from 'react-icons/ci';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

type SortModalProps = {
  headers: string[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  arr: {
    sortAbleArr: Array<SortOption>;
    setSortAbleArr: React.Dispatch<React.SetStateAction<SortOption[]>>;
  };
  handleSortFn: (header: string, id: string) => void;
};

export default function SortModal({ headers, toggleModal, arr }: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { sortAbleArr, setSortAbleArr } = arr;

  const handleClick = (title: string) => {
    setSortAbleArr(
      sortAbleArr.map((sortOption) => {
        if (sortOption.field === title) {
          // const newDir = sortOption.dir === 'asc' ? 'desc' : 'asc';
          return { ...sortOption, dir: 'desc' };
        }
        return sortOption;
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <div className="fixed z-50 bg-white mt-20 shadow-lg" ref={modalRef}>
      <div className="flex flex-col space-y-2 w-44 px-1">
        <div className="flex flex-col space-y-1 border-b-2 justify-start px-2">
          {headers.map((title: string, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center font-semibold text-xs capitalize py-2 group cursor-pointer"
              style={{ color: '#78828d' }}
            >
              {title}
              <div className="flex items-center space-x-1">
                <CiFilter className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                <div className=" flex flex-col justify-center items-center w-6 h-6">
                  <IoMdArrowDropup className="text-gray-400" />
                  <IoMdArrowDropdown className="text-gray-400" onClick={() => handleClick(title)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
