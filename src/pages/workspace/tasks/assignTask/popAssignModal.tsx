import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { CiMail } from 'react-icons/ci';
import { Spinner } from '../../../../common';

export function PopAssignModal({
  userData,
  modalLoader,
  roundedStyle,
  height,
  width
}: {
  userData: {
    id: React.Key | null | undefined;
    initials: string;
    colour: string | undefined;
    name: string;
    avatar_path: string;
  };

  modalLoader: boolean;
  spinnerSize: number;
  roundedStyle: string;
  height: string;
  width: string;
}) {
  return (
    <div style={{ zIndex: 99 }} className="absolute w-64 mb-8 bg-white rounded shadow-xl opacity-1">
      {modalLoader ? (
        <Spinner color="#4f46e5" />
      ) : (
        <div className="flex flex-col items-start justify-center p-4 space-y-5 ">
          <div className="flex items-center justify-center w-20 h-20 text-white bg-gray-400 rounded-full">
            {userData.avatar_path ? (
              <img
                src={userData.avatar_path}
                className={`inline-flex  items-center justify-center ${height} ${width} ${
                  roundedStyle === 'circular' && 'rounded-full'
                } ${roundedStyle === 'rounded' && 'rounded'}`}
              />
            ) : (
              <span>{userData.initials}</span>
            )}
          </div>

          <div className="flex absolute subpixel-antialiased justify-center top-0 right-0 px-4 mx-4 text-sm text-black border rounded bg-gray-100  text-docoration-thickness: 1px;">
            ofline
          </div>

          <div className="flex flex-col items-start space-y-4">
            <span className="text-sm subpixel-antialiased text-black text-decoration-thickness: 1px;">
              {userData.name}
            </span>
            <div className="flex items-center space-x-2">
              <CiMail className="w-4 h-4 text-black" />
              <span className="text-sm subpixel-antialiased text-black" style={{ fontSize: '8px' }}>
                email
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-black" />
              <span className="text-sm subpixel-antialiased text-black" style={{ fontSize: '8px' }}>
                {moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </div>
            <div>
              <div>
                <button className="flex items-center justify-center w-full px-8 mx-6 subpixel-antialiased text-black border rounded hover:bg-gray-400 ">
                  View profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopAssignModal;
