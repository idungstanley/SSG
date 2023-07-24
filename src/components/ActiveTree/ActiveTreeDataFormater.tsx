import React from 'react';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveTreeList from './ActiveTreeList';
import Input from '../input/Input';
import { CiSearch } from 'react-icons/ci';

interface IActiveTreeDataFormaterProps {
  data: Hub[];
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveTreeDataFormater({ data, setToggleTree }: IActiveTreeDataFormaterProps) {
  return data.length ? (
    <div
      className="absolute max-h-48 left-0 right-0 h-auto px-1 space-x-2 overflow-y-scroll bg-white border border-gray-100 rounded-md top-0 ring-1 ring-black ring-opacity-5 focus:outline-none"
      style={{ boxShadow: '0 1px 10px #00000040', zIndex: '999' }}
    >
      <div className="sticky top-0 z-50 pt-3 bg-white">
        <Input leadingIcon={<CiSearch />} placeholder="Choose Location" name="search" onChange={() => ({})} />
      </div>
      <ActiveTreeList hubs={data} setToggleTree={setToggleTree} />
    </div>
  ) : null;
}
