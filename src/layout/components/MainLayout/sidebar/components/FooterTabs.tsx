import React from 'react';

export default function FooterTabs() {
  return (
    <div className="p-2 border-t">
      <section>
        <div className="flex flex-col gap-1">
          <div className="p-0.5 border">Library</div>
          <div className="p-0.5 border">Template</div>
        </div>
      </section>
    </div>
  );
}
