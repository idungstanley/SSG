import React from 'react';
import SideBar from '../components/sidebar/SideBar';

function UnderConstruction() {
  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      <section
        style={{ height: '100vh' }}
        className="w-1/5 bg-white h-screen overflow-auto border-r-2 border-gray-300 overflow-auto"
      >
        <SideBar />
      </section>
      <div className="w-4/5 flex">
        <h1>THIS PAGE IS UNDER CONSTRUCTION</h1>
      </div>
    </div>
  );
}

export default UnderConstruction;
