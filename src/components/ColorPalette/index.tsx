import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { UseEditListService } from '../../features/list/listService';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import { BiPaint } from 'react-icons/bi';
import { RiArrowUpSFill } from 'react-icons/ri';
import { ChromePicker, AlphaPicker, HuePicker } from 'react-color';
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
import { AiFillCloseCircle } from 'react-icons/ai';

interface PaletteProps {
  title?: string;
  topContent?: JSX.Element;
  bottomContent?: JSX.Element;
  setPaletteColor?: (color?: string | ListColourProps) => void;
  setListPaletteColor?: (value: { innerColour: string; outterColour: string }) => void;
  shape?: string;
  listComboColour?: ListColourProps;
  cords?: Cords;
  activeInnerColor?: string;
  activeOutterColor?: string;
}

interface ChromePickerProps {
  hex: string;
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
  activeInnerColor
}: PaletteProps) {
  const dispatch = useAppDispatch();

  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { hub } = useAppSelector((state) => state.hub);

  const [open, setOpen] = useState<boolean>(true);
  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>(paletteViews.BOARD);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isAdvanceSearch, setIsAdvanceSearch] = useState<boolean>(false);
  const [showListShapes, setShowListShapes] = useState<boolean>(false);

  const { paletteId, paletteType } = paletteDropdown;

  const closeMenu = () => {
    setOpen(false);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    dispatch(setListPaletteColor({ innerColour: 'white', outerColour: 'black' }));
  };

  const handleCancel = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setOpen(false);
      dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    }
  };

  const handleEditColor = (state: boolean) => {
    setDisplayColorPicker(state);
  };
  const handleCustomColor = (color: ChromePickerProps) => {
    setCustomColor(color.hex);
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

  const handleClick = (color?: string | ListColourProps) => {
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

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: cords?.top || 'center',
        horizontal: 15
      }}
      PaperProps={{
        style: {
          borderRadius: '12px'
        }
      }}
    >
      <div className="w-auto p-2 overflow-y-auto rounded-full drop-shadow-2xl" style={{ borderRadius: '5px' }}>
        <div className="z-50 flex flex-col">
          {!isSearch && (
            <div className="flex items-center justify-between mb-2">
              <p className="justify-center ml-2 text-gray-500">COLOUR LIBRARY</p>
              <div className="flex items-center gap-1">
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
                <ToolTip title="Open Search">
                  <span className="p-1 border rounded border-primary-200" onClick={() => setIsSearch(true)}>
                    <SearchIcon />
                  </span>
                </ToolTip>
              </div>
            </div>
          )}
          {isSearch && (
            <div className="mx-2">
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
          {paletteType === EntityType.list && (
            <div className="flex items-center justify-between mt-1 ml-2">
              <span
                className={`relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 text-xs text-gray-500 bg-gray-200 rounded-md hover:text-primary-600 hover:bg-primary-100 ${
                  showListShapes && 'text-white bg-primary-500'
                }`}
                onClick={() => setShowListShapes((prev) => !prev)}
              >
                <p>{title + ' Shapes'}</p>
                <ArrowDownFilled color={showListShapes ? 'white' : undefined} />
                {showListShapes && <span className="absolute left-0 right-0 z-20 top-6">{topContent}</span>}
              </span>
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
          {title === 'List' && (
            <span className="h-px my-2 ml-2">
              <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400" />
            </span>
          )}
          {selectedElement && selectedElement}
          <div className="flex items-center justify-between mt-2">
            <ToolTip title="Advance color option">
              <span className="flex items-center p-1 ml-2 border rounded-md border-primary-200">
                <BiPaint
                  onClick={() => handleEditColor(true)}
                  className={`${displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
                />
              </span>
            </ToolTip>
            <RiArrowUpSFill
              onClick={() => handleEditColor(false)}
              className={`${!displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
            />
            {!displayColorPicker && (
              <div className="flex items-center justify-between gap-2">
                <Button
                  height="h-6"
                  label="Cancel"
                  labelSize="text-xs"
                  padding="p-1"
                  buttonStyle="danger"
                  onClick={handleCancel}
                />
                <Button
                  height="h-6"
                  customHoverColor="hover:bg-alsoit-purple-300"
                  label={'Update ' + title}
                  labelSize="text-xs"
                  padding="p-1"
                  buttonStyle="custom"
                />
              </div>
            )}
          </div>
          {/* {displayColorPicker && <ChromePicker color={customColor} onChangeComplete={handleCustomColor} />} */}
          {displayColorPicker && (
            <div className="flex flex-col justify-center w-full gap-2">
              <div className="flex items-center justify-between p-1">
                <p>ADVANCE COLOUR SETTINGS</p>
                <span className="flex items-center justify-between gap-2">
                  <ToolTip title="Search Advance Colour">
                    <span onClick={() => setIsAdvanceSearch(true)}>
                      <SearchIcon />
                    </span>
                  </ToolTip>
                  <span className="w-6 h-6 p-2 rounded" style={{ backgroundColor: customColor }}></span>
                </span>
              </div>
              <HuePicker
                style={{ borderRadius: '10px' }}
                color={customColor}
                onChange={handleCustomColor}
                onChangeComplete={handleCustomColor}
              />
              <AlphaPicker color={customColor} onChange={handleCustomColor} onChangeComplete={handleCustomColor} />
              <button
                onClick={() => handleClick(customColor)}
                className={`p-1 mt-2 border rounded ${customColor !== '' ? 'text-white' : 'text-black'}`}
                style={{ backgroundColor: `${customColor}` }}
              >
                Save Color
              </button>
            </div>
          )}

          {bottomContent}
        </div>
      </div>
    </Menu>
  );
}
