/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
} from '@heroicons/react/24/outline';
import PlaceItem from '../../../workspace/sidebar/components/PlaceItem';
import Dropdown from '../../../../components/Dropdown/index';
import Search from '../../../explorer/components/Search';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowCreateDirectorySlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import DirectoryList from './components/Directories';
import { classNames } from '../../../../utils';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import libraryIcon from '../../../../assets/icons/library.svg';

function BookCaseIcon() {
  return (
    <svg
      width="10"
      height="13"
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.384615 0.433333V0C0.282609 0 0.184781 0.0456546 0.112651 0.12692C0.0405218 0.208186 0 0.318406 0 0.433333H0.384615ZM0.384615 11.7H0C0 11.8149 0.0405218 11.9251 0.112651 12.0064C0.184781 12.0877 0.282609 12.1333 0.384615 12.1333V11.7ZM2.30769 0V13H3.07692V0H2.30769ZM0.384615 0.866667H8.07692V0H0.384615V0.866667ZM9.23077 2.16667V9.96667H10V2.16667H9.23077ZM8.07692 11.2667H0.384615V12.1333H8.07692V11.2667ZM0.769231 11.7V0.433333H0V11.7H0.769231ZM9.23077 9.96667C9.23077 10.3114 9.1092 10.6421 8.89282 10.8859C8.67643 11.1297 8.38294 11.2667 8.07692 11.2667V12.1333C8.58696 12.1333 9.0761 11.9051 9.43674 11.4987C9.79739 11.0924 10 10.5413 10 9.96667H9.23077ZM8.07692 0.866667C8.38294 0.866667 8.67643 1.00363 8.89282 1.24743C9.1092 1.49123 9.23077 1.82189 9.23077 2.16667H10C10 1.59203 9.79739 1.04093 9.43674 0.634602C9.0761 0.228273 8.58696 0 8.07692 0V0.866667ZM4.61538 4.33333H7.69231V3.46667H4.61538V4.33333Z"
        fill="black"
        fillOpacity="0.65"
      />
    </svg>
  );
}
function BookShelfIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8811 12.1689L10.8856 4.25331C10.8442 4.14416 10.7816 4.04424 10.7016 3.95925C10.6215 3.87427 10.5255 3.80589 10.419 3.75801C10.3126 3.71014 10.1977 3.68371 10.081 3.68023C9.9643 3.67675 9.84806 3.6963 9.73892 3.73776L8.33447 4.26665V2.96442C8.33447 2.73811 8.24457 2.52106 8.08454 2.36103C7.92451 2.201 7.70746 2.11109 7.48114 2.11109H5.22336V1.18665C5.22336 0.960328 5.13346 0.74328 4.97343 0.583249C4.8134 0.423218 4.59635 0.333313 4.37003 0.333313H1.22336C0.987614 0.333313 0.761521 0.426963 0.594822 0.593662C0.428123 0.760361 0.334473 0.986454 0.334473 1.2222V13.2222C0.334473 13.3401 0.381298 13.4531 0.464647 13.5365C0.547997 13.6198 0.661043 13.6666 0.778917 13.6666H7.89003C8.0079 13.6666 8.12095 13.6198 8.2043 13.5365C8.28765 13.4531 8.33447 13.3401 8.33447 13.2222V7.56442L10.5567 13.4355C10.5774 13.4901 10.6087 13.5401 10.6487 13.5826C10.6887 13.6251 10.7367 13.6592 10.79 13.6832C10.8432 13.7071 10.9006 13.7203 10.959 13.7221C11.0173 13.7238 11.0755 13.714 11.13 13.6933L13.6234 12.7422C13.6779 12.7215 13.7279 12.6902 13.7704 12.6502C13.8129 12.6102 13.8471 12.5622 13.871 12.5089C13.8949 12.4557 13.9082 12.3983 13.9099 12.3399C13.9116 12.2816 13.9019 12.2234 13.8811 12.1689ZM4.33447 2.92442V12.7778H1.22336V1.2222H4.33447V2.92442ZM7.44558 12.7778H5.22336V2.99998H7.44558V12.7778ZM11.2278 12.6666L8.39225 5.18665L10.0545 4.55554L12.8945 12.0355L11.2278 12.6666Z"
        fill="black"
        fillOpacity="0.65"
      />
    </svg>
  );
}

function Sidebar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const configForDropdown = [
    {
      label: 'Directory',
      icon: <FolderPlusIcon className="w-5 h-5" aria-hidden="true" />,
      onClick: () => dispatch(setShowCreateDirectorySlideOver(true)),
    },
  ];

  const isBookShelf = pathname.split('/')[2] === 'shelf';

  return (
    <>
      <PlaceItem
        label="Library"
        icon={<img src={libraryIcon} alt="library Icon" className="w-4 h-4" />}
        rightContent={
          <div className="flex gap-2"
          onClick={(e)=> e.stopPropagation()}
          >
            <Dropdown config={configForDropdown} iconType="plus" />

            {showSearch ? (
              <MagnifyingGlassMinusIcon
                onClick={() => setShowSearch(false)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            ) : (
              <MagnifyingGlassIcon
                onClick={() => setShowSearch(true)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        }
        bottomContent={
          showSearch ? (
            <Search query={query} setQuery={setQuery} type="folder" />
          ) : null
        }
      />

      <LibraryNavigation label="Case" path="case" icon={<BookCaseIcon />} />
      <LibraryNavigation label="Shelf" path="shelf" icon={<BookShelfIcon />} />
      {isBookShelf ? (
        <div className="ml-5">
          <DirectoryList />
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;

interface LibraryNavigationProps {
  label: string;
  path: string;
  icon: JSX.Element;
}

function LibraryNavigation({ label, path, icon }: LibraryNavigationProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = path === pathname.split('/')[2];

  const onClick = () => {
    navigate(`/directory${isActive ? '' : '/' + path}`);
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        'hover:bg-gray-100 flex w-full p-1 gap-2 items-center cursor-pointer',
        isActive ? 'bg-gray-100' : ''
      )}
    >
      {isActive ? (
        <VscTriangleDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
      ) : (
        <VscTriangleRight
          className="w-4 h-4 text-gray-500"
          aria-hidden="true"
        />
      )}
      {icon}
      <p>{label}</p>
    </div>
  );
}
