import React from 'react';

export default function FooterTabs() {
  return (
    <div className="z-50 h-20 p-2 border-t sticky bottom-0 left-0 right-0">
      <section>
        <div className="flex flex-col gap-1">
          <div className="p-0.5 border">Library</div>
          <div className="p-0.5 border">Template</div>
        </div>
      </section>
    </div>
  );
}
