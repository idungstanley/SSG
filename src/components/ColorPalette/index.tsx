import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseEditHubService } from '../../features/hubs/hubService';
import { UseEditWalletService } from '../../features/wallet/walletService';
import { UseEditListService } from '../../features/list/listService';
import { setPaletteDropDown, setSelectedListColours } from '../../features/account/accountSlice';
import { RiArrowUpSFill } from 'react-icons/ri';
import { AlphaPicker, HuePicker } from 'react-color';
import { getColorName } from 'ntc-ts';
import { EditableInput } from 'react-color/lib/components/common';
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
import PaletteListView, { FORMATTED_COLOR } from './component/PaletteListView';
import ToolTip from '../Tooltip/Tooltip';
import { AiFillCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { ColorResult } from './Type';
import { cl } from '../../utils';
import RoundedCheckbox from '../Checkbox/RoundedCheckbox';
import ArrowOpenDown from '../../assets/icons/ArrowOpenDown';
import DefaultColour from '../../assets/icons/DefaultColour';
import SelectionMenu from './component/SelectionMenu';
import AlsoitMenuDropdown from '../DropDowns';
import ListIconSelection, { listIconDetails } from './component/ListIconSelection';
import { AddColour, useGetColors } from '../../features/account/accountService';

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
  const queryClient = useQueryClient();

  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { hub } = useAppSelector((state) => state.hub);
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState<boolean>(true);
  const [isOutterFrameActive, setIsOutterFrameActive] = useState<boolean>(true);
  const [isInnerFrameActive, setIsInnerFrameActive] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
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
  // const [customColor, setCustomColor] = useState<string>('');
  const [colorType, setColorType] = useState<string>('hex');
  const [showColorTypes, setShowColorTypes] = useState<boolean>(false);
  const [selectedViews, setSelectedViews] = useState<string>(paletteViews.BOARD);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isAdvanceSearch, setIsAdvanceSearch] = useState<boolean>(false);
  const [showListShapes, setShowListShapes] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>('Missing Color');
  const [colorInputValue, setColorInputValue] = useState<string>('');
  const [showListShapeSelection, setShowListShapeSelection] = useState<null | HTMLDivElement>(null);
  const { paletteId, paletteType } = paletteDropdown;
  const { rgb } = color || {};
  const updateColor = useCallback((color: ColorResult) => setColor(color), []);

  useEffect(() => {
    const colorProperty: FORMATTED_COLOR = getColorName(color.hex);
    setColorName(colorProperty.name);
  }, [updateColor, color]);

  const onChange = (color: string) => {
    setColor((prev) => {
      return { ...prev, ['hex']: color };
    });
  };

  const inputStyles = {
    input: {
      border: '1px',
      width: '70px',
      padding: '5px',
      fontSize: '10px',
      color: '#000',
      borderRadius: '5px'
    }
  };
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

  const addColorMutation = useMutation(AddColour, {
    onSuccess: () => {
      queryClient.invalidateQueries(['color-palette']);
      setColorInputValue('');
    }
  });

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  const handleCloseAdvanceSearch = () => {
    setIsAdvanceSearch(false);
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
  const filteredKeys = ['hex', 'hsl', 'rgb'];
  const filteredObject = Object.fromEntries(Object.entries(color).filter(([key]) => filteredKeys.includes(key)));
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

  const activeShapeName = listIconDetails.find((item) => item.shape === shape);

  const handleAddColor = () => {
    addColorMutation.mutateAsync({
      color: color.hex,
      color_name: colorName,
      name: colorInputValue
    });
  };

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
              <div className="flex items-center justify-between gap-2 bg-gray-400 h-9">
                <p className="justify-center ml-2 text-white">COLOUR LIBRARY</p>
                <span
                  className="relative flex items-center justify-between h-5 gap-2 p-1 mr-1 text-xs text-gray-500 bg-white rounded w-fit hover:text-primary-600 hover:bg-primary-100"
                  onClick={() => ({})}
                >
                  <p>Add</p>
                  <ArrowDownFilled color="#B2B2B2" />
                </span>
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
          <div className="p-2 mx-2">
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
                  className={`relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 text-xs text-gray-500 rounded-md hover:text-primary-600 border border-gray-300 hover:bg-primary-100 ${
                    showListShapes && 'text-white bg-primary-500'
                  }`}
                  onClick={(e) => handleOpenListShapeSelection(e)}
                >
                  <p>{`${title} Shapes${shape ? `: ${activeShapeName?.label}` : ''}`}</p>
                  <ArrowDownFilled color={showListShapes ? 'white' : undefined} />
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
                  className="flex items-center gap-1 p-1 border rounded-md cursor-pointer border-primary-200"
                  onClick={() => setDisplayColorPicker((prev) => !prev)}
                >
                  <p className={`truncate text-xs w-fit ${displayColorPicker ? 'text-primary-600' : null}`}>
                    ADVANCED COLOR OPTIONS
                  </p>
                  {displayColorPicker ? <RiArrowUpSFill className="cursor-pointer" /> : <ArrowOpenDown />}
                </span>
              </ToolTip>
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
                    labelSize="text-xs truncate"
                    padding="p-1"
                    buttonStyle="custom"
                  />
                </div>
              )}
            </div>
            {/* {displayColorPicker && <ChromePicker color={customColor} onChangeComplete={handleCustomColor} />} */}
            {displayColorPicker && (
              <div className="flex flex-col justify-center w-full gap-2">
                <div className={cl(isAdvanceSearch && 'w-full', 'flex items-center justify-between p-1')}>
                  {!isAdvanceSearch && <p>ADVANCE COLOUR PALETTE</p>}
                  <span className={cl(isAdvanceSearch && 'w-full', 'flex items-center justify-between gap-2')}>
                    {!isAdvanceSearch && (
                      <ToolTip title="Search Advance Colour">
                        <span onClick={() => setIsAdvanceSearch(true)}>
                          <SearchIcon />
                        </span>
                      </ToolTip>
                    )}
                    {isAdvanceSearch && (
                      <div className="grow">
                        <Input
                          placeholder="Search"
                          bgColor="bg-gray-200"
                          borderRadius="rounded-md py-0.5"
                          type="text"
                          name="Advance Search. . ."
                          leadingIcon={<CiSearch />}
                          trailingIcon={
                            <ToolTip title="Close Advance Search">
                              <span>
                                <AiFillCloseCircle style={{ color: 'rgb(191, 0, 255)' }} />
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
                  <HuePicker width="100%" style={{ borderRadius: '10px' }} color={rgb} onChange={updateColor} />
                  <AlphaPicker width="100%" color={rgb} onChange={updateColor} />
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <span
                    className={`relative flex w-fit items-center justify-between gap-2 p-1 px-2.5 text-xs text-gray-500 bg-white border rounded-md hover:text-primary-600 hover:bg-primary-100 ${
                      showListShapes && 'text-white bg-primary-500'
                    }`}
                    onClick={() => setShowColorTypes((prev) => !prev)}
                  >
                    <p className="uppercase">{colorType}</p>
                    <ArrowDownFilled color={showColorTypes ? 'white' : undefined} />
                    {showColorTypes && color && (
                      <span className="absolute left-0 z-20 p-1 px-1 bg-white border rounded-md -right-5 top-6">
                        {Object.keys(filteredObject).map((colorFormat, colorIndex) => (
                          <span
                            key={colorIndex}
                            className="flex items-center h-6 gap-2 p-1 text-gray-500 uppercase rounded hover:bg-primary-200"
                            onClick={() => setColorType(colorFormat)}
                          >
                            <RoundedCheckbox
                              onChange={() => ({})}
                              isChecked={colorFormat === colorType}
                              styles="w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
                            />
                            <p>{colorFormat}</p>
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <div className="grid w-full grid-cols-3 -mt-4 text-xs grow">
                    <div className="flex flex-col items-center justify-center">
                      <p className="uppercase">{colorType} CODE</p>
                      <span className="w-full bg-white border h-7 rounded-l-md">
                        <EditableInput value={handleColorTypeSwitch()} style={inputStyles} onChange={onChange} />
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="w-full pl-2 text-left">NAME</p>
                      <span className="flex items-center w-full pl-1 bg-white border-y h-7">{colorName}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="w-full pl-2 text-left">OPACITY</p>
                      <span className="flex items-center w-full pl-1 bg-white border rounded-r-md h-7">
                        {color && color.rgb && color.rgb.a !== undefined && Math.floor(color.rgb.a * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <Input
                  placeholder="Please input library name"
                  bgColor="bg-white"
                  borderRadius="rounded-md py-0.5"
                  type="text"
                  name="name"
                  value={colorInputValue}
                  label="LIBRARY COLOUR NAME"
                  onChange={(e) => setColorInputValue(e.target.value)}
                />
                <div className="flex items-center justify-between gap-2">
                  <Button
                    height="h-6"
                    label="Cancel"
                    labelSize="text-xs"
                    padding="p-1"
                    buttonStyle="danger"
                    onClick={handleCancel}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      height="h-6"
                      customHoverColor="hover:bg-green-500"
                      label="Save"
                      labelSize="text-xs"
                      padding="p-1"
                      buttonStyle="custom"
                      onClick={handleAddColor}
                    />
                    <Button
                      height="h-6"
                      customHoverColor="hover:bg-green-500"
                      label="Save as new"
                      labelSize="text-xs"
                      padding="p-1"
                      buttonStyle="custom"
                      onClick={handleAddColor}
                    />
                  </div>
                </div>
              </div>
            )}

            {bottomContent}
          </div>
        </div>
      </div>
    </Menu>
  );
}
