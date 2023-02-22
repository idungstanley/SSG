import React, { ReactNode } from 'react';
// import Pilot from '../../pages/workspace/pilot';
import Pilot from '../Pilot';

interface PageWrapperProps {
  header: JSX.Element;
  children: ReactNode;
  additional?: JSX.Element;
}

export default function PageWrapper({
  header,
  children,
  additional,
}: PageWrapperProps) {
  return (
    <>
      <main className="flex flex-col w-full h-full">
        {header}

        <div className="flex w-full h-full">
          {children}

          <Pilot />
        </div>
      </main>

      {additional}
    </>
  );
}
