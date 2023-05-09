import React, { useEffect, useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { GrFormSearch } from 'react-icons/gr';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdFilterList, MdOutlinePersonOutline } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';
import { TbSubtask } from 'react-icons/tb';
import { VscEllipsis } from 'react-icons/vsc';
import GroupbyModal from './Groupings/GroupbyModal';
import { setShowFilterByAssigneeSlideOver } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils/index';
import FilterGroups from './filterGroup/FilterGroups';

export default function ListFilter() {
  const [navTop, setNavTop] = useState<number>(0);
  const [navWidth, setNavWidth] = useState<number | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    const Navbar = document.querySelector('.navbar')?.getBoundingClientRect();
    if (Navbar) {
      setNavTop(Navbar.top as number);
      setNavWidth(Navbar.width as number);
    }
  }, []);

  useEffect(() => {
    if (!navTop) return;

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, [navTop]);

  const isSticky = () => {
    const sidebarEl = document.querySelector('.navbar');
    const scrollTop = window.scrollY;
    if (scrollTop >= navTop - 10) {
      sidebarEl?.classList.add('fixed');
    } else {
      sidebarEl?.classList.remove('fixed');
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white h-8 pr-5 " style={{ width: navWidth }}>
      <div className="flex items-center justify-between p-2">
        <GrFormSearch className="w-5 h-5 " />
        <input
          type="text"
          placeholder="Search tasks..."
          className="border-transparent focus:border-transparent h-5 w-full focus:ring-0 font-bold"
          style={{ fontSize: '11px' }}
        />
        <div className=" p-1 border-gray-400 hover:bg-gray-200  rounded ">
          <VscEllipsis className=" " />
        </div>
        <div className="border-gray-100">
          <RxDividerVertical className=" " />
        </div>
      </div>
      <div className="flex gap-2 items-center  text-xs font-bold">
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>{showFilter && <FilterGroups />}</span>
          <span>
            <MdFilterList />
          </span>
          <span onClick={() => setShowFilter(false)}>filter</span>
        </p>
        <span>
          <GroupbyModal />
        </span>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <TbSubtask />
          </span>
          Subtask
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <MdOutlinePersonOutline />
          </span>
          Me
        </p>
        <p
          className={cl(
            'flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded',
            showFilterByAssigneeSlideOver ? 'bg-purple-600 text-white' : ''
          )}
          onClick={() => dispatch(setShowFilterByAssigneeSlideOver(true))}
        >
          <span>
            <IoPeopleOutline />
          </span>
          Assignee
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <BiShow />
          </span>
          show
        </p>
        <span className="hover:bg-gray-200 p-1 rounded">
          <VscEllipsis />
        </span>
      </div>
    </nav>
  );
}
