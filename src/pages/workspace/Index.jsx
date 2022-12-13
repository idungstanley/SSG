import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './sidebar/Header';
import NewSidebar from './sidebar/NewSidebar';
// import Sidebar from './sidebar/Sidebar';

// function Index() {
//   return (
//     <main className="flex w-full overflow-y-scroll">
//       <section className="w-2/12">
//         <Sidebar />
//       </section>
//       <section className="w-10/12">
//         <Outlet />
//       </section>
//     </main>
//   );
// }

function Index() {
  return (
    <div>
      <NewSidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <Header />
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                <Outlet />
                {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>

      {/* <section className="w-2/12">
        <Sidebar />
      </section> */}
    </div>
  );
}

export default Index;
