import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';

export default function NewExplorerPage() {
  return (
    <main className="grid grid-cols-mainLayout w-full h-full">
      {/* sidebar */}
      <Sidebar />

      {/* header */}
      <section className="grid grid-rows-mainContent border">
        <Header />

        <div className="grid grid-rows-mainContent border">
          {/* Breadcrumb */}
          <Breadcrumb />

          <div className="grid grid-cols-2 border">
            <div className="grid grid-rows-mainContent border">
              {/* toolbar */}
              <div className="border">
                <h1>toolbar</h1>
              </div>

              {/* file list */}
              <div className="border">
                <h1>file list</h1>
              </div>
            </div>

            {/* file preview */}
            <div className="border">
              <h1>file preview</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
