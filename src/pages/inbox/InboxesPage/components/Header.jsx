import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { setCreateInboxSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
// import { useGetInboxes } from '../../../../features/inbox/inboxesService';
import { setShowHidden } from '../../../../features/inboxes/inboxesSlice';

function Header() {
  const dispatch = useDispatch();
  const { showHidden } = useSelector((state) => state.inboxes);
  // const { refetch } = useGetInboxes(showHidden);
  const handleShow = () => {
    dispatch(setShowHidden(!showHidden));
    // refetch();
  };

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex-1 min-w-0 items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Inbox
        </h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4 gap-10">
        <div className="relative flex items-center">
          <div className="flex h-5 items-center">
            <input
              id="ShowHidden"
              name="ShowHidden"
              type="checkbox"
              checked={showHidden}
              onChange={handleShow}
              className="h-6 w-6 cursor-pointer rounded border-gray-300 text-indigo-600 hover:border-gray-500 transition-all duration-300 focus:ring-0 focus:ring-offset-0"
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
