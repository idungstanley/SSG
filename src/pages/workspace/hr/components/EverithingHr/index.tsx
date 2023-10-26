import EverythingIcon from '../../../../../assets/icons/EverythingIcon';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActiveBackground from '../../../../../components/tasks/Component/ActiveBackground';
import ActiveBarIdentification from '../../../../../components/tasks/Component/ActiveBarIdentification';

function EverythingHr() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoadMyOverview = () => {
    navigate('hr/everything-hr', {
      replace: true
    });
  };

  return (
    <div
      className="relative flex items-center justify-start hover:bg-alsoit-gray-50"
      style={{ height: '30px', paddingLeft: '53px' }}
    >
      <ActiveBackground showBgColor={location.pathname.includes('everything-hr')} />
      <ActiveBarIdentification showBar={location.pathname.includes('everything-hr')} />
      <div
        className="flex items-center flex-1 min-w-0 gap-1 cursor-pointer"
        style={{ zIndex: 1 }}
        onClick={handleLoadMyOverview}
      >
        <EverythingIcon color={location.pathname.includes('everything-hr') ? '#BF01FE' : undefined} />

        <p
          className={`block text-xs tracking-wider capitalize truncate ${
            location.pathname.includes('everything-hr') ? 'text-alsoit-purple-300' : ''
          }`}
        >
          Everything
        </p>
      </div>
    </div>
  );
}
export default EverythingHr;
