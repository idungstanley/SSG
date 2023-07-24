import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../components';
import { setCreateInboxSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';

const routes = ['/inbox', '/inbox/hidden', '/inbox/restore', '/inbox/archived'];

function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return routes.includes(pathname) ? (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex-1 min-w-0 items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Inbox</h1>
      </div>
      <Button
        buttonStyle="primary"
        onClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
        loading={false}
        label="Create inbox"
      />
    </div>
  ) : null;
}

export default Header;
