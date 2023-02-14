import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';

export default function FooterTabs() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <section className="flex flex-col w-full gap-2 flex-grow items-center justify-end py-2">
      {showSidebar ? (
        <>
          <div className="p-0.5 border w-full">Library</div>
          <div className="p-0.5 border w-full">Template</div>
        </>
      ) : (
        <>
          <div className="p-0.5 border">icon 1</div>
          <div className="p-0.5 border">icon 2</div>
        </>
      )}
    </section>
  );
}
