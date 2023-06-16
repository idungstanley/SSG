import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPaletteDropDown } from '../../features/account/accountSlice';
// import ListIcon from '../../assets/icons/ListIcon';
import { closeMenu, getPrevName, setshowMenuDropdown } from '../../features/hubs/hubSlice';
import { UseEditListService } from '../../features/list/listService';
import { setListPaletteColor } from '../../features/list/listSlice';
import { setActiveEntity, setActiveEntityName, setActiveItem } from '../../features/workspace/workspaceSlice';
import Palette from '../ColorPalette';
import ListIconSelection from '../ColorPalette/component/ListIconSelection';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';

interface ListItemProps {
  list: {
    id: string;
    name: string;
    color?: ListColourProps | string;
    shape?: string;
    taskCount?: number;
  };
  paddingLeft: string | number;
  parentId?: string | null;
}
export interface ListColourProps {
  innerColour?: string;
  outerColour?: string;
}
export default function ListItem({ list, paddingLeft }: ListItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { paletteDropdown, lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const { listColour } = useAppSelector((state) => state.list);
  const [activeShape, setActiveShape] = useState(list.shape);
  // const [listPaletteColor, setListPaletteColor] = useState<ListColourProps>();
  const { paletteId, show, paletteType } = paletteDropdown;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const color: ListColourProps = JSON.parse(list.color as string) as ListColourProps;
  const innerColour = list?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
  const outerColour = list?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
  const listComboColour = { innerColour, outerColour };
  const { listId } = useParams();
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

  const handleListSettings = (id: string, name: string, e: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list'
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
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: 'list' }));
    dispatch(setListPaletteColor(list?.color === null ? { innerColour: 'white', outerColour: 'black' } : color));
  };

  return (
    <>
      <section
        className={`relative flex items-center justify-between h-8 group ${
          list.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        }`}
        style={{
          paddingLeft: `${paddingLeft}px`,
          backgroundColor: `${list.id === activeItemId ? lightBaseColor : ''}`
        }}
      >
        {list.id === listId && (
          <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg" style={{ backgroundColor: baseColor }} />
        )}
        <div className="flex items-center space-x-1 capitalize truncate cursor-pointer">
          <div onClick={(e) => handleListColour(list.id, e)}>
            <ListIconComponent shape={activeShape} innerColour={innerColour} outterColour={outerColour} />
          </div>
          <div
            onClick={() => handleListLocation(list.id, list.name)}
            style={{
              fontSize: '13px',
              lineHeight: '15.56px',
              verticalAlign: 'baseline',
              letterSpacing: '0.28px'
            }}
            className="flex items-center gap-1 pl-4 capitalize truncate cursor-pointer"
          >
            {list.name}
          </div>
        </div>
        {/* ends here */}
        <button
          type="button"
          id="listright"
          className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <TaskDropdown /> */}
          <AiOutlineEllipsis
            className="cursor-pointer"
            id="menusettings"
            onClick={(e) => handleListSettings(list.id, list.name, e)}
          />
        </button>
      </section>
      {paletteId == list.id && show ? (
        <Palette
          topContent={<ListIconSelection handleSelection={handleSelection} activeShape={activeShape} />}
          title="List Colour"
          listComboColour={listComboColour}
          shape={activeShape}
        />
      ) : null}
    </>
  );
}
