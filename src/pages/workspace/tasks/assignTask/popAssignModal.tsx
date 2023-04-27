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
    <div className="absolute  bg-white shadow-xl z-1000  w-64  opacity-1  rounded mb-8">
      {modalLoader ? (
        <p>
          <Spinner color="#4f46e5" />
        </p>
      ) : (
        <div className="flex flex-col space-y-5 items-start justify-center p-4  ">
          <div className="flex items-center w-20 h-20 rounded-full bg-sky-200 justify-center">
            <p>
              {userData.avatar_path ? (
                <span>
                  <img
                    src={userData.avatar_path}
                    className={`inline-flex  items-center justify-center ${height} ${width} ${
                      roundedStyle === 'circular' && 'rounded-full'
                    } ${roundedStyle === 'rounded' && 'rounded'}`}
                  ></img>
                </span>
              ) : (
                <span>{userData.initials}</span>
              )}
            </p>
          </div>

          <div className="flex absolute justify-center top-0 right-0 px-4 mx-4 text-xs text-black border rounded bg-gray-100  text-docoration-thickness: 1px;">
            ofline
          </div>

          <div className="flex space-y-4 flex-col items-start">
            <span className="text-xs text-black text-decoration-thickness: 1px;">{userData.name}</span>
            <div className="space-x-2 flex items-center">
              <CiMail className="w-4 h-4 text-black" />
              <span className="text-black" style={{ fontSize: '8px' }}>
                user email
              </span>
            </div>
            <div className="space-x-2  flex items-center">
              <ClockIcon className="w-4 h-4 text-black" />
              <span className="text-black" style={{ fontSize: '8px' }}>
                {moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </div>
            <div>
              <div>
                <button className="flex   px-8 text-black hover:bg-gray-400 mx-6  border rounded w-full items-center justify-center ">
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
