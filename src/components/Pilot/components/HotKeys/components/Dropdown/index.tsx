import React from 'react';
import Dropdown from '../../../../../Dropdown/index';
import { FireIcon, ChevronDoubleRightIcon, EyeIcon } from '@heroicons/react/24/outline';

interface HotKeysProps {
  setShowModal: (i: boolean) => void;
}

export default function Menu({ setShowModal }: HotKeysProps) {
  const dropdownConfig = [
    {
      id: 1,
      icon: <FireIcon className="w-4 h-4 " />,
      label: 'Add / remove Hot Keys',
      onClick: () => setShowModal(true)
    },
    {
      id: 2,
      icon: <EyeIcon className="w-4 h-4 " />,
      label: 'Show or Hide Pilot Feature',
      onClick: () => setShowModal(true)
    },
    {
      id: 3,
      icon: <ChevronDoubleRightIcon className="w-4 h-4 " />,
      label: 'Compact View',
      onClick: () => setShowModal(true)
    }
  ];

  return <Dropdown config={dropdownConfig} iconType="dots" />;
}
