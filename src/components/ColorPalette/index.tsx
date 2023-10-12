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
import Button from '../Button';
import ArrowDownFilled from '../../assets/icons/ArrowDownFilled';
import PaletteListView from './component/PaletteListView';
import ToolTip from '../Tooltip/Tooltip';
import { AiFillCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { cl } from '../../utils';
import DefaultColour from '../../assets/icons/DefaultColour';
import SelectionMenu from './component/SelectionMenu';
import AlsoitMenuDropdown from '../DropDowns';
import ListIconSelection, { listIconDetails } from './component/ListIconSelection';
import { useGetColors } from '../../features/account/accountService';
import AdvanceColourPalette from './component/AdvanceColourPalette';

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

const paletteViews = {
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
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState<boolean>(true);
  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [selectedViews, setSelectedViews] = useState<string>(paletteViews.BOARD);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [showListShapeSelection, setShowListShapeSelection] = useState<null | HTMLDivElement>(null);
  const { paletteId, paletteType } = paletteDropdown;

  useGetColors();

  const closeMenu = () => {
    setOpen(false);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    dispatch(setListPaletteColor({ innerColour: 'white', outerColour: 'black' }));
    dispatch(setSelectedListColours([]));
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
      const list = data.data.list;
      const updatedTree = changeListManager(list.id as string, hub, list);
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

  const handleClick = (color?: string | ListColourProps | null) => {
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
          activeColor={isInnerFrameActive ? activeInnerColor : activeOutterColor}
          handleClick={handleClick}
        />
      ),
      icon: <GridViews color={selectedViews === paletteViews.BOARD ? 'white' : 'rgb(191, 0, 255)'} />
    },
    {
      label: paletteViews.LIST,
      element: <PaletteListView />,
      icon: <FormatListBullet color={selectedViews === paletteViews.LIST ? 'white' : 'rgb(191, 0, 255)'} />
    }
  ];

  const selectedElement = views.find((items) => items.label === selectedViews)?.element;
  const activeShapeName = listIconDetails.find((item) => item.shape === shape);

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: cords?.top || 'center',
        horizontal: 10
      }}
      PaperProps={{
        style: {
          borderRadius: '12px',
          backgroundColor: 'white',
          padding: '0px'
        }
      }}
      className="MuiMenu-list"
    >
      <div
        className="overflow-y-auto text-gray-500 rounded-full drop-shadow-2xl"
        style={{ borderRadius: '5px', width: '450px' }}
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
              <div className="flex items-center p-2 bg-alsoit-gray-75 h-9">
                <p className="justify-center text-base text-white">COLOUR LIBRARY</p>
              </div>
              <div className="flex items-center gap-1 px-2">
                {views.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded p-1 cursor-pointer ${
                      selectedViews === item.label ? 'bg-primary-500' : 'border border-primary-200'
                    }`}
                    onClick={() => setSelectedViews(item.label)}
                  >
                    <ToolTip title={item.label + ' View'}>
                      <span>{item.icon}</span>
                    </ToolTip>
                  </div>
                ))}
                <ToolTip title="View">
                  <span className="p-1 border rounded border-primary-200" onClick={() => ({})}>
                    <AiOutlineEye className="w-4 h-4" />
                  </span>
                </ToolTip>
                <ToolTip title="Open Search">
                  <span className="p-1 border rounded border-primary-200" onClick={() => setIsSearch(true)}>
                    <SearchIcon className="w-4 h-4" />
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
          <div className="px-2 mx-2">
            {isSearch && (
              <div>
                <Input
                  placeholder="Search"
                  bgColor="bg-gray-200"
                  borderRadius="rounded-md py-0.5"
                  type="text"
                  name="search"
                  leadingIcon={<CiSearch />}
                  trailingIcon={
                    <ToolTip title="Close Search">
                      <span>
                        <AiFillCloseCircle style={{ color: 'rgb(191, 0, 255)' }} />
                      </span>
                    </ToolTip>
                  }
                  trailingClick={handleCloseSearch}
                  onChange={() => null}
                />
              </div>
            )}
            {topContent}
            {paletteType === EntityType.list && (
              <div className="flex items-center justify-between pb-1 mt-1 mb-1 border-b border-gray-300">
                <div
                  className={`relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 text-xs  rounded-md hover:text-primary-600 border border-gray-300 hover:bg-primary-100 ${
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
              className={cl('flex gap-1 items-center mt-2', displayColorPicker ? 'justify-left' : 'justify-between')}
            >
              <ToolTip title="Advanced color options">
                <span
                  className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-primary-200"
                  onClick={() => setDisplayColorPicker((prev) => !prev)}
                >
                  <p className={`truncate text-xs w-fit ${displayColorPicker ? 'text-primary-600' : null}`}>
                    ADVANCED COLOR OPTIONS
                  </p>
                  {displayColorPicker ? (
                    <RiArrowUpSLine className="text-base text-primary-600" />
                  ) : (
                    <RiArrowDownSLine className="text-base" />
                  )}
                </span>
              </ToolTip>
            </div>
          </div>
          <AdvanceColourPalette show={displayColorPicker} />
          <div className="flex items-center justify-end gap-2 p-1 mx-3 mb-2">
            <Button
              height="h-6"
              width="w-20"
              label="Cancel"
              labelSize="text-xs"
              customClasses="hover:bg-red-600 bg-white text-red-600 border-red-200"
              padding="p-1"
              buttonStyle="custom"
              onClick={handleCancel}
            />
            <Button
              height="h-6"
              customClasses="hover:bg-green-700 text-gray-500 border-gray-400"
              label={'Update ' + title}
              labelSize="text-xs truncate"
              padding="p-1"
              buttonStyle="custom"
            />
          </div>
          {bottomContent}
        </div>
      </div>
    </Menu>
  );
}
