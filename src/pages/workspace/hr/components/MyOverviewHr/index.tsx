import Me from '../../../../../assets/icons/Me';
import { useLocation, useNavigate } from 'react-router-dom';
import ActiveBackground from '../../../../../components/tasks/Component/ActiveBackground';
import ActiveBarIdentification from '../../../../../components/tasks/Component/ActiveBarIdentification';
import React from 'react';

function MyOverviewHr() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoadMyOverview = () => {
    navigate('hr/my-overview', {
      replace: true
    });
  };

  return (
    <div
      className="relative flex items-center justify-start hover:bg-alsoit-gray-50"
      style={{ height: '30px', paddingLeft: '53px' }}
    >
      <ActiveBackground showBgColor={location.pathname.includes('my-overview')} />
      <ActiveBarIdentification showBar={location.pathname.includes('my-overview')} />
      <div
        className="flex items-center flex-1 min-w-0 gap-1 cursor-pointer"
        style={{ zIndex: 1 }}
        onClick={handleLoadMyOverview}
      >
        <Me active={location.pathname.includes('my-overview')} />
        <p
          className={`block text-xs tracking-wider capitalize truncate ${
            location.pathname.includes('my-overview') ? 'text-alsoit-purple-300' : ''
          }`}
        >
          My Overview
        </p>
      </div>
    </div>
  );
}

export default MyOverviewHr;
