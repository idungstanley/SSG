import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { UseEditListService } from '../../features/list/listService';
import { setPaletteDropDown, setSelectedListColours } from '../../features/account/accountSlice';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import { ListColourProps } from '../tasks/ListItem';
import { changeListManager } from '../../managers/List';
import { getHub } from '../../features/hubs/hubSlice';
import { setFilteredResults } from '../../features/search/searchSlice';
import ColorPalette from './component/ColorPalette';
import { changeWalletManager } from '../../managers/Wallet';
import { changeHubManager } from '../../managers/Hub';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { Fade, Menu } from '@mui/material';
import { setListPaletteColor } from '../../features/list/listSlice';
import { Cords } from '../../hooks/useAbsolute';
import GridViews from '../../assets/icons/GridViews';
import SearchIcon from '../../assets/icons/SearchIcon';
import FormatListBullet from '../../assets/icons/FormatListBullet';
import Input from '../input/Input';
import { CiSearch } from 'react-icons/ci';
import ArrowDownFilled from '../../assets/icons/ArrowDownFilled';
import PaletteListView from './component/PaletteListView';
import ToolTip from '../Tooltip/Tooltip';
import { AiFillCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { cl } from '../../utils';
import DefaultColour from '../../assets/icons/DefaultColour';
import SelectionMenu from './component/SelectionMenu';
import AlsoitMenuDropdown from '../DropDowns';
import ListIconSelection, { listIconDetails } from './component/ListIconSelection';
import AdvanceColourPalette from './component/AdvanceColourPalette';
import { taskColourManager } from '../../managers/Task';
import { setTasks } from '../../features/task/taskSlice';
import Filter from '../../assets/icons/filter_alt.svg';
import ClosePalette from '../../assets/icons/ClosePalette';
import SavePalette from '../../assets/icons/SavePalette';

interface PaletteProps {
  title?: string;
  topContent?: JSX.Element;
  bottomContent?: JSX.Element;
  setPaletteColor?: (color?: string | ListColourProps | null) => void;
  setListPaletteColor?: (value: { innerColour: string; outterColour: string }) => void;
  shape?: string;
  listComboColour?: ListColourProps;
  cords?: Cords;
  activeInnerColor?: string;
  activeOutterColor?: string;
  handleShapeSelection?: (value: string) => void;
}

export const paletteViews = {
  BOARD: 'Board',
  LIST: 'List'
};

export default function PaletteManager({
  title,
  setPaletteColor,
  bottomContent,
  topContent,
  shape,
  listComboColour,
  cords,
  activeOutterColor,
  activeInnerColor,
  handleShapeSelection
}: PaletteProps) {
  const dispatch = useAppDispatch();

  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { hub } = useAppSelector((state) => state.hub);
  const { tasks } = useAppSelector((state) => state.task);
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState<boolean>(true);
  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [selectedViews, setSelectedViews] = useState<string>(paletteViews.BOARD);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [showListShapeSelection, setShowListShapeSelection] = useState<null | HTMLDivElement>(null);
  const [color, setColor] = useState<string | ListColourProps | null>(null);
  const { paletteId, paletteType } = paletteDropdown;

  const closeMenu = () => {
    setOpen(false);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    dispatch(setListPaletteColor({ innerColour: 'white', outerColour: 'black' }));
    dispatch(setSelectedListColours([]));
  };

  const handleSelectColor = (color: string | null | ListColourProps) => {
    setColor(color);
  };

  const handleCancel = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setOpen(false);
      dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    }
    dispatch(setSelectedListColours([]));
  };

  const handleCloseListShapeSelection = () => {
    setShowListShapeSelection(null);
  };
  const handleOpenListShapeSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowListShapeSelection(e.currentTarget);
  };

  const handleOutterFrameClick = () => {
    setIsOutterFrameActive((prev) => !prev);
    setIsInnerFrameActive(false);
  };

  const handleInnerFrameClick = () => {
    setIsInnerFrameActive((prev) => !prev);
    setIsOutterFrameActive(false);
  };

  const editHubColorMutation = useMutation(UseEditHubService, {
    onSuccess: (data) => {
      const hubData = data.data.hub;
      const updatedTree = changeHubManager(hubData.id as string, hub, hubData);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const editWalletColorMutation = useMutation(UseEditWalletService, {
    onSuccess: (data) => {
      const wallet = data.data.wallet;
      const updatedTree = changeWalletManager(wallet.id as string, hub, wallet);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const editListColorMutation = useMutation(UseEditListService, {
    onSuccess: (data) => {
      const updatedTasks = taskColourManager(data.data.list.id, tasks, data.data.list.color);

      const list = data.data.list;
      const updatedTree = changeListManager(list.id as string, hub, list);
      dispatch(setTasks(updatedTasks));
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  const handleDismissPopup = () => {
    dispatch(setSelectedListColours([]));
  };

  const handleClick = () => {
    if (paletteType === EntityType.hub) {
      editHubColorMutation.mutateAsync({
        hubId: paletteId,
        color
      });
    } else if (paletteType === EntityType.wallet) {
      editWalletColorMutation.mutateAsync({
        walletId: paletteId,
        color
      });
    } else if (paletteType === EntityType.list) {
      if (isOutterFrameActive) {
        editListColorMutation.mutateAsync({
          listId: paletteId,
          color: { outerColour: color as string, innerColour: listComboColour?.innerColour }
        });
      } else if (isInnerFrameActive) {
        editListColorMutation.mutateAsync({
          listId: paletteId,
          color: {
            outerColour: listComboColour?.outerColour,
            innerColour: color as string
          }
        });
      }
    }
    setPaletteColor?.(color);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
  };

  const views = [
    {
      label: paletteViews.BOARD,
      element: (
        <ColorPalette
          activeColor={color ? (color as string) : isInnerFrameActive ? activeInnerColor : activeOutterColor}
          handleClick={handleSelectColor}
        />
      ),
      icon: <GridViews color={selectedViews === paletteViews.BOARD ? 'rgb(191, 0, 255)' : '#424242'} />
    },
    {
      label: paletteViews.LIST,
      element: <PaletteListView />,
      icon: <FormatListBullet color={selectedViews === paletteViews.LIST ? 'rgb(191, 0, 255)' : '#424242'} />
    }
  ];

  const selectedElement = views.find((items) => items.label === selectedViews)?.element;
  const activeShapeName = listIconDetails.find((item) => item.shape === shape);
  const [onHover, setOnHover] = useState('white');

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: cords?.top || 'center',
        horizontal: cords?.left || 10
      }}
      PaperProps={{
        style: {
          borderRadius: '5px',
          backgroundColor: '#f4f4f4',
          padding: '0px',
          boxShadow: '0px 0px 5px #00000040'
        }
      }}
      className="MuiMenu-list"
    >
      <div
        key="colorPalette"
        className="overflow-y-auto text-alsoit-gray-100"
        style={{ maxWidth: '332px', fontSize: '11px' }}
      >
        <div className="z-50 flex flex-col w-full">
          {selectListColours.length > 0 && selectedViews === paletteViews.LIST && (
            <SelectionMenu
              isVisible={selectListColours.length > 0}
              dismissPopUp={handleDismissPopup}
              selectedCount={selectListColours.length}
              allSelected={colourPaletteData.length === selectListColours.length}
            />
          )}
          {!isSearch && selectListColours.length === 0 && paletteViews.BOARD && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1 uppercase items-center-justify-between">
                <div className="flex items-center h-8 p-1 rounded-br-md bg-alsoit-gray-75 w-[114px]">
                  <p
                    className="bg-['#b2b2b2'] text-white justify-center tracking-wide font-medium"
                    style={{ fontSize: '11px', lineHeight: '13.2px' }}
                  >
                    COLOUR LIBRARY
                  </p>
                </div>
                <div className="flex items-center">{title}</div>
              </div>
              <div className="flex items-center gap-0.5 pr-[6px] pl-6">
                {views.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded p-1 cursor-pointer ${
                      selectedViews === item.label ? 'bg-primary-200' : 'rounded bg-white'
                    }`}
                    onClick={() => setSelectedViews(item.label)}
                  >
                    <ToolTip title={item.label + ' View'}>
                      <span>{item.icon}</span>
                    </ToolTip>
                  </div>
                ))}
                <ToolTip title="View">
                  <span className="p-1 bg-white rounded cursor-pointer" onClick={() => ({})}>
                    <AiOutlineEye className="w-4 h-4 fill-[#424242]" />
                  </span>
                </ToolTip>
                <ToolTip title="Sort">
                  <span className="bg-white rounded cursor-pointer p-[2px]" onClick={() => ({})}>
                    <img src={Filter} alt="Filter" />
                  </span>
                </ToolTip>
                <ToolTip title="Open Search">
                  <span className="p-1 bg-white rounded cursor-pointer" onClick={() => setIsSearch(true)}>
                    <SearchIcon color="#424242" className="w-4 h-4" />
                  </span>
                </ToolTip>
                {activeOutterColor === null ? (
                  <DefaultColour dimensions={{ width: 26, height: 26 }} />
                ) : (
                  <span
                    className="w-6 h-6 p-2 rounded"
                    style={{
                      backgroundColor: isInnerFrameActive ? activeInnerColor : activeOutterColor
                    }}
                  ></span>
                )}
              </div>
            </div>
          )}
          <div className="pl-2">
            {isSearch && (
              <div className="flex items-center gap-1 my-2">
                <Input
                  placeholder="Search"
                  bgColor="bg-white"
                  borderRadius="rounded-md py-0.5 h-6"
                  type="text"
                  name="search"
                  leadingIcon={
                    <span>
                      <CiSearch style={{ color: 'rgb(191, 0, 255)' }} />
                    </span>
                  }
                  trailingIcon={
                    <ToolTip title="Cancel search">
                      <span>
                        <AiFillCloseCircle
                          className="text-sm hover:fill-[#8601B2]"
                          style={{ color: 'rgb(191, 0, 255)' }}
                        />
                      </span>
                    </ToolTip>
                  }
                  trailingClick={handleCloseSearch}
                  onChange={() => null}
                />
                {activeOutterColor === null ? (
                  <DefaultColour dimensions={{ width: 26, height: 26 }} />
                ) : (
                  <span
                    className="w-6 h-6 p-2 rounded"
                    style={{
                      backgroundColor: isInnerFrameActive ? activeInnerColor : activeOutterColor
                    }}
                  ></span>
                )}
              </div>
            )}
            {topContent}
            {paletteType === EntityType.list && (
              <div className="flex items-center justify-between pb-1 mt-1 mb-1">
                <div
                  className={`relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 rounded-md hover:text-primary-600 border border-gray-300 hover:bg-primary-100 ${
                    showListShapeSelection && 'text-white bg-alsoit-purple-300'
                  } ${shape && !showListShapeSelection ? 'bg-primary-200 text-alsoit-purple-300' : 'text-gray-500'}`}
                  onClick={(e) => handleOpenListShapeSelection(e)}
                >
                  <p>{`${title} Shapes${shape ? `: ${activeShapeName?.label}` : ''}`}</p>
                  <ArrowDownFilled color={showListShapeSelection ? 'white' : undefined} />
                </div>
                <AlsoitMenuDropdown handleClose={handleCloseListShapeSelection} anchorEl={showListShapeSelection}>
                  <ListIconSelection
                    handleSelection={handleShapeSelection as (value: string) => void}
                    activeShape={shape}
                  />
                </AlsoitMenuDropdown>
                <ListIconComponent
                  shape={shape}
                  type="colourToggle"
                  outterFrameClick={handleOutterFrameClick}
                  innerFrameClick={handleInnerFrameClick}
                  isInnerFrameActive={isInnerFrameActive}
                  isOutterFrameActive={isOutterFrameActive}
                  innerColour={listComboColour?.innerColour}
                  outterColour={listComboColour?.outerColour}
                />
              </div>
            )}

            {selectedElement && selectedElement}
            <div
              className={cl('flex gap-1 items-center mt-1', displayColorPicker ? 'justify-left' : 'justify-between')}
            >
              <span
                className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-primary-200"
                onClick={() => setDisplayColorPicker((prev) => !prev)}
              >
                <p className={`truncate w-fit ${displayColorPicker ? 'text-primary-600' : 'text-[#424242]'}`}>
                  ADVANCED COLOUR OPTIONS
                </p>
                {displayColorPicker ? (
                  <RiArrowUpSLine className="text-base text-primary-600" />
                ) : (
                  <RiArrowDownSLine className="text-base" />
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-1 mx-3 mb-2">
            <ToolTip title="Cancel">
              <span
                onClick={handleCancel}
                className="cursor-pointer text-[#FF3738] hover:text-white"
                onMouseEnter={() => {
                  setOnHover('#FF3738');
                }}
                onMouseLeave={() => {
                  setOnHover('white');
                }}
              >
                <ClosePalette fill={onHover} />
              </span>
            </ToolTip>
            <ToolTip title="Update Hub">
              <span className="cursor-pointer" onClick={handleClick}>
                <SavePalette />
              </span>
            </ToolTip>
          </div>
          {bottomContent}
        </div>
        <AdvanceColourPalette show={displayColorPicker} />
      </div>
    </Menu>
  );
}
