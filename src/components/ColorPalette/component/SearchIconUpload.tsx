import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { setShowUploadImage } from '../../../features/account/accountSlice';
import Input from '../../input/Input';

export default function SearchIconUpload() {
  const dispatch = useDispatch();
  const handleImageUpload = () => {
    dispatch(setShowUploadImage(true));
  };
  return (
    <div className="flex items-center justify-between w-full mt-2">
      <div className="w-3/5">
        <Input
          placeholder="Search"
          type="text"
          name="search"
          leadingIcon={<CiSearch />}
          onChange={() => console.log('se')}
        />
      </div>
      <div
        className="flex items-center justify-between p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        onClick={() => handleImageUpload()}
      >
        <AiOutlinePlus />
        <span>upload</span>
      </div>
    </div>
  );
}
