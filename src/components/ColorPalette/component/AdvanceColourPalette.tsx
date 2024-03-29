import React, { useCallback, useEffect, useState } from 'react';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import ArrowDownFilled from '../../../assets/icons/ArrowDownFilled';
import ToolTip from '../../Tooltip/Tooltip';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import Input from '../../input/Input';
import SearchIcon from '../../../assets/icons/SearchIcon';
import { cl } from '../../../utils';
import { AlphaPicker, HuePicker } from 'react-color';
import { ColorResult } from '../Type';
import { EditableInput } from 'react-color/lib/components/common';
// import Button from '../../Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddColour } from '../../../features/account/accountService';
import { FORMATTED_COLOR } from './PaletteListView';
import { getColorName } from 'ntc-ts';
// import CancelButton from '../../CancelButton';
import ClosePalette from '../../../assets/icons/ClosePalette';
import SavePalette from '../../../assets/icons/SavePalette';
import ReplacePalette from '../../../assets/icons/ReplacePalette';

export default function AdvanceColourPalette({ show }: { show: boolean }) {
  //Hooks
  const queryClient = useQueryClient();
  //state management sections
  const [isAdvanceSearch, setIsAdvanceSearch] = useState<boolean>(false);
  const [showColorTypes, setShowColorTypes] = useState<boolean>(false);
  const [colorType, setColorType] = useState<string>('hex');
  const [colorName, setColorName] = useState<string>('Missing Color');
  const [colorInputValue, setColorInputValue] = useState<string>('');
  const [color, setColor] = useState<ColorResult>({
    hex: '#000',
    rgb: {
      a: 0.45,
      r: 200,
      g: 24,
      b: 201
    },
    hsl: {
      a: 0.45,
      h: 200,
      s: 24,
      l: 201
    }
  });

  //variables sections
  const { rgb } = color || {};
  const filteredKeys = ['hex', 'hsl', 'rgb'];
  const filteredObject = Object.fromEntries(Object.entries(color).filter(([key]) => filteredKeys.includes(key)));

  //Mutation functions
  const addColorMutation = useMutation(AddColour, {
    onSuccess: () => {
      queryClient.invalidateQueries(['color-palette']);
      setColorInputValue('');
    }
  });

  //Handle functions sections
  const handleCloseAdvanceSearch = () => {
    setIsAdvanceSearch(false);
  };
  const updateColor = useCallback((color: ColorResult) => setColor(color), []);

  const handleColorTypeSwitch = () => {
    switch (colorType) {
      case 'hex':
        return color.hex;
      case 'rgb':
        return `${Math.floor(color.rgb.r)} ${Math.floor(color.rgb.g)} ${Math.floor(color.rgb.b)}`;
      case 'hsl':
        return `${Math.floor(color.hsl.h)} ${Math.floor(color.hsl.s)} ${Math.floor(color.hsl.l)}`;
      default:
        return color.hex;
    }
  };

  const onChange = (color: string) => {
    setColor((prev) => {
      return { ...prev, ['hex']: color };
    });
  };

  const handleAddColor = () => {
    addColorMutation.mutateAsync({
      color: color.hex,
      color_name: colorName,
      name: colorInputValue
    });
  };

  //useEffect
  useEffect(() => {
    const colorProperty: FORMATTED_COLOR = getColorName(color.hex);
    setColorName(colorProperty.name);
  }, [updateColor, color]);

  //style variables section
  const inputStyles = {
    input: {
      border: '1px',
      width: '70px',
      padding: '6px',
      fontSize: '11px',
      color: '#424242',
      borderRadius: '5px',
      height: '23px'
    }
  };

  const [onHover, setOnHover] = useState('white');

  return show ? (
    <div className="px-2 border-alsoit-gray-75 border-t-[0.5px]">
      <div className="flex flex-col justify-center w-full gap-2 text-[#424242]">
        <div className={cl(isAdvanceSearch && 'w-full', 'flex items-center justify-between p-1')}>
          {!isAdvanceSearch && <p>ADVANCED COLOUR PALETTE</p>}
          <span className={cl(isAdvanceSearch && 'w-full', 'flex items-center justify-between gap-2')}>
            {!isAdvanceSearch && (
              <ToolTip title="Search Advance Colours">
                <span className="p-1 bg-white rounded hover:bg-[#F9E6FF]" onClick={() => setIsAdvanceSearch(true)}>
                  <SearchIcon color="#919191" className="w-4 h-4" />
                </span>
              </ToolTip>
            )}
            {isAdvanceSearch && (
              <div className="grow">
                <Input
                  placeholder="Search"
                  borderRadius="rounded-md py-0.5"
                  type="text"
                  name="Advance Search. . ."
                  leadingIcon={<CiSearch style={{ color: 'rgb(191, 0, 255)' }} />}
                  trailingIcon={
                    <ToolTip title="Close Advance Search">
                      <span>
                        <AiFillCloseCircle
                          className="text-sm hover:fill-[#8601B2]"
                          style={{ color: 'rgb(191, 0, 255)' }}
                        />
                      </span>
                    </ToolTip>
                  }
                  trailingClick={handleCloseAdvanceSearch}
                  onChange={() => null}
                />
              </div>
            )}
            <span className="w-6 h-6 p-2 rounded" style={{ backgroundColor: color?.hex }}></span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full gap-2">
          <HuePicker width="100%" style={{ borderRadius: '20px' }} color={rgb} onChange={updateColor} />
          <AlphaPicker width="100%" color={rgb} onChange={updateColor} />
        </div>
        <div className="flex items-center gap-1 mt-4">
          <span
            className="relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 text-xs bg-white rounded-md hover:bg-primary-100 cursor-pointer border-alsoit-border-sm"
            onClick={() => setShowColorTypes((prev) => !prev)}
          >
            <p className="uppercase">{colorType}</p>
            <ArrowDownFilled color="#919191" />
            {showColorTypes && color && (
              <span className="absolute left-0 z-20 p-1 px-1 bg-white border rounded-md -right-5 top-6">
                {Object.keys(filteredObject).map((colorFormat, colorIndex) => (
                  <span
                    key={colorIndex}
                    className="flex items-center h-6 gap-2 p-1 text-gray-500 uppercase rounded hover:bg-gray-100"
                    onClick={() => setColorType(colorFormat)}
                  >
                    <RoundedCheckbox
                      onChange={() => ({})}
                      isChecked={colorFormat === colorType}
                      styles="w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
                    />
                    <p>{colorFormat}</p>
                  </span>
                ))}
              </span>
            )}
          </span>
          <div className="flex -mt-3 grow rounded cursor-pointer">
            <div className="flex flex-col items-center justify-center text-alsoit-gray-100 w-full">
              <p className="uppercase text-[8px] text-left pr-5">{colorType} CODE</p>
              <span className="w-full bg-white border h-[25px] rounded-l">
                <EditableInput value={handleColorTypeSwitch()} style={inputStyles} onChange={onChange} />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <p className="w-full pl-2 text-left text-alsoit-gray-100 text-[8px]">NAME</p>
              <span className="flex items-center w-full pl-2 bg-white border-y h-[25px]">{colorName}</span>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="w-full pl-1 text-left text-alsoit-gray-100 text-[8px] pr-2">OPACITY</p>
              <span className="flex items-center w-full pl-2 bg-white border rounded-r h-[25px]">
                {color && color.rgb && color.rgb.a !== undefined && Math.floor(color.rgb.a * 100)}%
              </span>
            </div>
          </div>
        </div>
        <Input
          placeholder="Input library name"
          bgColor="bg-white"
          borderRadius="rounded-md py-0.5"
          type="text"
          name="name"
          value={colorInputValue}
          isBorder={false}
          label="LIBRARY COLOUR NAME"
          height="h-8"
          onChange={(e) => setColorInputValue(e.target.value)}
        />
        <div className="flex items-center justify-end gap-2 p-1 mb-2 cursor-pointer">
          <ToolTip title="Cancel">
            <span
              onClick={() => ({})}
              onMouseEnter={() => {
                setOnHover('#FF3738');
              }}
              onMouseLeave={() => {
                setOnHover('white');
              }}
              className="text-[#FF3738] hover:text-white"
            >
              <ClosePalette fill={onHover} />
            </span>
          </ToolTip>
          <ToolTip title="Replace selected library color">
            <span onClick={handleAddColor} className="text-white hover:text-[#96EAA6]">
              <ReplacePalette />
            </span>
          </ToolTip>
          <ToolTip title="Save as a new library color">
            <span onClick={handleAddColor}>
              <SavePalette />
            </span>
          </ToolTip>
        </div>
      </div>
    </div>
  ) : null;
}
