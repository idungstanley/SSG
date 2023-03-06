import React from "react";
import { MdPersonOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineNoAccounts } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

export const completeOptions = [
  {
    id: 1,
    name: "New Item",
    handleClick: () => ({}),
    icon: <FiPlus />,
  },
  {
    id: 2,
    name: "Assign all",
    handleClick: () => ({}),
    icon: <MdPersonOutline />,
  },
  {
    id: 3,
    name: "Unassign all",
    handleClick: () => ({}),
    icon: <MdOutlineNoAccounts />,
  },
  {
    id: 4,
    name: "Rename",
    handleClick: () => ({}),
    icon: <BsPencil />,
  },
  {
    id: 5,
    name: "Delete Checklist",
    handleClick: () => ({}),
    icon: <RiDeleteBin6Line />,
  },
];

export const lessOptions = [
  {
    id: 1,
    name: "Rename",
    handleClick: () => ({}),
    icon: <BsPencil />,
  },
  {
    id: 2,
    name: "Assign to",
    handleClick: () => ({}),
    icon: <CgProfile />,
  },
  {
    id: 3,
    name: "Unassign",
    handleClick: () => ({}),
    icon: <MdOutlineNoAccounts />,
  },
  {
    id: 4,
    name: "Delete Item",
    handleClick: () => ({}),
    icon: <RiDeleteBin6Line />,
  },
];
