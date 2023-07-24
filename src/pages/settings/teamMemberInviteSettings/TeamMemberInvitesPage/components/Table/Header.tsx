import React from 'react';
import HeaderItem from './HeaderItem';

export default function Header() {
  const heading = ['name', 'email', 'role', 'status', 'invited at', 'expires at'];
  return (
    <thead className="bg-gray-50">
      <tr>
        {heading.map((elem, index) => {
          return <HeaderItem key={elem} value={elem} index={index} />;
        })}
      </tr>
    </thead>
  );
}
