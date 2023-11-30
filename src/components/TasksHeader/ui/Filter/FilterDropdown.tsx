import { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FilterList } from './ui/FilterList/FilterList';
import Button from '../../../Buttons/Button';
import Icons from '../../../Icons/Icons';
import Filter from '../../../../assets/icons/filter_alt.svg';
import { setSelectedTaskParentId } from '../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { Menu } from '@mui/material';
import ArrowOpenDown from '../../../../assets/icons/ArrowOpenDown';

interface IFilterDropdownProps {
  isSplitSubtasks?: boolean;
  parentId?: string;
}

export function FilterDropdown({ isSplitSubtasks, parentId }: IFilterDropdownProps) {
  const dispatch = useAppDispatch();

  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <div
        className="flex items-center justify-center viewSettingsParent"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}
      >
        <HeadMenu>
          <HeadMenu.Button className="inline-flex text-gay-500">
            <Button
              active={false}
              withoutBg={isSplitSubtasks}
              onClick={() => dispatch(setSelectedTaskParentId(parentId ? (parentId as string) : ''))}
            >
              <Icons src={Filter} />
              {!isSplitSubtasks ? (
                <span className="flex items-center text-xs">
                  Filter
                  <span className="px-1">
                    <ArrowOpenDown color="black" />
                  </span>
                </span>
              ) : null}
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div key="filterDropdown" style={{ minWidth: '600px' }} className="relative p-2">
          {/* title */}
          <h1 className="text-lg font-bold text-black">Filters</h1>
          <FilterList />
          {/* close */}
          <XMarkIcon
            className="absolute w-5 h-5 text-gray-500 right-2 top-2 cursor-pointer"
            aria-hidden="true"
            onClick={() => setDropdownEl(null)}
          />
        </div>
      </Menu>
    </>
  );
}
