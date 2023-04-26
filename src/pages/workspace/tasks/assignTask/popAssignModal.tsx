import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { CiMail } from 'react-icons/ci';

export function PopAssignModal() {
  return (
    <div className="absolute  bg-white shadow-lg   w-56 h-64 rounded">
      <div className="flex flex-col space-y-6 items-start justify-center p-4  ">
        <div className="flex items-center w-14 h-14 rounded-full bg-sky-200 justify-center">
          <span>CH</span>
        </div>
        <div className="flex space-y-4 flex-col items-start">
          <span className="text-xs text-black text-decoration-thickness: 1px;">Ezeigbo Chinonso</span>
          <div className="space-x-2 flex items-center">
            <CiMail className="w-4 h-4 text-black" />
            <span className="text-black" style={{ fontSize: '8px' }}>
              c.ezeigbo@simpsgroup.co.uk
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
    </div>
  );
}

export default PopAssignModal;
