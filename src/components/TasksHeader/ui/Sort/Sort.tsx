import { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TaskKey } from '../../../../features/task/interface.tasks';
import { setSortType } from '../../../../features/task/taskSlice';
import Button from '../../../Buttons/Button';
import Icons from '../../../Icons/Icons';
import GroupBy from '../../../../assets/icons/layers.svg';
import { Menu } from '@mui/material';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import ArrowDrop from '../../../../assets/icons/ArrowDrop';

type Key = Extract<TaskKey, 'status' | 'assignees' | 'priority'>;
type Option = Record<Key, { icon: JSX.Element }>;

const options: Option = {
  status: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  },
  assignees: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  },
  priority: {
    icon: <RiCheckboxBlankFill className="w-5 h-5 text-gray-400" aria-hidden="true" />
  }
};

interface ISortProps {
  isSplitSubtasks?: boolean;
}

export function Sort({ isSplitSubtasks }: ISortProps) {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector((state) => state.task);

  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);

  const setOption = (i: TaskKey) => dispatch(setSortType(i));

  return (
    <>
      <div className="relative" onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}>
        <HeadMenu>
          <HeadMenu.Button className="relative w-full rounded-md outline-none cursor-pointer">
            <Button active={isSplitSubtasks ? false : true} withoutBg={isSplitSubtasks}>
              <Icons src={GroupBy} />
              {!isSplitSubtasks ? (
                <span className="flex items-center">
                  <p className="block truncate">
                    Group by: <span className="capitalize">{sortType}</span>
                  </p>
                  <ArrowDrop color="#BF01FE" />
                </span>
              ) : null}
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div className="w-48">
          {Object.keys(options).map((option) => (
            <div
              key={option}
              className={`${
                sortType !== option
                  ? 'flex items-center text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                  : 'flex items-center text-sm text-gray-600 text-left w-full bg-primary-200'
              }`}
            >
              <button onClick={() => setOption(option as TaskKey)} className="flex items-center w-full py-2 group">
                <p className="flex items-center pl-2 space-x-2 text-md">{Capitalize(option)}</p>
              </button>
            </div>
          ))}
        </div>
      </Menu>
    </>
  );
}
