import React from 'react';
// import Home from './home/Home';
import Sidebar from './sidebar/Sidebar';

function Index() {
  return (
    <main className="flex w-full">
      <section>
        <Sidebar />
      </section>
      {/* <section className="bg-red-300 w-4/6">
        <Home />
      </section> */}
    </main>
  );
}

export default Index;
