import { ReactNode, useState } from 'react';
import { IPilotSection, IPilotTab } from '../../types';
import { cl } from '../../utils';
import Pilot from '../Pilot';

interface PageWrapperProps {
  header: JSX.Element;
  children: ReactNode;
  additional?: JSX.Element;
  extendedBar?: JSX.Element;
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function PageWrapper({ header, children, additional, pilotConfig, extendedBar }: PageWrapperProps) {
  return (
    <main className="grid grid-cols-autoFr h-full">
      {extendedBar ? <ExtendedBar>{extendedBar}</ExtendedBar> : null}

      <section className="flex flex-col w-full h-full">
        {header}

        <div className="relative grid grid-cols-frAuto w-full h-full">
          <div>{children}</div>
          <Pilot pilotConfig={pilotConfig} />
        </div>
      </section>

      {additional}
    </main>
  );
}

interface ExtendedBarProps {
  children: ReactNode;
}

const SIDEBAR_MIN_WIDTH = 0;
const SIDEBAR_MAX_WIDTH = 288;

function ExtendedBar({ children }: ExtendedBarProps) {
  const [show, setShow] = useState(false);

  return (
    <aside
      style={{ width: !show ? SIDEBAR_MIN_WIDTH : SIDEBAR_MAX_WIDTH }}
      className={cl(show && 'border', 'relative w-60 h-full transition-all duration-300')}
    >
      <button
        onClick={() => setShow((prev) => !prev)}
        className="z-10 absolute top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center bg-red-500"
      >
        +
      </button>

      {show ? children : null}
    </aside>
  );
}
