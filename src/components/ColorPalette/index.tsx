import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { setPaletteDropDown } from '../../features/account/accountSlice';

interface PaletteProps {
  title?: string;
  bottomContent?: JSX.Element;
  setPaletteColor: (color?: string) => void;
}
export default function Palette({ title, setPaletteColor, bottomContent }: PaletteProps) {
  const { paletteDropdown, paletteType } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const ref = useRef<HTMLInputElement>(null);

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
          dispatch(setPaletteDropDown({ paletteId: null }));
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
        currHubId: paletteDropdown,
        color: color
      });
    } else if (paletteType === 'wallet') {
      editWalletColorMutation.mutateAsync({
        WalletId: paletteDropdown,
        walletColor: color
      });
    }
    setPaletteColor(color);
    dispatch(setPaletteDropDown({ paletteId: null, paletteType: null }));
  };

  const colorBoxes = palette.map((c) => (
    <div style={{ backgroundColor: `${c}`, ...style }} key={c} className="rounded" onClick={() => handleClick(c)}></div>
  ));

  return (
    <div
      className="absolute top-auto p-2 mt-3 overflow-y-auto bg-white border border-gray-200 rounded shadow-2xl w-fit left-2 h-fit drop-shadow-2xl"
      style={{ zIndex: '999' }}
      ref={ref}
    >
      <div className="flex flex-col">
        <p className="justify-center">{title}</p>
        <button type="button" className="grid grid-cols-5 gap-3 p-2 font-semibold">
          {colorBoxes}
        </button>
        {bottomContent}
      </div>
    </div>
  );
}
