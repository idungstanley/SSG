import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import { BiPaint } from 'react-icons/bi';
import { RiArrowUpSFill } from 'react-icons/ri';
import { ChromePicker } from 'react-color';

interface PaletteProps {
  title?: string;
  bottomContent?: JSX.Element;
  setPaletteColor: (color?: string) => void;
}

interface ChromePickerProps {
  hex: string;
}
export default function Palette({ title, setPaletteColor, bottomContent }: PaletteProps) {
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { paletteId, paletteType } = paletteDropdown;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');

  const ref = useRef<HTMLInputElement>(null);
  const handleEditColor = (state: boolean) => {
    setDisplayColorPicker(state);
  };
  const handleCustomColor = (color: ChromePickerProps) => {
    setCustomColor(color.hex);
  };

  const palette = [
    'green',
    'yellow',
    'blue',
    'pink',
    'magenta',
    '#5CEE4F',
    'teal',
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
      queryClient.invalidateQueries();
    }
  });
  const editHubColorMutation = useMutation(useEditHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  useEffect(() => {
    const checkClickedOutSide = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        if (paletteDropdown !== null) {
          dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
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
    width: '15px'
  };

  const handleClick = (color?: string) => {
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
    }
    setPaletteColor(color);
    dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
  };

  const colorBoxes = palette.map((c) => (
    <div style={{ backgroundColor: `${c}`, ...style }} key={c} className="rounded" onClick={() => handleClick(c)}></div>
  ));

  return (
    <div
      className="absolute top-auto w-auto p-2 mt-3 overflow-y-auto bg-white border border-gray-200 rounded shadow-2xl w-fit left-5 h-fit drop-shadow-2xl"
      style={{ zIndex: '999' }}
      ref={ref}
    >
      <div className="flex flex-col">
        <p className="justify-center">{title}</p>
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
