import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components';
import { setCreateInboxSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';

function Header() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleShow = () => {
    setChecked(!checked);

    // TODO: add hidden inboxes to all
  };

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex-1 min-w-0 items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Inbox
        </h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4 gap-3">
        <div className="relative flex items-center">
          <div className="flex h-5 items-center">
            <input
              id="ShowHidden"
              name="ShowHidden"
              type="checkbox"
              checked={checked}
              onChange={handleShow}
              className="h-6 w-6 rounded border-gray-300 text-indigo-600 hover:border-gray-500 transition-all duration-300 focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              Show hidden
            </label>
          </div>
        </div>
        <Button
          buttonStyle="primary"
          onClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
          loading={false}
          label="Create inbox"
        />
      </div>
    </div>
  );
}

export default Header;
