import { useEffect, useRef, useState } from 'react';
import { SortOption } from '../../pages/workspace/tasks/component/views/listLevel/TaskListViews';
import { CiFilter } from 'react-icons/ci';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineFileSearch } from 'react-icons/ai';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const [filterDropDown, setFilterDropDown] = useState<boolean>(false);

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

  const switchBtns = (field: string) => {
    if (field === 'sortBtn') {
      setSortDropDown((prev) => !prev);
    } else if (field === 'filterBtn') {
      setFilterDropDown((prev) => !prev);
    }
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
    <div className="fixed z-50 bg-white shadow-lg" ref={modalRef}>
      <div className="flex flex-col bg-white w-80 absolute top-2 px-1 rounded-md shadow-2xl" style={{ height: '65vh' }}>
        <span className="text-xs text-center mt-4">Sorted columns</span>
        <div className="flex flex-col space-y-1 border-b-2 justify-start mx-4 capitalize pb-4">
          {headers.map((title: string, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center font-semibold text-xs capitalize py-2 pl-1 space-y-2 my-1 group cursor-pointer alt-task rounded-md"
              style={{ color: '#78828d' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {title}
              <div className="flex items-center space-x-1">
                {index === hoveredIndex && (
                  <CiFilter className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                )}
                <div className=" flex flex-col justify-center items-center w-6 h-6">
                  <IoMdArrowDropup className="text-gray-400" />
                  <IoMdArrowDropdown className="text-gray-400" onClick={() => handleClick(title)} />
                </div>
              </div>
            </div>
          ))}
          {/* sort implementation */}
          <div className="flex justify-between pr-1">
            <span>sort by color</span>
            {!sortDropDown ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('sortBtn')} />
            ) : (
              <AiFillCaretLeft className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('sortBtn')} />
            )}
          </div>
        </div>
        {/* filter implementation */}
        <div className="flex flex-col space-y-6 mx-4 capitalize">
          <div className="relative">
            <input type="text" className="w-full border outline-none rounded-md" />
            <AiOutlineFileSearch className="absolute right-2 top-2 w-6 h-6" />
          </div>
          <div className="flex justify-between pr-1">
            <span>filter by color</span>
            {!filterDropDown ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            ) : (
              <AiFillCaretLeft className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            )}
          </div>
          <div className="flex justify-between pr-1">
            <span>filter by condition</span>
            {!filterDropDown ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            ) : (
              <AiFillCaretLeft className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            )}
          </div>
          <div className="flex justify-between pr-1">
            <span>filter by values</span>
            {!filterDropDown ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            ) : (
              <AiFillCaretLeft className="text-gray-400 font-bold h-3 w-3" onClick={() => switchBtns('filterBtn')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
