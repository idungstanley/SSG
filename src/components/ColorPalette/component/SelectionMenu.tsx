import React from 'react';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import ToolTip from '../../Tooltip/Tooltip';
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { RiFileCopyLine } from 'react-icons/ri';
import { TbFileExport } from 'react-icons/tb';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePaletteColour } from '../../../features/account/accountService';
import { useAppSelector } from '../../../app/hooks';

interface SelectionProps {
  isVisible: boolean;
  dismissPopUp: () => void;
  selectedCount: number;
  allSelected: boolean;
}

export default function SelectionMenu({ isVisible, dismissPopUp, selectedCount, allSelected }: SelectionProps) {
  const queryClient = useQueryClient();
  const { selectListColours } = useAppSelector((state) => state.account);

  const handleDeleteMutation = useMutation(deletePaletteColour, {
    onSuccess: () => {
      queryClient.invalidateQueries(['color-palette']);
    }
  });

  const TaskIcons = [
    {
      label: 'Export colour',
      icons: <TbFileExport />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      label: 'Duplicate',
      icons: <HiOutlineDuplicate />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      label: 'Copy',
      icons: <RiFileCopyLine />,
      handleClick: () => ({}),
      isVisible: true
    },
    {
      label: 'Delete',
      icons: <MdDeleteForever />,
      handleClick: () => {
        handleDeleteMutation.mutateAsync({
          id: selectListColours[0]
        });
        dismissPopUp();
      },
      isVisible: true
    }
  ];
  return (
    <div className={`overflow-hidden ${isVisible ? 'slide-in' : 'slide-out'} z-100 `}>
      <div
        className="left-0 right-0 flex items-center justify-between bg-black abolute h-11"
        style={{ transition: 'linear', transitionDelay: '100s' }}
      >
        <div className="pl-5 space-x-2">
          <RoundedCheckbox
            styles="rounded-full text-alsoit-purple-300"
            isChecked={true}
            onChange={() => dismissPopUp()}
          />
          <span className="text-xs text-white">{allSelected ? 'All' : selectedCount} Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <>
              <ToolTip className="pt-2" title={menu.label} placement="bottom">
                <p
                  className="flex items-center px-2 mt-0 text-lg text-white cursor-pointer"
                  onClick={() => menu.handleClick()}
                  key={menu.label}
                >
                  {menu.icons}
                </p>
              </ToolTip>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
