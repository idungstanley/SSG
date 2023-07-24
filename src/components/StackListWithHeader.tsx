import React, { ReactNode } from 'react';

interface StackListWithHeaderProps {
  title: JSX.Element;
  items: ReactNode;
}

function StackListWithHeader({ title, items }: StackListWithHeaderProps) {
  return (
    <div className="h-full">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
      <ul className="mt-4 mb-6 border-t border-b border-gray-200 divide-y divide-gray-200 h-full overflow-y-scroll">
        {items}
      </ul>
    </div>
  );
}

export default StackListWithHeader;
