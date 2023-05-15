import { ArrowDownIcon, ArrowUpIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import favoriteIcon from '../../../../../../assets/branding/Favourite-icon.svg';
import groupIcon from '../../../../../../assets/branding/Group.png';
import homeIcon from '../../../../../../assets/icons/Home.svg';
import { cl } from '../../../../../../utils';
import { useAppSelector } from '../../../../../../app/hooks';
import NavigationItem from './components/NavigationItem';
import { HiOutlineLibrary, HiOutlineUserGroup } from 'react-icons/hi';
import { CgTemplate } from 'react-icons/cg';
import { IoNotificationsOutline } from 'react-icons/io5';
import { VscCalendar } from 'react-icons/vsc';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const navigation = [
  {
    id: '1',
    name: 'Home',
    href: '/',
    source: homeIcon,
    alwaysShow: true
  },
  {
    id: '2',
    name: 'Notifications',
    href: '/notification',
    icon: <IoNotificationsOutline className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: true
  },
  {
    id: '3',
    name: 'Calendar',
    href: '/calendar',
    icon: <VscCalendar className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '4',
    name: 'Community',
    href: '/community',
    icon: <HiOutlineUserGroup className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '5',
    name: 'Library',
    href: '/directory',
    icon: <HiOutlineLibrary className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '6',
    name: 'Template',
    href: '/template',
    icon: <CgTemplate className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '7',
    name: 'Goals',
    href: '/goals',
    source: groupIcon,
    alwaysShow: false
  },
  {
    id: '8',
    name: 'Dashboards',
    href: '/dashboard',
    icon: <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '9',
    name: 'Favorites',
    href: '/favorites',
    source: favoriteIcon,
    alwaysShow: false
  }
];

const showLessOrMore = [
  {
    name: 'Show Less',
    icon: <ArrowUpIcon className="w-5 h-5" aria-hidden="true" />
  },
  {
    name: 'Show More',
    icon: <ArrowDownIcon className="w-5 h-5" aria-hidden="true" />
  }
];

export default function NavigationItems() {
  const [showMore, setShowMore] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.account);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const idsFromLS = JSON.parse(localStorage.getItem('navItem') || '[]') as string[];
  // const firstItem = navigation[0];
  // const restOfItems = navigation.slice(1).sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id));
  // const sortedArray = [firstItem, ...restOfItems];
  // const [items, setItems] = useState(sortedArray);
  const [items, setItems] = useState(navigation.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find((i) => i.id === active.id);
      const findOver = items.find((i) => i.id === over?.id);

      if (findActive && findOver) {
        setItems((items) => {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem('navItem', JSON.stringify([...sortArray.map((i) => i.id)]));

          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <SortableContext strategy={rectSortingStrategy} items={items}>
        <section>
          <nav className="flex flex-col mt-1 items.center">
            {navigation.map((item) => (
              <NavigationItem key={item.name} item={item} isVisible={item.alwaysShow || showMore} />
            ))}

            {/* show less or more button */}
            <div
              onClick={() => setShowMore((prev) => !prev)}
              className={cl(
                !showSidebar ? 'justify-center pl-5' : 'gap-2 items-center pl-6',
                'flex cursor-pointer gap-2 items-center p-2 w-full hover:text-gray-500 hover:bg-gray-100'
              )}
              style={{ height: '30px' }}
            >
              {showLessOrMore[showMore ? 0 : 1].icon}
              {showSidebar ? <p className="ml-3 text-xs truncate">{showLessOrMore[showMore ? 0 : 1].name}</p> : null}
            </div>
          </nav>
        </section>
      </SortableContext>
    </DndContext>
  );
}
