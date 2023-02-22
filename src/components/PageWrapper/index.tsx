import React, { ReactNode } from 'react';
import { IPilotSection, IPilotTab } from '../../types';
// import Pilot from '../../pages/workspace/pilot';
import Pilot from '../Pilot';

interface PageWrapperProps {
  header: JSX.Element;
  children: ReactNode;
  additional?: JSX.Element;
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function PageWrapper({
  header,
  children,
  additional,
  pilotConfig,
}: PageWrapperProps) {
  return (
    <>
      <main className="flex flex-col w-full h-full">
        {header}

        <div className="flex w-full h-full">
          {children}

          <Pilot pilotConfig={pilotConfig} />
        </div>
      </main>

      {additional}
    </>
  );
}
