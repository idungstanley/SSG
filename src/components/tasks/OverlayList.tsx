import React, { useState } from 'react';
import Drag from '../../assets/icons/Drag';
import { cl } from '../../utils';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { ListColourProps } from './ListItem';
import { useAppSelector } from '../../app/hooks';
import { generateGrid } from '../Views/lib';

interface ListItemProps {
  list: {
    id: string;
    name: string;
    color?: ListColourProps | string;
    shape?: string;
    tasks_count: number;
  };
  parentId?: string | null;
}
function OverlayList({ list }: ListItemProps) {
  const { listColour } = useAppSelector((state) => state.list);
  const [activeShape] = useState(list.shape);
  const color: ListColourProps = JSON.parse(list.color as string) as ListColourProps;
  const innerColour = list?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
  const outerColour = list?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
  return (
    <section className="items-center justify-around bg-white h-8 opacity-75" style={{ minWidth: 220, display: 'flex' }}>
      <div className="mr-4">
        <Drag />
      </div>
      <div>
        <ListIconComponent
          shape={activeShape ? activeShape : 'solid-circle'}
          innerColour={innerColour}
          outterColour={outerColour}
        />
      </div>
      <div className="pl-4 capitalize truncate">{list.name}</div>
      {/* ends here */}
      <span>
        <ThreeDotIcon />
      </span>
    </section>
  );
}

export default OverlayList;
