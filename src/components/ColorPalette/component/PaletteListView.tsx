import React, { useEffect, useRef, useState } from 'react';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedListColours } from '../../../features/account/accountSlice';
import { IPaletteData } from '../../../features/workspace/workspace.interfaces';
import UnpinnedIcon from '../../../assets/icons/UnpinnedIcon';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../DropDowns';
import EditIcon from '../../../assets/icons/Edit';
import { BsCheck2All } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePaletteColour, editPaletteColour } from '../../../features/account/accountService';
import PinnedIcon from '../../../assets/icons/PinnedIcon';

export default function PaletteListView() {
  const dispatch = useAppDispatch();
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);
  const allChecked = colourPaletteData?.every((item) => selectListColours.includes(item.id as string));

  const handleGroupSelect = () => {
    const updatedSelectedColour = [...selectListColours];
    if (allChecked) {
      colourPaletteData.forEach((item) => {
        const indexInArray = updatedSelectedColour.indexOf(item.id as string);
        updatedSelectedColour.splice(indexInArray, 1);
      });
    } else {
      colourPaletteData.forEach((item) => {
        const indexInArray = updatedSelectedColour.indexOf(item.id as string);
        if (indexInArray === -1) {
          updatedSelectedColour.push(item.id as string);
        }
      });
    }
    dispatch(setSelectedListColours(updatedSelectedColour));
  };

  return (
    <VerticalScroll>
      <div className="w-full h-56 table-container" style={{ fontSize: '10px' }}>
        <table className="w-full" style={{ display: 'grid', gridTemplateColumns: '20px 50px 82px 115px auto' }}>
          <tr className="w-full h-6 text-left contents group">
            <th className="p-2 text-center">
              <RoundedCheckbox
                onChange={handleGroupSelect}
                isChecked={allChecked}
                styles={`w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300 ${
                  allChecked ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </th>
            <th className="p-2 text-center border-b border-gray-300">
              <span className="flex items-center justify-between">COLOUR</span>
            </th>
            <th className="p-2 border-b border-gray-300">HEX CODE</th>
            <th className="p-2 border-b border-gray-300">COLOUR NAME</th>
            <th className="p-2 border-b border-gray-300">LIBRARY NAME</th>
          </tr>
          {colourPaletteData.map((item, index) => item !== null && <Row item={item} key={index} />)}
        </table>
      </div>
    </VerticalScroll>
  );
}

export type FORMATTED_COLOR = {
  exactMatch: boolean;
  name: string;
  rgb: string | null;
};

function Row({ item, key }: { item: IPaletteData; key: number }) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showEditDropdown, setShowEditDropdown] = useState<null | HTMLDivElement>(null);
  const [editLibraryNameContent, setEditLibraryNameContent] = useState<boolean>(false);
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);

  useEffect(() => {
    const { current } = inputRef;
    current?.focus();
  }, [editLibraryNameContent]);

  useEffect(() => {
    const isChecked = selectListColours.includes(item.id as string);
    if (isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectListColours, item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const indexInArray = selectListColours.indexOf(item.id as string);
    const updatedSelectedColour = [...selectListColours];
    if (!selectListColours.includes(item.id as string)) {
      updatedSelectedColour.push(item.id as string);
    } else {
      updatedSelectedColour.splice(indexInArray, 1);
    }
    dispatch(setSelectedListColours(updatedSelectedColour as string[]));
    setIsChecked(isChecked);
  };

  const handleDeleteMutation = useMutation(deletePaletteColour, {
    onSuccess: () => {
      queryClient.invalidateQueries(['color-palette']);
    }
  });

  const handleEditMutation = useMutation(editPaletteColour, {
    onSuccess: () => {
      queryClient.invalidateQueries(['color-palette']);
    }
  });

  const handleOpenEditDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowEditDropdown(e.currentTarget);
  };

  const handleCloseEditDropwdown = () => {
    setShowEditDropdown(null);
  };

  const getSelectedColorDetail = colourPaletteData.find((select) => select.id === item.id);

  const { is_pinned } = getSelectedColorDetail as IPaletteData;
  const handleEditLibraryName = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLSpanElement>,
    pinned?: boolean
  ) => {
    e.stopPropagation();
    handleEditMutation.mutateAsync({
      id: item.id,
      name: inputRef.current?.innerText.trim() || (item.name as string),
      color_name: item.color_name,
      color: item.color,
      is_pinned: pinned
    });
  };

  const collections = [
    {
      icons: <EditIcon active={false} />,
      label: 'Edit',
      handleClick: () => {
        setEditLibraryNameContent(true);
        handleCloseEditDropwdown();
      }
    },
    {
      icons: <BsCheck2All />,
      label: 'Select',
      handleClick: () => ({})
    },
    {
      icons: <MdDeleteForever />,
      label: 'Delete',
      handleClick: () => {
        handleDeleteMutation.mutateAsync({
          id: item.id
        });
        handleCloseEditDropwdown();
      }
    }
  ];

  return (
    <tr className="w-full bg-white contents group" key={key} style={{ fontSize: '10px' }}>
      <td className="p-2">
        <RoundedCheckbox
          onChange={onChange}
          isChecked={isChecked}
          styles={`w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300 ${
            isChecked ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y border-l' : 'border-b border-gray-300'}`}>
        <div className="flex items-center justify-center">
          <div
            className={`w-5 h-5 p-2 rounded ${isChecked ? 'bg-primary-100' : ''}`}
            style={{ backgroundColor: `${item.color}` }}
          ></div>
        </div>
      </td>
      <td
        className={`p-2 bg-white uppercase ${isChecked ? 'border-primary-400 border-y' : 'border-b border-gray-300'}`}
      >
        <div>{item.color.substring(1)}</div>
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y' : 'border-b border-gray-300'}`}>
        <div>{item.color_name}</div>
      </td>
      <td
        className={`p-2 bg-white group relative gap-2 justify-between flex items-center ${
          isChecked ? 'border-primary-400 border-y border-r' : 'border-b border-gray-300'
        }`}
      >
        <div
          className="w-20 truncate"
          ref={inputRef}
          onKeyDown={(e) => (e.key === 'Enter' ? handleEditLibraryName(e) : null)}
          contentEditable={editLibraryNameContent}
        >
          {item.name ? item.name : 'Add library name'}
        </div>
        <div className="flex items-center gap-1 opacity-0 cursor-pointer right-1 group-hover:opacity-100">
          {is_pinned ? (
            <span onClick={(e) => handleEditLibraryName(e, false)}>
              <PinnedIcon />
            </span>
          ) : (
            <span onClick={(e) => handleEditLibraryName(e, true)}>
              <UnpinnedIcon />
            </span>
          )}
          <div onClick={(e) => handleOpenEditDropdown(e)}>
            <ThreeDotIcon />
          </div>
        </div>
      </td>
      <AlsoitMenuDropdown anchorEl={showEditDropdown} handleClose={handleCloseEditDropwdown}>
        <div className="flex flex-col w-36 p-2.5 space-y-2">
          <p>MORE SETTINGS</p>
          {collections.map((item, index) => (
            <div
              className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-primary-200 hover:text-primary-600"
              key={index}
              onClick={item.handleClick}
            >
              {item.icons}
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </tr>
  );
}
