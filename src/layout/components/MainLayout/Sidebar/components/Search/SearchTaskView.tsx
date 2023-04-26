import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setFilteredResults } from '../../../../../../features/search/searchSlice';
import { Hub } from '../../../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface SearchViewProps {
  handleCloseSearchView: () => void;
  placeHolder: string;
  items: Hub[];
}
export default function SearchTaskView({ handleCloseSearchView, placeHolder, items }: SearchViewProps) {
  const baseColor = '#BF00FFB2';
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const searchItem = (value: string) => {
    const enteredValue = value.toLowerCase();
    setQuery(enteredValue);
  };
  useEffect(() => {
    if (query !== '') {
      const filteredData = items.filter((item) => {
        return Object.values(item.name).join('').toLowerCase().includes(query);
      });
      dispatch(setFilteredResults(filteredData));
    } else {
      dispatch(setFilteredResults(items));
    }
  }, [query]);

  return (
    <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
      <BiSearch className="absolute w-6 h-4 -left-1 top-2.5" style={{ color: baseColor }} />
      <input
        type="text"
        name=""
        id=""
        placeholder={placeHolder}
        onChange={(e) => searchItem(e.target.value)}
        className="w-full h-fit truncate pl-5 border-transparent border-none focus:border-transparent focus:ring-0"
        style={{ fontSize: '10px' }}
      />
      <div className="flex absolute right-3 top-2.5" style={{ color: baseColor }}>
        <VscSettings className="w-6 h-4 cursor-pointer" />
        <IoClose className="w-6 h-4 cursor-pointer" onClick={handleCloseSearchView} />
      </div>
    </div>
  );
}