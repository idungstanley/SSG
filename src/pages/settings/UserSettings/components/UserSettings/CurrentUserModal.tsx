import React, { useEffect, useRef } from 'react';
import { RxCircleBackslash } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setCurrentUserModal,
  setShowAvatarUpload,
  setUserInfo
} from '../../../../../features/settings/user/userSettingsSlice';
import { UseRemoveAvatar } from '../../../../../features/settings/user/userSettingsServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CurrentUserModal() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { userData } = useAppSelector((state) => state.userSetting);
  const modalRef = useRef<HTMLInputElement>(null);
  const palette = [
    'white',
    'green',
    'yellow',
    'blue',
    'pink',
    'black',
    'orange',
    '#ED1500',
    'magenta',
    '#5CEE4F',
    'teal',
    '#1e2533',
    '#8EFAD3',
    '#5E5CCB',
    '#57A1E4',
    '#87DDF0',
    '#8F14EF',
    '#FF7501',
    '#E71CBB',
    '#FFB877',
    '#DF9999',
    '#7B659F',
    '#6DF5DD',
    '#BF00FF',
    '#C8130C',
    '#EEDF19',
    '#306ACC',
    '#AC4B31',
    '#33AA2B',
    '#CC951B'
  ];

  const style = {
    height: '15px',
    width: '15px'
  };
  const colorBoxes = palette.map((c) => (
    <div key={c}>
      {c === 'white' ? (
        <RxCircleBackslash />
      ) : (
        <div style={{ backgroundColor: `${c}`, ...style }} className="rounded" onClick={() => handleClick(c)}></div>
      )}
    </div>
  ));

  const deleteAvatarMutation = useMutation(UseRemoveAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
      dispatch(setCurrentUserModal(false));
    }
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(setCurrentUserModal(false));
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const handleClick = (c?: string) => {
    dispatch(setUserInfo({ color: c }));
    dispatch(setCurrentUserModal(false));
  };

  return (
    <div
      className="absolute top-auto w-auto p-2 mt-3 overflow-y-auto bg-white border border-gray-200 rounded shadow-2xl w-fit h-fit drop-shadow-2xl
      "
      style={{ zIndex: '999' }}
      ref={modalRef}
    >
      <button type="button" className="grid grid-cols-7 gap-4 p-2 font-semibold">
        {colorBoxes}
      </button>
      <div
        className="cursor-pointer w-full flex justify-center text-blue-600 border border-blue-500 p-1 rounded hover:bg-blue-600 hover:text-white"
        onClick={() => dispatch(setShowAvatarUpload(true))}
      >
        <button className="text-xs">Add custom avatar</button>
      </div>
      {userData?.avatar_path && (
        <div
          className="cursor-pointer w-full flex justify-center text-red-600 border border-red-500 p-1 rounded hover:bg-red-600 hover:text-white my-1"
          onClick={() => deleteAvatarMutation.mutateAsync()}
        >
          <button className="text-xs">Remove Avatar</button>
        </div>
      )}
    </div>
  );
}

export default CurrentUserModal;
