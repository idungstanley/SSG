import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { UseEditListService } from '../../features/list/listService';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import { BiPaint } from 'react-icons/bi';
import { RiArrowUpSFill } from 'react-icons/ri';
import { ChromePicker } from 'react-color';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import { ListColourProps } from '../tasks/ListItem';
import { setListPaletteColor } from '../../features/list/listSlice';
import { changeListColorManager } from '../../managers/List';
import { getHub } from '../../features/hubs/hubSlice';
import { setFilteredResults } from '../../features/search/searchSlice';
import { changeWalletColorManager } from '../../managers/Wallet';
import { changeHubColorManager } from '../../managers/Hub';
import { palette } from '../../utils/Colors';
import ColorPalette from './component/ColorPalette';

interface PaletteProps {
  title?: string;
  topContent?: JSX.Element;
  bottomContent?: JSX.Element;
  setPaletteColor?: (color?: string | ListColourProps) => void;
  setListPaletteColor?: (value: { innerColour: string; outterColour: string }) => void;
  shape?: string;
  listComboColour?: ListColourProps;
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
  listComboColour
}: PaletteProps) {
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { paletteId, paletteType } = paletteDropdown;
  const dispatch = useAppDispatch();
  const { hub } = useAppSelector((state) => state.hub);

  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');

  const ref = useRef<HTMLInputElement>(null);
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

  const editHubColorMutation = useMutation(useEditHubService, {
    onSuccess: (data) => {
      const hubData = data.data.hub;
      const updatedTree = changeHubColorManager(hubData.id as string, hub, hubData.color as string);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const editWalletColorMutation = useMutation(UseEditWalletService, {
    onSuccess: (data) => {
      const wallet = data.data.wallet;
      const updatedTree = changeWalletColorManager(wallet.id as string, hub, wallet.color);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const editListColorMutation = useMutation(UseEditListService, {
    onSuccess: (data) => {
      const list = data.data.list;
      const updatedTree = changeListColorManager(list.id as string, hub, JSON.parse(list.color));
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  useEffect(() => {
    const checkClickedOutSide = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        if (paletteDropdown !== null) {
          dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
          dispatch(setListPaletteColor({ innerColour: 'white', outerColour: 'black' }));
        }
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, []);

  const handleClick = (color?: string | ListColourProps) => {
    if (paletteType === 'hub') {
      editHubColorMutation.mutateAsync({
        currHubId: paletteId,
        color: color
      });
    } else if (paletteType === 'wallet') {
      editWalletColorMutation.mutateAsync({
        WalletId: paletteId,
        walletColor: color
      });
    } else if (paletteType === 'list') {
      if (isOutterFrameActive) {
        editListColorMutation.mutateAsync({
          listId: paletteId,
          colour: { outerColour: color as string, innerColour: listComboColour?.innerColour }
        });
      } else if (isInnerFrameActive) {
        editListColorMutation.mutateAsync({
          listId: paletteId,
          colour: {
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
    <div
      className="absolute inset-0 top-auto w-auto p-2 mt-3 overflow-y-auto bg-white border border-gray-200 rounded shadow-2xl w-fit left-5 h-fit drop-shadow-2xl"
      style={{ zIndex: '999' }}
      ref={ref}
    >
      <div className="z-50 flex flex-col">
        {paletteType !== 'list' && <p className="justify-center">{title}</p>}
        {topContent}
        {paletteType === 'list' && (
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
  );
}
