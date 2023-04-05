import React, { ReactNode } from 'react';

interface SectionAreaProps {
  icon: JSX.Element;
  label: string;
  children?: ReactNode;
}

export default function SectionArea({ icon, label, children }: SectionAreaProps) {
  return (
    <div className="py-2 px-2 flex gap-2 items-center w-full border-b border-2 border-t text-black">
      {icon}
      <p className="font-medium">{label}</p>
      {children}
    </div>
  );
}
