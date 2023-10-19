import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { FilterList } from './ui/FilterList/FilterList';
import Button from '../../../Buttons/Button';
import Icons from '../../../Icons/Icons';
import Filter from '../../../../assets/icons/filter_alt.svg';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { setSelectedTaskParentId } from '../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../app/hooks';

interface IFilterDropdownProps {
  isSplitSubtasks?: boolean;
  parentId?: string;
}

export function FilterDropdown({ isSplitSubtasks, parentId }: IFilterDropdownProps) {
  const dispatch = useAppDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex text-gay-500">
          <Button
            active={false}
            withoutBg={isSplitSubtasks}
            onClick={() => dispatch(setSelectedTaskParentId(parentId ? (parentId as string) : ''))}
          >
            <Icons src={Filter} />
            {!isSplitSubtasks ? (
              <span className="flex items-center gap-2">
                Filter
                <ArrowDownFilled />
              </span>
            ) : null}
          </Button>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{ minWidth: '600px', zIndex: '31' }}
          className="fixed p-2 origin-top-left bg-white rounded-md shadow-lg focus:outline-none"
        >
          {/* close */}
          <Menu.Item>
            <XMarkIcon className="absolute w-5 h-5 text-gray-500 right-2 top-2" aria-hidden="true" />
          </Menu.Item>

          {/* title */}
          <h1 className="text-lg font-bold text-black">Filters</h1>
          <FilterList />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
