import React from 'react';
import SideBar from './components/sidebar/SideBar';
import Profile from './components/Profile';
import Header from './components/Header';
import Personalization from './components/Personalization';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function UserSettings() {
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   navigate('/settings/profile');
  // }, []);
  // const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      <section
        style={{ height: '100vh' }}
        className="w-1/5 bg-white h-screen overflow-auto border-r border-gray-400 overflow-auto"
      >
        <SideBar />
      </section>
      <div className="w-4/5">
        <section className="w-full">
          <Header />
        </section>
        <section className="m-auto flex">
          <Profile />
          <Personalization />
        </section>
      </div>
    </div>
  );
}

export default UserSettings;
