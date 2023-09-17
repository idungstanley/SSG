import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { UseEditListService } from '../../features/list/listService';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import { BiPaint } from 'react-icons/bi';
import { RiArrowUpSFill } from 'react-icons/ri';
import { ChromePicker } from 'react-color';
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
import SearchIconUpload from './component/SearchIconUpload';
import Input from '../input/Input';
import { CiSearch } from 'react-icons/ci';
import Button from '../Button';

interface PaletteProps {
  title?: string;
  topContent?: JSX.Element;
  bottomContent?: JSX.Element;
  setPaletteColor?: (color?: string | ListColourProps) => void;
  setListPaletteColor?: (value: { innerColour: string; outterColour: string }) => void;
  shape?: string;
  listComboColour?: ListColourProps;
  cords?: Cords;
}

interface ChromePickerProps {
  hex: string;
}
export default function PaletteManager({
  title,
  setPaletteColor,
  bottomContent,
  topContent,
  shape,
  listComboColour,
  cords
}: PaletteProps) {
  const dispatch = useAppDispatch();

  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { hub } = useAppSelector((state) => state.hub);

  const [open, setOpen] = useState<boolean>(true);
  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');
  const [views, setViews] = useState<string>('board');
  const [isSearch, setIsSearch] = useState<boolean>(false);

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

  // const views = [
  //   {label: 'Board', element: }
  // ]

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: cords?.top || 'center',
        horizontal: 15
      }}
      sx={{ borderRadius: '16px' }}
    >
      <div className="w-auto p-2 rounded-full overflow-y-auto drop-shadow-2xl" style={{ borderRadius: '5px' }}>
        <div className="z-50 flex flex-col">
          {!isSearch && (
            <div className="flex items-center justify-between">
              <p className="justify-center text-gray-500 ml-2">COLOUR LIBRARY</p>
              <div className="flex items-center gap-1">
                <span className={` p-1 rounded ${views === 'board' ? 'bg-primary-500' : 'border border-primary-200'}`}>
                  <GridViews color={views === 'board' ? 'white' : undefined} />
                </span>
                <span className="border p-1 border-primary-200 rounded">
                  <FormatListBullet />
                </span>
                <span className="border p-1 border-primary-200 rounded" onClick={() => setIsSearch(true)}>
                  <SearchIcon />
                </span>
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
                onChange={() => null}
              />
            </div>
          )}
          {topContent}
          {paletteType === EntityType.list && (
            <div className="flex justify-between mt-1">
              <span>{title}</span>
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
          <ColorPalette handleClick={handleClick} />
          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center p-1 ml-2 rounded-md border border-primary-200">
              <BiPaint
                onClick={() => handleEditColor(true)}
                className={`${displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
              />
            </span>
            <RiArrowUpSFill
              onClick={() => handleEditColor(false)}
              className={`${!displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
            />
            {!displayColorPicker && (
              <div className="flex justify-between items-center gap-2">
                <Button
                  height="h-5"
                  label="Cancel"
                  labelSize="text-xs"
                  padding="p-1"
                  buttonStyle="danger"
                  onClick={handleCancel}
                />
                <Button
                  height="h-5"
                  customHoverColor="hover:bg-alsoit-purple-300"
                  label={'Update ' + title}
                  labelSize="text-xs"
                  padding="p-1"
                  buttonStyle="custom"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {displayColorPicker && <ChromePicker color={customColor} onChangeComplete={handleCustomColor} />}
            {displayColorPicker && (
              <button
                onClick={() => handleClick(customColor)}
                className={`p-1 mt-2 border rounded ${customColor !== '' ? 'text-white' : 'text-black'}`}
                style={{ backgroundColor: `${customColor}` }}
              >
                Save Color
              </button>
            )}
          </div>
          {bottomContent}
        </div>
      </div>
    </Menu>
  );
}
