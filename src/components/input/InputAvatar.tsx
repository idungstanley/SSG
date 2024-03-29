import React from 'react';

interface inputAvatarType {
  size: string | null;
  upload: string | null;
  action: string;
}
function InputAvatar({ size, upload, action }: inputAvatarType) {
  return (
    <div className="flex items-center justify-center rounded-full">
      <label
        htmlFor="avatar-file"
        className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        style={{ width: '100px', height: '100px' }}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-400 text-center"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            <span className="font-semibold">{action}</span>
            {upload}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{size}</p>
        </div>
        <input id="avatar-file" type="file" className="hidden" />
      </label>
    </div>
  );
}

InputAvatar.defaultProps = {
  size: null,
  upload: null,
  action: null
};

export default InputAvatar;
