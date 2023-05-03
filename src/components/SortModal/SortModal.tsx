import React, { useEffect, useRef, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
// import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiFillCaretRight, AiFillCaretDown, AiOutlineFileSearch } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setSortArray } from '../../features/task/taskSlice';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

type SortModalProps = {
  headers: string[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortFn: (header: string, id: string) => void;
};

type filterSwitch = {
  title: string;
  toggle: boolean;
};

export default function SortModal({ headers, toggleModal }: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const [filterDropDown, setFilterDropDown] = useState<filterSwitch[]>([
    { title: 'color', toggle: false },
    { title: 'condition', toggle: false },
    { title: 'value', toggle: false }
  ]);

  const handleClick = (title: string) => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'task' : title.toLowerCase();
    dispatch(
      setSortArray(
        sortAbleArr.map((sortOption) => {
          if (sortOption.field === headerTxt) {
            const newDir = sortOption.dir === 'asc' ? 'desc' : 'asc';
            return { ...sortOption, dir: newDir };
          }
          return sortOption;
        })
      )
    );
  };

  const switchBtns = (event: React.MouseEvent, field: string) => {
    event.stopPropagation();
    if (field === 'sortBtn') {
      setSortDropDown((prev) => !prev);
    } else {
      setFilterDropDown((prev) => {
        return prev.map((obj) => (obj.title === field ? { ...obj, toggle: !obj.toggle } : obj));
      });
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
        <span className="text-sm text-center mt-4">Sorted columns</span>
        <div className="flex flex-col space-y-1 border-b-2 justify-start mx-4 capitalize pb-4">
          {headers.map((title: string, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center font-semibold text-sm capitalize py-2 pl-1 space-y-2 my-1 group cursor-pointer alt-task rounded-md"
              style={{ color: '#78828d' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {title}
              <div className="flex items-center space-x-1">
                {index === hoveredIndex && (
                  <CiFilter className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                )}
                <div className="flex flex-col justify-center items-center -space-y-3 w-6 h-6">
                  <FaSortUp className="text-gray-400" />
                  <FaSortDown className="text-gray-400" onClick={() => handleClick(title)} />
                </div>
              </div>
            </div>
          ))}
          {/* sort implementation */}
          <div className="flex justify-between pr-1 text-sm">
            <span>sort by color</span>
            {!sortDropDown ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'sortBtn')} />
            ) : (
              <AiFillCaretDown className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'sortBtn')} />
            )}
          </div>
        </div>
        {/* filter implementation */}
        <div className="flex flex-col space-y-6 mx-4 capitalize">
          <div className="relative">
            <input type="text" className="w-full border outline-none rounded-md" />
            <AiOutlineFileSearch className="absolute right-2 top-2 w-6 h-6" />
          </div>
          <div className="flex justify-between pr-1 text-sm">
            <span>filter by color</span>
            {!filterDropDown[0].toggle ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'color')} />
            ) : (
              <AiFillCaretDown className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'color')} />
            )}
          </div>
          <div className="flex justify-between pr-1 text-sm">
            <span>filter by condition</span>
            {!filterDropDown[1].toggle ? (
              <AiFillCaretRight
                className="text-gray-400 font-bold h-3 w-3"
                onClick={(e) => switchBtns(e, 'condition')}
              />
            ) : (
              <AiFillCaretDown
                className="text-gray-400 font-bold h-3 w-3"
                onClick={(e) => switchBtns(e, 'condition')}
              />
            )}
          </div>
          <div className="flex justify-between pr-1 text-sm">
            <span>filter by values</span>
            {!filterDropDown[2].toggle ? (
              <AiFillCaretRight className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'value')} />
            ) : (
              <AiFillCaretDown className="text-gray-400 font-bold h-3 w-3" onClick={(e) => switchBtns(e, 'value')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
