import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

interface SearchProps {
  onChange: (i: string) => void;
}

export default function Search({ onChange }: SearchProps) {
  const queryRef = useRef<HTMLInputElement>(null);

  const handleChange = useThrottle(() => {
    if (queryRef.current) {
      onChange(queryRef.current.value);
    }
  }, 500);

  return (
    <div className="border rounded-3xl flex px-2 py-1 gap-2 items-center group text-gray-500">
      <MagnifyingGlassIcon className="w-4 h-4 group-hover:text-orange-500" aria-hidden="true" />
      <input
        ref={queryRef}
        onChange={handleChange}
        type="text"
        placeholder="Search..."
        className="border-none p-0 outline-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-sm"
      />
    </div>
  );
}
