import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { CiMail } from 'react-icons/ci';
import { Spinner } from '../../../../common';

export function PopAssignModal({
  userData,
  modalLoader
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
}) {
  return (
    <div className="absolute  bg-white shadow-lg   w-56 h-64 rounded">
      {modalLoader ? (
        <p>
          <Spinner color="#4f46e5" />
        </p>
      ) : (
        <div className="flex flex-col space-y-6 items-start justify-center p-4  ">
          <div className="flex items-center w-14 h-14 rounded-full bg-sky-200 justify-center">
            <span>{userData.initials}</span>
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
            <button className="border rounded border-black w-full py-2 text-black hover:bg-gray-400 ml-3">
              View profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopAssignModal;
