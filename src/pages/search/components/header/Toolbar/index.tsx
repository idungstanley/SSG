import React from 'react';
import Toggle from './Toggle';

export default function Toolbar() {
  return (
    <div className="flex flex-col">

      {/* Bottom section */}
      <div className="min-h-0 flex-1 flex">

        {/* Main area */}
        <main className="min-w-0 flex-1 border-gray-200 xl:flex">
          <section
            aria-labelledby="message-heading"
            className="min-w-0 flex-1 h-full flex flex-col xl:order-last"
          >
            {/* Top section */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
              {/* Toolbar */}
              <div className="flex flex-col justify-center">
                <div className="px-4 sm:px-6">
                  <div className="py-6 flex justify-between space-x-6">
                    <Toggle />
                  </div>
                </div>
              </div>
              {/* Message header */}
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
