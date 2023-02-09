import React from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { UserAddOutlined, FlagOutlined } from '@ant-design/icons';
import { BsTags } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';
import {
  MdOutlineDeveloperBoard,
  MdOutlineDriveFileMove,
  MdDateRange,
  MdDeleteForever,
} from 'react-icons/md';
import { HiOutlineDocumentDuplicate, HiInbox } from 'react-icons/hi';
import { TbFolderX } from 'react-icons/tb';
import { GiStoneStack, GiJusticeStar } from 'react-icons/gi';
import { BiMerge, BiEdit } from 'react-icons/bi';

const TaskIcons = [
  {
    id: 1,
    icons: <IoEyeOutline />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 2,
    icons: <UserAddOutlined />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 3,
    icons: <MdOutlineDeveloperBoard />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 4,
    icons: <BsTags />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 5,
    icons: <TbSubtask />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 6,
    icons: <MdOutlineDriveFileMove />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 7,
    icons: <HiOutlineDocumentDuplicate />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 8,
    icons: <TbFolderX />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 9,
    icons: <MdDateRange />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 10,
    icons: <FlagOutlined />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 11,
    icons: <GiStoneStack />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 12,
    icons: <BiMerge />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 13,
    icons: <GiJusticeStar />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 14,
    icons: <BiEdit />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 15,
    icons: <HiInbox />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
  {
    id: 16,
    icons: <MdDeleteForever />,
    handleClick: () => {
      console.log('output');
    },
    isVisible: true,
  },
];

export default TaskIcons;
