import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../../components';

interface SearchProps {
  query: string;
  setQuery: (i: string) => void;
  type: string;
}

export default function Search({ query, setQuery, type }: SearchProps) {
  const dispatch = useDispatch();
  return (
    <div className="relative flex-grow">
      <Input
        name={`explorer-${type}-search`}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        value={query}
        placeholder={`enter ${type} name`}
      />
      {query.length ? (
        <XIcon
          onClick={() => dispatch(setQuery(''))}
          className="h-5 w-5 cursor-pointer stroke-current text-gray-500 absolute right-2 top-2.5"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
