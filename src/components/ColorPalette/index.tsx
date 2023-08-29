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

  const { paletteId, paletteType } = paletteDropdown;

  const closeMenu = () => {
    setOpen(false);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    dispatch(setListPaletteColor({ innerColour: 'white', outerColour: 'black' }));
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

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: cords?.top || 'center',
        horizontal: 15
      }}
    >
      <div className="w-auto p-2 overflow-y-auto drop-shadow-2xl">
        <div className="z-50 flex flex-col">
          {paletteType !== EntityType.list && <p className="justify-center">{title}</p>}
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
          <div className="flex justify-center">
            <BiPaint
              onClick={() => handleEditColor(true)}
              className={`${displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
            />
            <RiArrowUpSFill
              onClick={() => handleEditColor(false)}
              className={`${!displayColorPicker ? 'hidden' : 'block cursor-pointer'}`}
            />
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
