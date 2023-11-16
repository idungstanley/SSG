import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineNoAccounts } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';

export const completeOptions = [
  {
    id: 'new_item',
    name: 'New Item',
    handleClick: () => ({}),
    icon: <FiPlus />
  },
  {
    id: 'convert_to_task',
    name: 'Convert to task',
    handleClick: () => ({}),
    icon: <BsPencil />
  },
  {
    id: 'delete_checklist',
    name: 'Delete Checklist',
    handleClick: () => ({}),
    icon: <RiDeleteBin6Line />
  }
];

export const lessOptions = [
  {
    id: 'rename',
    name: 'Rename',
    handleClick: () => ({}),
    icon: <BsPencil />
  },
  {
    id: 'assign_to',
    name: 'Assign to',
    handleClick: () => ({}),
    icon: <CgProfile />
  },
  {
    id: 'unassign',
    name: 'Unassign',
    handleClick: () => ({}),
    icon: <MdOutlineNoAccounts />
  },
  {
    id: 'delete_item',
    name: 'Delete Item',
    handleClick: () => ({}),
    icon: <RiDeleteBin6Line />
  }
];
