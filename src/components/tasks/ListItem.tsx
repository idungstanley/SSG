import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPaletteDropDown } from '../../features/account/accountSlice';
// import ListIcon from '../../assets/icons/ListIcon';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setSideBarCreateTaskListId,
  setshowMenuDropdown
} from '../../features/hubs/hubSlice';
import { UseEditListService } from '../../features/list/listService';
import { setListPaletteColor } from '../../features/list/listSlice';
import { setActiveEntity, setActiveEntityName, setActiveItem } from '../../features/workspace/workspaceSlice';
import Palette from '../ColorPalette';
import ListIconSelection from '../ColorPalette/component/ListIconSelection';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import { useDroppable } from '@dnd-kit/core';
import { cl } from '../../utils';
import InteractiveTooltip from '../Tooltip/InteractiveTooltip';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { Tooltip } from '@mui/material';
import MenuDropdown from '../Dropdown/MenuDropdown';

interface ListItemProps {
  list: {
    id: string;
    name: string;
    color?: ListColourProps | string;
    shape?: string;
    tasks_count: number;
  };
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

  const [activeShape, setActiveShape] = useState(list.shape);
  // const [listPaletteColor, setListPaletteColor] = useState<ListColourProps>();
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
  // function for the list shape selection
  const handleListLocation = (id: string, name: string) => {
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemType: 'list',
        activeItemId: id,
        activeItemName: name
      })
    );
    navigate(`tasks/l/${id}`);
    dispatch(setActiveEntity({ id: id, type: 'list' }));
  };

  const handleSelection = (shape: string) => {
    setActiveShape(shape);
    if (paletteType === 'list') {
      editListColorMutation.mutateAsync({
        listId: paletteId,
        shape: shape
      });
    }
  };

  const tooltipItems = [
    { label: 'Todo', count: 1, onClick: () => ({}) },
    { label: 'In Progress', count: 1, onClick: () => ({}) },
    { label: 'Completed', count: 1, onClick: () => ({}) }
  ];

  const closeMenuDropdown = () => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
        showMenuDropdownType: null
      })
    );
  };

  const closeSubMenu = () => {
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
  };

  const handleListSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setSideBarCreateTaskListId(id));
    if (id === showMenuDropdown) {
      closeMenuDropdown();
    } else {
      closeSubMenu();
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: id,
          showMenuDropdownType: 'list'
        })
      );
    }
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleListColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: 'list' }));
    dispatch(setListPaletteColor(list?.color === null ? { innerColour: 'white', outerColour: 'black' } : color));
  };

  const { isOver, setNodeRef } = useDroppable({
    id: list.id
  });

  return (
    <>
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
          backgroundColor: `${list.id === listId ? lightBaseColor : ''}`
        }}
        onClick={() => handleListLocation(list.id, list.name)}
      >
        {list.id === listId && (
          <span className="absolute top-0 bottom-0 left-0 rounded-r-lg w-0.5" style={{ backgroundColor: baseColor }} />
        )}
        <div className="flex items-center space-x-1 overflow-hidden capitalize cursor-pointer">
          <div onClick={(e) => handleListColour(list.id, e)}>
            <ListIconComponent
              shape={activeShape ? activeShape : 'solid-circle'}
              innerColour={innerColour}
              outterColour={outerColour}
            />
          </div>
          <Tooltip title={list.name} arrow placement="top">
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
          </Tooltip>
        </div>
        {/* ends here */}
        <div className="flex items-center gap-1">
          {list.tasks_count > 0 && (
            <InteractiveTooltip
              content={
                <ul className="space-y-2 w-28">
                  <span className="flex items-center justify-between cursor-pointer hover:text-blue-500">
                    <p>Tasks</p>
                    <p>({list.tasks_count})</p>
                  </span>
                  <hr />
                  {tooltipItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between cursor-pointer hover:text-blue-500"
                      onClick={item.onClick}
                    >
                      <p>{item.label}</p>
                      <p>({item.count})</p>
                    </li>
                  ))}
                </ul>
              }
            >
              <span
                className="w-auto px-2 border border-gray-400 rounded"
                style={{ fontSize: '10px', color: listId === list.id ? (baseColor as string) : undefined }}
              >
                {list.tasks_count}
              </span>
            </InteractiveTooltip>
          )}
          <button
            type="button"
            id="listright"
            className="flex items-center justify-end pr-1 space-x-1 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <TaskDropdown /> */}
            <span
              className="cursor-pointer"
              id="menusettings"
              onClick={(e) => handleListSettings(list.id, list.name, e)}
            >
              <ThreeDotIcon />
            </span>
          </button>
        </div>
      </section>
      {paletteId == list.id && show ? (
        <Palette
          topContent={<ListIconSelection handleSelection={handleSelection} activeShape={activeShape} />}
          title="List Colour"
          listComboColour={listComboColour}
          shape={activeShape}
        />
      ) : null}
      {showMenuDropdown === list.id ? <MenuDropdown /> : null}
    </>
  );
}
