import { useAppSelector } from '../../../../app/hooks';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdHelpOutline, MdTab } from 'react-icons/md';
import { useMediaStream } from '../../../../features/task/taskService';

export default function AdditionalHeader() {
  const { screenRecording, recorder, stream } = useAppSelector((state) => state.task);

  const { handleStopStream } = useMediaStream();
  return (
    <div className="w-full border-b flex justify-between items-center px-4" style={{ height: '50px' }}>
      <h1 style={{ height: '50px' }} className="text-center flex items-center">
        Header
      </h1>
      <div className="flex space-x-2 items-center justify-center">
        <MdTab className="w-5 h-5" />
        <HiOutlineUpload className="w-5 h-5" />
        <BsFillGrid3X3GapFill className="w-5 h-5" />
        <MdHelpOutline className="w-5 h-5" />
        {screenRecording === 'recording' && (
          <div className="w-2">
            <div
              className="border-red-600 rounded-full h-5 w-5 flex items-center justify-center"
              onClick={() =>
                handleStopStream({
                  recorder,
                  stream
                })
              }
            >
              <div className="pulsate w-3 rounded-full h-3 bg-red-600"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
