import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import OneThirdScreenMessage from '../CenterMessage/OneThirdScreenMessage';
import { Spinner } from '../../common';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import {
  resetCurrentItem,
  setCurrentItem,
} from '../../features/workspace/workspaceSlice';
import DropdownList from './components/DropdownList';
import MenuDropdown from '../Dropdown/DropdownForWorkspace';
import WsDropdown from '../Dropdown/WsDropdown';

export default function ItemsListInSidebar({ items, status, type }) {
  const [wsId, setWsId] = useState(false);
  const dispatch = useDispatch();
  const { currentItemId } = useSelector((state) => state.workspace);

  if (status === 'error') {
    return (
      <OneThirdScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const handleClick = (id) => {
    const isMatch = id === currentItemId;

    if (isMatch) {
      if (!currentItemId) {
        dispatch(
          setCurrentItem({
            currentItemId: id,
            currentItemType: type,
          })
        );
      } else {
        dispatch(resetCurrentItem());
      }
    } else {
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: type,
        })
      );
    }
  };

  const handleWSDD = (id) => {
    setWsId(!wsId);
    if (wsId === id) {
      setWsId(false);
    } else {
      setWsId(id);
    }
  };

  return status === 'success' ? (
    <ul className="w-full divide-y divide-gray-200">
      {items.map((i) => (
        <li key={i.id} className="flex flex-col">
          <div className="flex justify-between items-center hover:bg-gray-100">
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleClick(i.id)}
              className="flex items-center py-4"
            >
              <div className="mr-3">
                {i.id === currentItemId ? (
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-1 items-center">
                <div className="flex-shrink-0">
                  <AvatarWithInitials
                    initials={i.name.substr(0, 1).toUpperCase()}
                    height="h-6"
                    width="w-6"
                    backgroundColour="#cf30cf"
                  />
                </div>
                <div className="min-w-0 px-4">
                  <p className="truncate text-sm font-medium">{i.name}</p>
                </div>
              </div>
            </div>
            <MenuDropdown currentItemId={currentItemId} />
            <div className="relative">
              <button type="button" onClick={() => handleWSDD(i.id)}>
                <PlusIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
            {wsId === i.id ? <WsDropdown id={i.id} /> : null}
          </div>

          {currentItemId === i.id ? <DropdownList type={type} /> : null}
        </li>
      ))}
    </ul>
  ) : null;
}

ItemsListInSidebar.defaultProps = {
  items: [],
};

ItemsListInSidebar.propTypes = {
  items: PropTypes.array,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
