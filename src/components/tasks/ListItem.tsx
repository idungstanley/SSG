import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import {
  closeMenu,
  getPrevName,
  setListIdCreateTask,
  setSideBarCreateTaskListId,
  setshowMenuDropdown
} from '../../features/hubs/hubSlice';
import { GetTaskListCount, UseEditListService } from '../../features/list/listService';
import { setListPaletteColor } from '../../features/list/listSlice';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import Palette from '../ColorPalette';
import ListIconSelection from '../ColorPalette/component/ListIconSelection';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cl } from '../../utils';
import InteractiveTooltip from '../Tooltip/InteractiveTooltip';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import MenuDropdown from '../Dropdown/MenuDropdown';
import Drag from '../../assets/icons/Drag';
import { IList } from '../../features/hubs/hubs.interfaces';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import ToolTip from '../Tooltip/Tooltip';
import ActiveBarIdentification from './Component/ActiveBarIdentification';
import { useAbsolute } from '../../hooks/useAbsolute';
import { generateViewsUrl } from '../../utils/generateViewsUrl';
import { taskCountFields } from '../../features/list/list.interfaces';

interface ListItemProps {
  list: IList;
  paddingLeft: string | number;
  parentId?: string | null;
}
export interface ListColourProps {
  innerColour?: string;
  outerColour?: string;
}
export default function ListItem({ list, paddingLeft }: ListItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listId } = useParams();
  const queryClient = useQueryClient();

  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { paletteDropdown, lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const { listColour } = useAppSelector((state) => state.list);
  const { updateCords } = useAppSelector((state) => state.task);

  const [getCount, setGetCount] = useState<boolean>(false);
  const [activeShape, setActiveShape] = useState(list.shape);

  const { paletteId, show, paletteType } = paletteDropdown;
  const color: ListColourProps = JSON.parse(list.color as string) as ListColourProps;
  const innerColour = list?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
  const outerColour = list?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
  const listComboColour = { innerColour, outerColour };

  const editListColorMutation = useMutation(UseEditListService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']);
    }
  });

  const { data } = GetTaskListCount({ query: list.id, fetchTaskCount: getCount });

  // function for the list shape selection
  const handleListLocation = (id: string, name: string) => {
    const viewsUrl = generateViewsUrl(id, list, EntityType.list) as string;
    dispatch(
      setActiveItem({
        activeItemType: EntityType.list,
        activeItemId: id,
        activeItemName: name
      })
    );
    navigate(viewsUrl, {
      replace: true
    });
  };

  const handleSelection = (shape: string) => {
    setActiveShape(shape);
    if (paletteType === EntityType.list) {
      editListColorMutation.mutateAsync({
        listId: paletteId,
        shape: shape
      });
    }
  };
  const handleClickScroll = (targetId: string) => {
    navigate(`tasks/l/${list.id}`);
    dispatch(
      setActiveItem({
        activeItemType: EntityType.list,
        activeItemId: list.id
      })
    );
    const element = document.getElementById(targetId);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tooltipItems = data?.data.task_statuses;

  const handleListSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setListIdCreateTask(id));
    dispatch(setSideBarCreateTaskListId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: EntityType.list
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleListColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.list }));
    dispatch(setListPaletteColor(list?.color === null ? { innerColour: 'white', outerColour: 'black' } : color));
  };

  const { isOver, setNodeRef } = useDroppable({
    id: list.id,
    data: {
      isOverList: true
    }
  });

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform
  } = useDraggable({
    id: list.id,
    data: {
      isList: true
    }
  });

  const { cords, relativeRef } = useAbsolute(updateCords, 275);
  const { cords: menuCords, relativeRef: menuRef } = useAbsolute(updateCords, 352);

  return (
    <div className="relative">
      <section
        className={cl(
          'relative flex items-center justify-between h-8 group',
          list.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100',
          isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''
        )}
        ref={setNodeRef}
        style={{
          paddingLeft: `${paddingLeft}px`,
          height: '30px',
          backgroundColor: `${list.id === listId ? lightBaseColor : ''}`,
          opacity: transform ? 0 : 100
        }}
        onClick={() => handleListLocation(list.id, list.name)}
      >
        <ActiveBarIdentification showBar={list.id === listId} />
        <div
          className="absolute left-2 rounded-r-lg w-0.5 opacity-0 group-hover:opacity-100 cursor-move"
          ref={draggableRef}
          {...listeners}
          {...attributes}
        >
          <Drag />
        </div>
        <div className="flex items-center space-x-1 overflow-hidden capitalize cursor-pointer">
          <div onClick={(e) => handleListColour(list.id, e)} ref={relativeRef}>
            <ListIconComponent
              shape={activeShape ? activeShape : 'solid-circle'}
              innerColour={innerColour}
              outterColour={outerColour}
            />
          </div>
          <ToolTip title={list.name}>
            <div
              style={{
                fontSize: '13px',
                lineHeight: '15.56px',
                verticalAlign: 'baseline',
                letterSpacing: '0.28px',
                color: listId === list.id ? (baseColor as string) : undefined
              }}
              className="pl-4 capitalize truncate cursor-pointer"
            >
              {list.name}
            </div>
          </ToolTip>
        </div>
        {/* ends here */}
        <div className="flex items-center gap-1">
          {list.tasks_count > 0 && (
            <InteractiveTooltip
              dependency={tooltipItems as taskCountFields[]}
              content={
                <ul className="space-y-2 w-28">
                  <span className="flex items-center justify-between cursor-pointer hover:text-blue-500">
                    <p>Tasks</p>
                    <p>({list.tasks_count})</p>
                  </span>
                  <hr />
                  {tooltipItems &&
                    tooltipItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between cursor-pointer hover:text-blue-500"
                        onClick={() => handleClickScroll(item.name)}
                      >
                        <p>{item.name}</p>
                        <p>({item.task_status_counts})</p>
                      </li>
                    ))}
                </ul>
              }
            >
              <span
                className="w-auto px-2 border border-gray-400 rounded"
                style={{ fontSize: '10px', color: listId === list.id ? (baseColor as string) : undefined }}
                onMouseEnter={() => setGetCount(() => true)}
                onMouseLeave={() => setGetCount(() => false)}
              >
                {list.tasks_count}
              </span>
            </InteractiveTooltip>
          )}
          <div
            id="listright"
            className="flex items-center justify-end pr-1 space-x-1 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
            ref={menuRef}
          >
            {/* <TaskDropdown /> */}
            <span
              className="cursor-pointer"
              id="menusettings"
              onClick={(e) => handleListSettings(list.id, list.name, e)}
            >
              <ThreeDotIcon />
            </span>
          </div>
        </div>
      </section>
      {paletteId == list.id && show ? (
        <Palette
          topContent={<ListIconSelection handleSelection={handleSelection} activeShape={activeShape} />}
          title="List Colour"
          listComboColour={listComboColour}
          shape={activeShape}
          cords={cords}
        />
      ) : null}
      {showMenuDropdown === list.id ? <MenuDropdown cords={menuCords} /> : null}
    </div>
  );
}
