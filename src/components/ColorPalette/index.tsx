import { useMutation, useQueryClient } from '@tanstack/react-query';
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
export default function Palette({
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
  const queryClient = useQueryClient();
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

  const palette = [
    'green',
    'yellow',
    'blue',
    'pink',
    'black',
    'orange',
    'white',
    '#ED1500',
    'magenta',
    '#5CEE4F',
    'teal',
    '#1e2533',
    '#8EFAD3',
    '#5E5CCB',
    '#57A1E4',
    '#87DDF0',
    '#8F14EF',
    '#FF7501',
    '#E71CBB',
    '#FFB877',
    '#DF9999',
    '#7B659F',
    '#6DF5DD',
    '#BF00FF',
    '#C8130C',
    '#EEDF19',
    '#306ACC',
    '#AC4B31',
    '#33AA2B',
    '#CC951B'
  ];

  const editWalletColorMutation = useMutation(UseEditWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['retrieve']);
    }
  });
  const editHubColorMutation = useMutation(useEditHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['retrieve']);
    }
  });
  const editListColorMutation = useMutation(UseEditListService, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets-and-list'] });
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

  const style = {
    height: '15px',
    width: '15px',
    border: '1px solid black'
  };

  const handleClick = (color?: string | ListColourProps) => {
    if (paletteType === 'hub') {
      editHubColorMutation.mutateAsync({
        currHubId: paletteId,
        color: color
      });
      setPaletteColor?.(color);
      dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
    } else if (paletteType === 'wallet') {
      editWalletColorMutation.mutateAsync({
        WalletId: paletteId,
        walletColor: color
      });
      setPaletteColor?.(color);
      dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
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
  };

  const colorBoxes = palette.map((c) => (
    <div style={{ backgroundColor: `${c}`, ...style }} key={c} className="rounded" onClick={() => handleClick(c)}></div>
  ));

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
        <button type="button" className="grid grid-cols-5 gap-3 p-2 font-semibold">
          {colorBoxes}
        </button>
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
