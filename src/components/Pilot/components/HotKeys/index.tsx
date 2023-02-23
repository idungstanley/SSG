import React, { Fragment } from 'react';
import { FireIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../../../app/hooks';
import Dropdown from '../../../Dropdown/index';

interface HotKeysProps {
  setShowModal: (i: boolean) => void;
}

export default function Menu({ setShowModal }: HotKeysProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const dropdownConfig = [
    {
      id: 1,
      icon: <FireIcon className="w-4 h-4" />,
      label: 'Add / remove hotkeys',
      onClick: () => setShowModal(true),
    },
  ];

  const { show } = pilotSideOver;

  return show ? (
    <>
      <Dropdown config={dropdownConfig} iconType="dots" />
    </>
  ) : null;
}
